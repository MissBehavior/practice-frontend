import { Skeleton } from '@/components/ui/skeleton'
import { SolutionsData } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNamees from './solutions.module.css'
import MyEditor from '@/components/editor'
import { Input } from '@/components/ui/input'

function SolutionsDetail() {
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<SolutionsData>()
    const [image, setImage] = React.useState<File | null>(null)
    const [valueEn, setValueEn] = useState('')
    console.log(params)
    const fetchSolutionDetail = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://localhost:3000/solutions/' + params.id
            )
            console.log('response:', response)
            console.log('-----------------')
            setData(response.data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Image selected')
        console.log(e.target.files?.[0])
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
        } else {
            setImage(null)
        }
    }
    useEffect(() => {
        // setTimeout(() => {
        fetchSolutionDetail()
        // }, 1000)
    }, [])
    if (loading) {
        return (
            <section className="flex flex-col flex-wrap mx-auto justify-center align-middle text-center mr-auto ml-auto">
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
            <div className={classNamees.container}>
                <div className="mt-16 mb-12 min-h-64 bg-gray-100 flex justify-center items-center flex-col">
                    <div
                        className={`p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                    >
                        <img
                            className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out"
                            src={data!.cardImgUrl}
                            alt=""
                        />
                        <div className="mt-4">
                            <MyEditor
                                valueEn={valueEn}
                                setValueEn={setValueEn}
                            />
                            <h1 className="text-2xl font-bold text-gray-700">
                                {data!.titleCard}
                            </h1>
                            <Input
                                id="file"
                                className="col-span-3"
                                type="file"
                                onChange={handleImage}
                            />
                            <p className="text-base mt-2 text-cyan-600">
                                TEST STUFF
                            </p>
                            <p className="text-sm mt-2 text-gray-700 max-w-64">
                                {data!.contentCard}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SolutionsDetail
