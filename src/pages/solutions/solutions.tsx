import { Link } from 'react-router-dom'
import { useAuth } from '@/services/auth-service'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SolutionsAddNewSolution from './solutions-newsolution-dialog'
import SolutionsDelete from './solutions-delete-confirm'
import SolutionsEditDialog from './solutions-edit-dialog'
import { SolutionsData } from '@/types'
import Breadcrumb from '@/components/breadcrumb'
import { FaCalendarAlt } from 'react-icons/fa'
import i18n from '@/i18n/config'
import { useTranslation } from 'react-i18next'

export default function Solutions() {
    const { user } = useAuth()
    const { t } = useTranslation()
    const [data, setData] = useState<SolutionsData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:3000/solutions')
            setData(response.data.solutions)
            setLoading(false)
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
            <div className="dark:bg-[#101010] bg-[#f2f2f2] min-h-screen">
                <Breadcrumb title={'Solutions'} parent={'Solutions'} />

                <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col overflow-hidden rounded-lg shadow dark:bg-gray-800 bg-[#ffffff] p-4"
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
            <Breadcrumb title={t('solutions')} parent={t('solutions')} />
            <div className="pb-12 dark:bg-[#101010] bg-[#f2f2f2] min-h-svh">
                <div className="max-w-7xl mx-auto px-4">
                    {user.isAdmin && (
                        <SolutionsAddNewSolution fetchData={fetchData} />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                        {data.map((data, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow dark:bg-[#191919] bg-[#ffffff]"
                            >
                                {user.isAdmin && (
                                    <div className="absolute flex flex-row z-10 gap-2 right-0">
                                        <SolutionsEditDialog
                                            _id={data._id}
                                            cardImgUrl={data.cardImgUrl}
                                            titleCard={data.titleCard}
                                            titleCardLT={data.titleCardLT}
                                            contentCard={data.contentCard}
                                            contentCardLT={data.contentCardLT}
                                            contentMain={data.contentMain}
                                            contentMainLT={data.contentMainLT}
                                            fetchData={fetchData}
                                        />
                                        <SolutionsDelete
                                            fetchData={fetchData}
                                            index={data._id}
                                        />
                                    </div>
                                )}
                                <Link to={`/solutions/${data._id}`}>
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={data.cardImgUrl}
                                        alt={data.titleCard}
                                    />
                                </Link>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <h4 className="text-xl font-bold dark:text-gray-300 text-gray-800 mb-2">
                                        <Link
                                            to={`/solutions/${data._id}`}
                                            className="hover:text-gray-500"
                                        >
                                            {i18n.language === 'en'
                                                ? data.titleCard
                                                : data.titleCardLT}
                                        </Link>
                                    </h4>
                                    <div className="flex items-center dark:text-gray-300 text-gray-800 text-sm mb-2">
                                        <span>
                                            {i18n.language === 'en'
                                                ? data.contentCard
                                                : data.contentCardLT}
                                        </span>
                                    </div>
                                    {/* Added Date Section */}
                                    <div className="flex items-center dark:text-gray-300 text-gray-800 text-sm mb-2">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>
                                            {new Date(
                                                data.createdAt
                                            ).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    {/* Added Author Section */}

                                    <div className="mt-auto">
                                        <Link
                                            to={`/solutions/${data._id}`}
                                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors"
                                        >
                                            {t('read_more')}
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
