// src/components/SolutionsDetail.tsx

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SolutionsData } from '@/types'
import axios from 'axios'
import { useAuth, useAxios } from '@/services/auth-service'
import { Button } from '@/components/ui/button'
import { MdEdit } from 'react-icons/md'
import { IoCloseSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
import parse from 'html-react-parser'
import DotLoader from 'react-spinners/DotLoader'
import { useTheme } from '@/components/theme-provider'
import Breadcrumb from '@/components/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import MyEditor from '@/components/editor'
import { Input } from '@/components/ui/input'

function SolutionsDetail() {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const params = useParams<{ id: string }>()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<SolutionsData | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [contentMain, setContentMain] = useState('')
    const [titleCard, setTitleCard] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const { t } = useTranslation()
    const { theme } = useTheme()

    const fetchSolutionDetail = async () => {
        setLoading(true)
        try {
            const response = await axios.get<SolutionsData>(
                `http://localhost:3000/solutions/${params.id}`
            )
            setData(response.data)
            setTitleCard(response.data.titleCard)
            setContentMain(response.data.contentMain)
        } catch (error) {
            console.error('Error fetching data:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error_fetching_data'),
            })
        } finally {
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
        fetchSolutionDetail()
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (!contentMain) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            setLoading(false)
            return
        }

        const formData = new FormData()
        if (image) formData.append('image', image)
        formData.append('titleCard', titleCard)
        formData.append('contentMain', contentMain)

        try {
            const response = await api.patch(
                `/solutions/detail/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            toast({
                variant: 'success',
                title: t('success'),
                description: t('changesSaved'),
            })
            setIsEdit(false)
            fetchSolutionDetail()
        } catch (error) {
            console.error('Error updating solution:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error_saving_changes'),
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <>
                <Breadcrumb title={t('Solutions')} parent={t('Solutions')} />
                <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                    <DotLoader
                        color={theme === 'dark' ? '#ffffff' : '#3b82f6'}
                        size={60}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <Breadcrumb title={t('Solutions')} parent={t('Solutions')} />
            <div className="py-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <div className="max-w-5xl mx-auto px-4">
                    {user.isAdmin && (
                        <div className="flex justify-end mb-4">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => setIsEdit(!isEdit)}
                            >
                                {isEdit ? (
                                    <>
                                        <IoCloseSharp size={20} />
                                        {t('cancel')}
                                    </>
                                ) : (
                                    <>
                                        <MdEdit size={20} />
                                        {t('edit')}
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                    {isEdit ? (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('title')}
                                </label>
                                <Input
                                    type="text"
                                    value={titleCard}
                                    onChange={(e) =>
                                        setTitleCard(e.target.value)
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('image')}
                                </label>
                                <Input
                                    type="file"
                                    onChange={handleImage}
                                    accept="image/*"
                                    className="w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('content')}
                                </label>
                                <MyEditor
                                    valueEn={contentMain}
                                    setValueEn={setContentMain}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <DotLoader
                                            color={
                                                theme === 'dark'
                                                    ? '#ffffff'
                                                    : '#3b82f6'
                                            }
                                            size={20}
                                        />
                                    ) : (
                                        t('submit')
                                    )}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        data && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                {data.contentMainImg && (
                                    <img
                                        src={data.contentMainImg}
                                        alt={data.titleCard}
                                        className="w-full h-96 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                        {data.titleCard}
                                    </h1>
                                    <div className="prose dark:prose-dark max-w-none">
                                        {parse(data.contentMain)}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default SolutionsDetail
