import { useEffect, useState } from 'react'
import axios from 'axios'
// import { Skeleton } from '../../ui/skeleton'
// import { Button } from '../../ui/button'
import { useAuth, useAxios } from '@/services/auth-service'
// import PostDelete from './post-delete'
// import PostNew from './post-new'
import parse from 'html-react-parser'
import { PostData } from '@/types'
// import PostEdit from './post-edit'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import TeamUpdateNew from './team-updates-new'
import TeamUpdateDelete from './team-updates-delete'
import { toast } from '../ui/use-toast'
interface PaginatedResponse {
    totalPages: number
    currentPage: number
    posts: PostData[]
}
export default function TeamUpdates() {
    const [data, setData] = useState<PostData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const { t } = useTranslation()
    const api = useAxios()
    const { userToken } = useAuth()

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }
    const formatDate = (date: string) => {
        return format(new Date(date), 'dd-MM-yyyy')
    }
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    const fetchData = async (page: number) => {
        setLoading(true)
        try {
            const response = await api.get<PaginatedResponse>(
                'http://localhost:3000/postinternal',
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            console.log('response:', response)
            console.log('-----------------')
            // SORTING POSTS incase backend sends them unsorted
            const sortedPosts = response.data.posts.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )

            setData(sortedPosts)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
            setLoading(false)
            console.log(data)
            console.log('-----------------')
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
        fetchData(currentPage)
        // }, 10000)
        // fetchData(currentPage)
    }, [currentPage])
    if (loading) {
        //md:w-1/2 lg:w-1/3
        return (
            <section className="flex flex-row flex-wrap mx-auto justify-center ">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex w-full px-4 py-6 justify-center"
                    >
                        <div className="space-y-3">
                            <Skeleton className="h-36 w-full" />
                            <Skeleton className="h-8 w-1/2 flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto" />
                            <Skeleton className="h-32 w-[450px]" />
                            <Skeleton className="h-16 w-[350px] mb-20" />
                        </div>
                    </div>
                ))}
            </section>
        )
    }
    const { user } = useAuth()

    return (
        <>
            {user.isEmployee && (
                <TeamUpdateNew
                    fetchData={fetchData}
                    currentPage={currentPage}
                />
            )}
            <section className="flex flex-row flex-wrap mx-auto justify-center">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col transition-all duration-150  sm:w-full md:w-50% md:p-10 xl:px-64  2xl:px-96 px-4 py-6 justify-center mr-10 ml-10"
                    >
                        {(user.isEmployee && item.userName === user.name) ||
                        user.isAdmin ? (
                            <div className="flex flex-row ml-auto mr-[25px] mb-[-25px] z-10 gap-2">
                                {/* <PostEdit
                                    fetchData={fetchData}
                                    currentPage={currentPage}
                                    item={item}
                        />*/}
                                <TeamUpdateDelete
                                    fetchData={fetchData}
                                    currentPage={currentPage}
                                    index={item._id}
                                />
                            </div>
                        ) : null}
                        <div className="flex flex-col items-stretch min-h-full min-w-full pb-4 mb-6 transition-all duration-150 bg-white dark:bg-slate-700 shadow-lg hover:shadow-2xl mb-5 ">
                            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                                <a href="#" className="hover:underline">
                                    <h2 className="text-2xl font-bold tracking-normal text-gray-800 dark:text-white">
                                        {item.title}
                                    </h2>
                                </a>
                            </div>
                            <div className="md:flex-shrink-0 dark:text-white">
                                <img
                                    src={item.postPicture}
                                    alt={`Post image for ${item.title}`}
                                    className="w-full h-full rounded-b-none object-contain px-8 mb-16 box-border"
                                />
                            </div>
                            <div className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-justify text-gray-700 dark:text-white">
                                <span className="mx-1 text-xs text-gray-600 dark:text-white">
                                    {formatDate(item.createdAt)} {t('postedBy')}
                                    {': '}
                                    <span className="text-cyan-400">
                                        {item.userName}
                                    </span>
                                </span>
                            </div>
                            <div className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-justify text-gray-700 dark:text-white">
                                {parse(item.content)}
                            </div>
                            <section className="px-4 py-2 mt-2"></section>
                        </div>
                    </div>
                ))}
            </section>
            {data.length > 10 && (
                <div className="flex items-center space-x-4 justify-center m-5">
                    <Button
                        disabled={currentPage === 1}
                        onClick={handlePrevPage}
                    >
                        {t('previous')}
                    </Button>
                    <Button
                        disabled={currentPage === totalPages}
                        onClick={handleNextPage}
                    >
                        {t('next')}
                    </Button>
                </div>
            )}
        </>
    )
}
