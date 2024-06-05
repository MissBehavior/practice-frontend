import { Link } from 'react-router-dom'
import classNamees from './solutions.module.css'
import { useAuth } from '@/services/auth-service'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SolutionsAddNewSolution from './solutions-newsolution-dialog'
import { MdEdit } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import SolutionsDelete from './solutions-delete-confirm'
import SolutionsEditDialog from './solutions-edit-dialog'
import { SolutionsData } from '@/types'

export default function Solutions() {
    const [data, setData] = useState<SolutionsData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [hoveredItem, setHoveredItem] = useState<number | undefined>()

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:3000/solutions')
            console.log('response:', response)
            console.log('-----------------')
            setData(response.data.solutions)
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
                {Array.from({ length: 5 }).map((_) => (
                    <div className="flex w-full px-4 py-6 md:w-1/2 lg:w-1/3 justify-center">
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
            <div className={classNamees.container}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="mt-16 mb-12 min-h-64 bg-gray-100 flex justify-center items-center flex-col"
                    >
                        {user.isAdmin && (
                            <div className="flex flex-row ml-auto mb-[-20px] z-10 gap-2">
                                <SolutionsEditDialog
                                    _id={item._id}
                                    cardImgUrl={item.cardImgUrl}
                                    titleCard={item.titleCard}
                                    contentCard={item.contentCard}
                                    fetchData={fetchData}
                                />
                                <SolutionsDelete
                                    fetchData={fetchData}
                                    index={item._id}
                                />
                            </div>
                        )}
                        <Link to={`/solutions/` + item._id}>
                            <div
                                className={`p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(undefined)}
                            >
                                <img
                                    className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out"
                                    src={item.cardImgUrl}
                                    alt=""
                                />
                                <div className="mt-4">
                                    <h1 className="text-2xl font-bold text-gray-700">
                                        {item.titleCard}
                                    </h1>
                                    <p className="text-base mt-2 text-cyan-600">
                                        TEST STUFF
                                    </p>
                                    <p className="text-sm mt-2 text-gray-700 max-w-64">
                                        {item.contentCard}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                {user.isAdmin && (
                    <SolutionsAddNewSolution fetchData={fetchData} />
                )}
            </div>
        </>
    )
}
