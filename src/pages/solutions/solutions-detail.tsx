import { Skeleton } from '@/components/ui/skeleton'
import { SolutionsData } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNamees from './solutions.module.css'
import MyEditor from '@/components/editor'
import { Input } from '@/components/ui/input'
import { useAuth, useAxios } from '@/services/auth-service'
// import SolutionsEditDetail from './solution-edit-detail'
import { Button } from '@/components/ui/button'
import { MdEdit } from 'react-icons/md'
import { IoCloseSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
import parse from 'html-react-parser'
import DotLoader from 'react-spinners/DotLoader'
import { useTheme } from '@/components/theme-provider'

function SolutionsDetail() {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<SolutionsData>()
    const [image, setImage] = React.useState<File | null>(null)
    const [contentMain, setContentMain] = useState('')
    const [titleCard, setTitleCard] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const { t } = useTranslation()
    const { theme } = useTheme()

    const fetchSolutionDetail = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://localhost:3000/solutions/' + params.id
            )
            console.log('response:', response)
            console.log('-----------------')
            setData(response.data)
            setTitleCard(response.data.titleCard)
            setContentMain(response.data.contentMain)
            setLoading(false)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // }, 100000)
    }, [])
    useEffect(() => {
        if (data && data.contentMain) {
            setContentMain(data.contentMain)
            setTitleCard(data.titleCard)
        }
    }, [isEdit])

    if (loading) {
        return (
            <section className="flex flex-col flex-wrap mx-auto justify-center align-middle items-start text-center mr-auto ml-auto">
                {Array.from({ length: 1 }).map((_, index) => (
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        console.log('HANDLE SUBMIT in EDIT')
        if (!image || !contentMain) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            return
        }
        const formData = new FormData()
        formData.append('image', image)
        formData.append('titleCard', titleCard)
        formData.append('contentMain', contentMain)
        try {
            const response = await api.patch(
                '/solutions/detail/' + params.id,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            console.log(response.data)
        } catch (error) {
            console.error('Error uploading image:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
            setLoading(false)
            return
        }
        toast({
            variant: 'success',
            title: t('success'),
            description: t('changesSaved'),
        })
        setLoading(false)
        setIsEdit(false)
        fetchSolutionDetail()
    }
    return (
        <>
            <div className="mt-16 mb-12 min-h-64 bg-white dark:bg-background flex justify-center items-center flex-col">
                {user.isAdmin && (
                    <div className="flex flex-row mb-[-20px] z-10 gap-2">
                        <Button
                            className="rounded-md bg-slate-500 hover:bg-orange-300 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer"
                            onClick={() => {
                                setIsEdit(!isEdit)
                            }}
                        >
                            {!isEdit && (
                                <MdEdit className="relative top-0 right-0 w-[40px] p-1 h-[40px] rounded-md shadow-xl transition-all transform duration-150 hover:scale-105 cursor-pointer" />
                            )}
                            {isEdit && (
                                <IoCloseSharp className="relative top-0 right-0 w-[40px] p-1 h-[40px] rounded-md shadow-xl transition-all transform duration-150 hover:scale-105 cursor-pointer" />
                            )}
                        </Button>
                    </div>
                )}
                {isEdit && (
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                        <div
                            className={
                                'flex flex-wrap justify-center gap-4 items-start bg-white dark:bg-background'
                            }
                        >
                            <div
                                className={`p-6 min-w-[600px] gap-5 bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                            >
                                <img
                                    className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out mx-auto"
                                    src={data!.contentMainImg}
                                    alt=""
                                />
                                <div className="my-4">
                                    <h1 className="text-2xl font-bold text-gray-700">
                                        {data ? data.titleCard : titleCard}
                                    </h1>
                                    <Input
                                        id="title"
                                        className="col-span-3 mb-6"
                                        type="text"
                                        value={titleCard}
                                        onChange={(e) =>
                                            setTitleCard(e.target.value)
                                        }
                                    />
                                    <Input
                                        id="file"
                                        className="col-span-3 mb-6"
                                        type="file"
                                        onChange={handleImage}
                                    />

                                    <MyEditor
                                        valueEn={contentMain}
                                        setValueEn={setContentMain}
                                    />
                                </div>
                                {loading && (
                                    <DotLoader
                                        color={
                                            theme === 'dark'
                                                ? '#ffffff'
                                                : 'rgb(51 65 85)'
                                        }
                                    />
                                )}
                                {!loading && (
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="w-full"
                                    >
                                        {t('submit')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                )}
                {data?.contentMain == '' &&
                    data?.contentMainImg == '' &&
                    !isEdit && (
                        <div
                            className={`p-6 bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                        >
                            <div className="p-10">
                                <h1 className="text-xl mt-2 text-gray-700 dark:text-white max-w-64">
                                    Coming soon !
                                </h1>
                            </div>
                        </div>
                    )}
                {data?.contentMain && data?.contentMainImg && !isEdit && (
                    <div
                        className={`p-6 min-w-[600px] min-h-[30vh] flex flex-col bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
                    >
                        <img
                            className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out"
                            src={data!.contentMainImg}
                            alt=""
                        />
                        <div className="mt-4 w-full">
                            <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
                                {data!.titleCard}
                            </h1>

                            <div className="ql-editor">
                                {parse(data!.contentMain)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SolutionsDetail
