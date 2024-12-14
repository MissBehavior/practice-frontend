import { useEffect, useState } from 'react'
import axios from 'axios'
import { Skeleton } from '../../components/ui/skeleton'
import { Button } from '../../components/ui/button'
import { useAuth } from '@/services/auth-service'
import PostDelete from './post-delete'
import PostNew from './post-new'
import parse from 'html-react-parser'
import { Category, PostData, PostsResponse } from '@/types'
import PostEdit from './post-edit'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import Breadcrumb from '../../components/breadcrumb'
import { Link } from 'react-router-dom'
import LatestPost from './latest-port'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Textarea } from '@/components/ui/textarea'
import CreatePostNew from './create-post-new'
import { fetchPosts } from '@/services/api'
import PostGrid from './post-grid'

export default function PostExternal() {
    const { user, userToken } = useAuth()
    const [data, setData] = useState<PostData[]>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [latestPost, setLatestPost] = useState<PostData | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    )

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const { t } = useTranslation()

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }
    const formatDate = (date: string) => {
        return format(new Date(date), 'dd-MM-yyyy')
    }
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    const fetchPostsByCategory = async (categoryId: string, page: number) => {
        setLoading(true)
        try {
            const response = await axios.get(
                `http://localhost:3000/posts/category/${categoryId}`,
                {
                    params: { page, limit: 10 },
                }
            )
            setData(response.data.posts)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    const fetchData = async (page: number) => {
        setLoading(true)
        try {
            const response = await axios.get<PostsResponse>(
                'http://localhost:3000/posts',
                {
                    params: { page, limit: 10 },
                }
            )
            console.log('response:', response)
            console.log('-----------------')
            console.log(data)
            setData(response.data.posts)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
            setLatestPost(response.data.latestPost)
            setCategories(response.data.categories)
            setLoading(false)
            console.log('-----------------')
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }
    useEffect(() => {
        // const getLatestPost = async () => {
        //     try {
        //         const data = await fetchPosts(1, 1) // Fetch the first page with 1 post
        //         setLatestPost(data.latestPost)
        //         console.log('Latest post:', data.latestPost)
        //     } catch (error) {
        //         console.error('Error fetching latest post:', error)
        //     }
        // }
        // getLatestPost()
        // setTimeout(() => {
        //     fetchData(currentPage)
        // }, 100000)
        if (!selectedCategory) {
            fetchData(currentPage)
        } else {
            fetchPostsByCategory(selectedCategory, currentPage)
        }
    }, [currentPage, selectedCategory])
    if (loading) {
        return (
            <div className="dark:bg-[#101010] bg-slate-300 min-h-screen">
                <Breadcrumb title={t('News')} parent={t('News')} />
                {user.isAdmin && (
                    <div className="flex justify-end p-4">
                        <Skeleton className="h-10 w-40 rounded" />
                    </div>
                )}
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <LatestPost latestPost={null} />
                </div>
                <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col overflow-hidden rounded-lg shadow dark:bg-gray-800 bg-slate-400 p-4"
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
    const renderCategoryButtons = () => {
        return (
            <div className="flex gap-2 justify-center mt-4 flex-wrap">
                <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    onClick={() => {
                        if (selectedCategory !== null) {
                            setSelectedCategory(null)
                            setCurrentPage(1)
                        }
                    }}
                >
                    All Posts
                </Button>
                {categories.map((cat) => (
                    <Button
                        key={cat._id}
                        variant={
                            selectedCategory === cat._id ? 'default' : 'outline'
                        }
                        onClick={() => {
                            if (selectedCategory !== cat._id) {
                                setSelectedCategory(cat._id)
                                setCurrentPage(1)
                            }
                        }}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <div className="dark:bg-[#101010] bg-slate-300">
            <Breadcrumb title={'News'} parent={'News'} />
            <LatestPost latestPost={latestPost} />
            {user.isAdmin && (
                <div className="flex flex-col items-center w-full align-middle my-2">
                    <CreatePostNew
                        onPostCreated={() => fetchData(currentPage)}
                    />
                </div>
            )}
            {renderCategoryButtons()}
            <PostGrid
                data={data}
                totalPages={totalPages}
                currentPage={currentPage}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                t={t}
            />
        </div>
    )
}
