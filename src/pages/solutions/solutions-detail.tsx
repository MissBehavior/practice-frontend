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
import ReactMarkdown from 'react-markdown' // Import ReactMarkdown
import DotLoader from 'react-spinners/DotLoader'
import { useTheme } from '@/components/theme-provider'
import Breadcrumb from '@/components/breadcrumb'
import MDEditor from '@uiw/react-md-editor' // Import MDEditor
import { Input } from '@/components/ui/input'
import i18n from '@/i18n/config'

function SolutionsDetail() {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const params = useParams<{ id: string }>()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<SolutionsData | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [contentMain, setContentMain] = useState<string | undefined>('')
    const [contentMainLT, setContentMainLT] = useState<string | undefined>('')
    const [titleCard, setTitleCard] = useState<string>('')
    const [titleCardLT, setTitleCardLT] = useState<string>('')
    const [contentCard, setContentCard] = useState<string>('')
    const [contentCardLT, setContentCardLT] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
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
            setTitleCardLT(response.data.titleCardLT)
            setContentCard(response.data.contentCard)
            setContentCardLT(response.data.contentCardLT)
            setContentMain(response.data.contentMain)
            setContentMainLT(response.data.contentMainLT)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (
            !titleCard ||
            !titleCardLT ||
            !contentCard ||
            !contentCardLT ||
            !contentMain ||
            !contentMainLT
        ) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('titleCard', titleCard)
        formData.append('titleCardLT', titleCardLT)
        formData.append('contentCard', contentCard)
        formData.append('contentCardLT', contentCardLT)
        formData.append('contentMain', contentMain)
        formData.append('contentMainLT', contentMainLT)
        if (image) {
            formData.append('contentMainImg', image)
        }

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

    useEffect(() => {
        fetchSolutionDetail()
    }, [params.id])

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
                            {/* Title Card */}
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

                            {/* Title Card LT */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('titleLT')}
                                </label>
                                <Input
                                    type="text"
                                    value={titleCardLT}
                                    onChange={(e) =>
                                        setTitleCardLT(e.target.value)
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            {/* Content Card */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('contentCard')}
                                </label>
                                <Input
                                    type="text"
                                    value={contentCard}
                                    onChange={(e) =>
                                        setContentCard(e.target.value)
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            {/* Content Card LT */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('contentCardLT')}
                                </label>
                                <Input
                                    type="text"
                                    value={contentCardLT}
                                    onChange={(e) =>
                                        setContentCardLT(e.target.value)
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            {/* Content Main */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('contentMain')}
                                </label>
                                <MDEditor
                                    value={contentMain}
                                    onChange={(value) =>
                                        setContentMain(value || '')
                                    }
                                    height={200}
                                    data-color-mode={
                                        theme === 'dark' ? 'dark' : 'light'
                                    }
                                />
                            </div>

                            {/* Content Main LT */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('contentMainLT')}
                                </label>
                                <MDEditor
                                    value={contentMainLT}
                                    onChange={(value) =>
                                        setContentMainLT(value || '')
                                    }
                                    height={200}
                                    data-color-mode={
                                        theme === 'dark' ? 'dark' : 'light'
                                    }
                                />
                            </div>

                            {/* Content Main Image Upload */}
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                    {t('contentMainImg')}
                                </label>
                                <Input
                                    type="file"
                                    onChange={handleImage}
                                    accept="image/*"
                                    className="w-full"
                                />
                                {/* Optional: Preview of selected image */}
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Content Main Preview"
                                        className="mt-2 h-48 w-full object-cover rounded"
                                    />
                                )}
                                {/* If no new image is selected, show existing image */}
                                {!image && data?.contentMainImg && (
                                    <img
                                        src={data.contentMainImg}
                                        alt={data.titleCard}
                                        className="mt-2 h-48 w-full object-cover rounded"
                                    />
                                )}
                            </div>

                            {/* Submit Button */}
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
                                {/* Card Image */}
                                {data.cardImgUrl && (
                                    <img
                                        src={data.cardImgUrl}
                                        alt={data.titleCard}
                                        className="w-full h-96 object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    {/* Title Card */}
                                    {i18n.language === 'en' ? (
                                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                            {data.titleCard}
                                        </h1>
                                    ) : (
                                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                            {data.titleCardLT}
                                        </h2>
                                    )}

                                    {/* {i18n.language === 'en' ? (
                                        <div className="mb-4">
                                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                {t('contentCard')}
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-200">
                                                {data.contentCard}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="mb-4">
                                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                {t('contentCardLT')}
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-200">
                                                {data.contentCardLT}
                                            </p>
                                        </div>
                                    )} */}

                                    {i18n.language === 'en' ? (
                                        <div className="prose dark:prose-dark max-w-none mb-4">
                                            <ReactMarkdown
                                                components={{
                                                    h1: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <h1
                                                            className="text-2xl font-bold"
                                                            {...props}
                                                        />
                                                    ),
                                                    h2: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <h2
                                                            className="text-xl font-semibold"
                                                            {...props}
                                                        />
                                                    ),
                                                    ul: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <ul
                                                            className="list-disc ml-5"
                                                            {...props}
                                                        />
                                                    ),
                                                    ol: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <ol
                                                            className="list-decimal ml-5"
                                                            {...props}
                                                        />
                                                    ),
                                                    table: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <table
                                                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                                            {...props}
                                                        />
                                                    ),
                                                    th: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <th
                                                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                                            {...props}
                                                        />
                                                    ),
                                                    td: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <td
                                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                            {...props}
                                                        />
                                                    ),
                                                    a: ({ node, ...props }) => (
                                                        <a
                                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                                            {...props}
                                                        />
                                                    ),
                                                }}
                                            >
                                                {data.contentMain}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <div className="prose dark:prose-dark max-w-none mb-4">
                                            <ReactMarkdown
                                                components={{
                                                    h1: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <h1
                                                            className="text-2xl font-bold"
                                                            {...props}
                                                        />
                                                    ),
                                                    h2: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <h2
                                                            className="text-xl font-semibold"
                                                            {...props}
                                                        />
                                                    ),
                                                    ul: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <ul
                                                            className="list-disc ml-5"
                                                            {...props}
                                                        />
                                                    ),
                                                    ol: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <ol
                                                            className="list-decimal ml-5"
                                                            {...props}
                                                        />
                                                    ),
                                                    table: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <table
                                                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                                            {...props}
                                                        />
                                                    ),
                                                    th: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <th
                                                            className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                                            {...props}
                                                        />
                                                    ),
                                                    td: ({
                                                        node,
                                                        ...props
                                                    }) => (
                                                        <td
                                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                            {...props}
                                                        />
                                                    ),
                                                    a: ({ node, ...props }) => (
                                                        <a
                                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                                            {...props}
                                                        />
                                                    ),
                                                }}
                                            >
                                                {data.contentMainLT}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                    {/* {data.contentMainImg && (
                                        <img
                                            src={data.contentMainImg}
                                            alt={`${data.titleCard} Content`}
                                            className="w-full h-64 object-cover mb-4 rounded"
                                        />
                                    )} */}
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
