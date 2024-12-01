import { useEffect, useState } from 'react'
import axios from 'axios'
import { Skeleton } from '../../components/ui/skeleton'
import { Button } from '../../components/ui/button'
import { useAuth } from '@/services/auth-service'
import PostDelete from './post-delete'
import PostNew from './post-new'
import parse from 'html-react-parser'
import { PostData } from '@/types'
import PostEdit from './post-edit'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
interface PaginatedResponse {
    totalPages: number
    currentPage: number
    posts: PostData[]
}
export default function PostExternal() {
    const { user } = useAuth()
    const [data, setData] = useState<PostData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
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

    const fetchData = async (page: number) => {
        setLoading(true)
        try {
            const response = await axios.get<PaginatedResponse>(
                'http://localhost:3000/post',
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
            setLoading(false)
            console.log(data)
            console.log('-----------------')
        } catch (error) {
            console.error('Error fetching data:', error)
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

    return (
        <>
            {/* {data.map((item) => (
                <div
                    key={item._id}
                    style={{ marginBottom: 20 }}
                    className="flex items-center space-x-4 justify-center m-5"
                >
                    <h1>ID:{item._id}</h1>
                    <h1>Title:{item.title}</h1>
                    <p>Content:{item.content}</p>
                    <p>By User:{item.userId}</p>
                </div>
            ))} */}
            {user.isAdmin && (
                <PostNew fetchData={fetchData} currentPage={currentPage} />
            )}
            <section className="flex flex-row flex-wrap mx-auto justify-center">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col transition-all duration-150 lg:w-1/3 sm:w-full  xl:w-1/3 2xl:w-1/4 px-4 py-6 justify-center mr-10 ml-10"
                    >
                        {user.isAdmin && (
                            <div className="flex flex-row ml-auto mr-[25px] mb-[-25px] z-10 gap-2">
                                <PostEdit
                                    fetchData={fetchData}
                                    currentPage={currentPage}
                                    item={item}
                                />
                                <PostDelete
                                    fetchData={fetchData}
                                    currentPage={currentPage}
                                    index={item._id}
                                />
                            </div>
                        )}
                        <div className="flex flex-col items-stretch min-h-full min-w-full pb-4 transition-all duration-150 bg-white dark:bg-slate-700 shadow-lg hover:shadow-2xl mb-5 ">
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
                                    {formatDate(item.createdAt)}
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
