import { useAuth } from '@/services/auth-service'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GalleryNewDialog from './gallery-new-dialog'
import { GalleryData } from '@/types'
import GalleryDelete from './gallery-delete'
import { Link } from 'react-router-dom'

export default function Gallery() {
    const { user } = useAuth()
    const [data, setData] = useState<GalleryData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:3000/gallery')
            console.log('response:', response)
            console.log('-----------------')
            setData(response.data.gallery)
            setLoading(false)
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // setTimeout(() => {
        fetchData()
        // }, 10000)
        // fetchData(currentPage)
    }, [])
    if (loading) {
        return (
            <section className="flex flex-row flex-wrap mx-auto justify-center ">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex w-full px-4 py-6 md:w-1/2 lg:w-1/3 justify-center"
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
            <div
                className={
                    'flex flex-wrap justify-center gap-4 items-start bg-white dark:bg-background'
                }
            >
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="mt-16 mb-12 min-h-64 bg-white dark:bg-background flex justify-center items-center flex-col cursor-pointer"
                    >
                        {user.isAdmin && (
                            <div className="flex flex-row ml-auto mb-[-20px] z-10 gap-2">
                                <GalleryDelete
                                    fetchData={fetchData}
                                    index={item._id}
                                />
                            </div>
                        )}
                        <Link to={`/gallery/` + item._id}>
                            <div
                                className={`p-6 bg-white dark:bg-slate-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                            >
                                <img
                                    className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out"
                                    src={item.cardImgUrl}
                                    alt=""
                                />
                                <div className="mt-4">
                                    <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
                                        {item.title}
                                    </h1>
                                    <p className="text-base mt-2 text-cyan-600"></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                {data?.length < 1 && (
                    <div
                        className={` mt-10 p-6 bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                    >
                        <div className="p-10">
                            <h1 className="text-xl mt-2 text-gray-700 dark:text-white max-w-64">
                                Coming soon !
                            </h1>
                        </div>
                    </div>
                )}

                {user.isAdmin && <GalleryNewDialog fetchData={fetchData} />}
            </div>
        </>
    )
}
