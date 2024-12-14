import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth, useAxios } from '@/services/auth-service'
import parse from 'html-react-parser'
import { PostData, PostDataInternal } from '@/types'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import TeamUpdateNew from './team-updates-new'
import TeamUpdateDelete from './team-updates-delete'
import 'react-quill/dist/quill.snow.css' // Import React Quill's Snow theme CSS
import {
    FaCalendarAlt,
    FaCommentDots,
    FaHeart,
    FaRegHeart,
    FaUser,
} from 'react-icons/fa'
import { FaRegCommentDots } from 'react-icons/fa'
import { toast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/breadcrumb'
import { Link } from 'react-router-dom'
interface PaginatedResponse {
    totalPages: number
    currentPage: number
    posts: PostDataInternal[]
}
export default function TeamUpdates() {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const [data, setData] = useState<PostDataInternal[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const { t } = useTranslation()
    const [searchQuery, setSearchQuery] = useState<string>('') // state for search

    const [comment, setComment] = useState('')

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }
    const formatDate = (date: string) => {
        return format(new Date(date), 'dd-MM-yyyy')
    }
    const handlePostComment = async (postId: string) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/postinternal/comment/' + postId,
                { userId: user.id, text: comment },
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            const updatedPost = response.data
            console.log('updatedPost:', updatedPost)
            setData((prevData) =>
                prevData.map((post) =>
                    post._id === postId
                        ? { ...post, comments: updatedPost.comments }
                        : post
                )
            )
            setComment('')
        } catch (error) {
            console.error('Error posting comment:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
            console.error('Error deleting :', error)
        }
    }
    const likeUnlikeHandle = async (postId: string) => {
        try {
            const response = await axios.patch(
                'http://localhost:3000/postinternal/like/' + postId,
                { userId: user.id },
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            console.log('likeunlike handleresponse:', response)
            const updatedPost = response.data.likes
            setData((prevData) =>
                prevData.map((post) =>
                    post._id === postId ? { ...post, likes: updatedPost } : post
                )
            )
        } catch (error) {
            console.error('Error liking/unliking post:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
            console.error('Error deleting :', error)
        }
    }
    const fetchData = async (page: number, query?: string) => {
        setLoading(true)
        try {
            const params: any = { page, limit: 10 }
            if (query && query.trim() !== '') {
                params.query = query
            }
            const response = await api.get<PaginatedResponse>(
                'http://localhost:3000/postinternal',
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                    params,
                }
            )
            console.log('response:', response)
            console.log('-----------------')
            const sortedPosts = response.data.posts.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )

            setData(sortedPosts)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
            console.error('Error deleting :', error)
            setLoading(false)
        }
    }
    useEffect(() => {
        // setTimeout(() => {
        fetchData(currentPage, searchQuery)
        // }, 10000)
        // fetchData(currentPage)
    }, [currentPage])
    const handleSearch = (q: string) => {
        setSearchQuery(q)
        fetchData(1, q)
    }
    if (loading) {
        return (
            <div className="bg-[#101010] min-h-screen">
                <Breadcrumb
                    title={'Team Updates'}
                    parent={'Team Updates'}
                    search
                    onSearch={handleSearch}
                    currentQuery={searchQuery}
                />

                <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col overflow-hidden rounded-lg shadow bg-gray-800 p-4"
                        >
                            <Skeleton className="h-48 w-full mb-4 rounded" />
                            <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                            <Skeleton className="h-4 w-full mb-4 rounded" />
                            <Skeleton className="h-10 w-1/2 rounded" />
                        </div>
                    ))}
                </section>
                <div className="flex items-center space-x-4 justify-center py-4">
                    <Skeleton className="h-10 w-24 rounded" />
                    <Skeleton className="h-10 w-24 rounded" />
                </div>
            </div>
        )
    }

    return (
        <>
            <Breadcrumb
                title={'Team Updates'}
                parent={'Team Updates'}
                search
                onSearch={handleSearch}
                currentQuery={searchQuery}
            />
            {user.isEmployee && (
                <TeamUpdateNew
                    fetchData={fetchData}
                    currentPage={currentPage}
                />
            )}
            <div className="py-28 bg-[#191919]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((post, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
                            >
                                {(user.isEmployee &&
                                    post.userName === user.name) ||
                                user.isAdmin ? (
                                    <div className="absolute z-10 gap-2 right-0">
                                        <TeamUpdateDelete
                                            fetchData={fetchData}
                                            currentPage={currentPage}
                                            index={post._id}
                                        />
                                    </div>
                                ) : null}
                                <Link to={`/team-updates/${post._id}`}>
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={post.postPicture}
                                        alt={post.title}
                                    />
                                </Link>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <p className="text-sm font-medium text-white mb-2 flex flex-wrap gap-2"></p>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                                        <Link
                                            to={`/team-updates/${post._id}`}
                                            className="hover:text-gray-600"
                                        >
                                            {post.title}
                                        </Link>
                                    </h4>
                                    <div className="flex items-center text-gray-600 text-sm mb-2">
                                        <span>{parse(post.content)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
                                        <div className="flex">
                                            <FaCalendarAlt className="mr-2" />
                                            <span>
                                                {new Date(
                                                    post.createdAt
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <FaUser className="mr-2" />
                                            <span>
                                                {t('by')} {post.userId.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center  border-gray-200 pt-2">
                                        <div
                                            onClick={() =>
                                                likeUnlikeHandle(post._id)
                                            }
                                            className="flex items-center text-gray-600"
                                        >
                                            {post.likes.some(
                                                (like) => like._id === user.id
                                            ) ? (
                                                <FaHeart className="mr-2 text-red-600" />
                                            ) : (
                                                <FaRegHeart className="mr-2" />
                                            )}
                                            {post.likes.length} {t('likes')}
                                        </div>

                                        <div className="flex items-center text-gray-600">
                                            <FaCommentDots className="mr-2" />
                                            {post.comments.length}{' '}
                                            {t('comments')}
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <Link
                                            to={`/team-updates/${post._id}`}
                                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
