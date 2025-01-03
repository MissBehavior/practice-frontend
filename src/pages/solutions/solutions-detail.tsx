import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SolutionsData } from '@/types'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
import ReactMarkdown from 'react-markdown'
import DotLoader from 'react-spinners/DotLoader'
import { useTheme } from '@/components/theme-provider'
import Breadcrumb from '@/components/breadcrumb'
import i18n from '@/i18n/config'

function SolutionsDetail() {
    const params = useParams<{ id: string }>()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<SolutionsData | null>(null)
    const { t } = useTranslation()
    const { theme } = useTheme()

    const fetchSolutionDetail = async () => {
        setLoading(true)
        try {
            const response = await axios.get<SolutionsData>(
                `http://localhost:3000/solutions/${params.id}`
            )
            setData(response.data)
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
    useEffect(() => {
        fetchSolutionDetail()
    }, [params.id])
    if (loading) {
        return (
            <>
                <Breadcrumb title={t('Solutions')} parent={t('Solutions')} />
                <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                    <DotLoader
                        color={theme === 'dark' ? '#ffffff' : '#191919'}
                        size={60}
                    />
                </div>
            </>
        )
    }
    return (
        <>
            <Breadcrumb title={t('Solutions')} parent={t('Solutions')} />
            <div className="py-10 bg-[#f2f2f2] dark:bg-[#191919] min-h-screen">
                <div className="max-w-5xl mx-auto px-4">
                    {data && (
                        <div className="bg-[#ffffff] dark:bg-[#101010] rounded-lg shadow-lg overflow-hidden">
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

                                {i18n.language === 'en' ? (
                                    <div className="prose dark:prose-dark max-w-none mb-4">
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ node, ...props }) => (
                                                    <h1
                                                        className="text-2xl font-bold"
                                                        {...props}
                                                    />
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p
                                                        className="text-gray-800 dark:text-gray-300"
                                                        {...props}
                                                    />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h2
                                                        className="text-xl font-semibold"
                                                        {...props}
                                                    />
                                                ),
                                                ul: ({ node, ...props }) => (
                                                    <ul
                                                        className="list-disc ml-5"
                                                        {...props}
                                                    />
                                                ),
                                                ol: ({ node, ...props }) => (
                                                    <ol
                                                        className="list-decimal ml-5"
                                                        {...props}
                                                    />
                                                ),
                                                table: ({ node, ...props }) => (
                                                    <table
                                                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                                        {...props}
                                                    />
                                                ),
                                                th: ({ node, ...props }) => (
                                                    <th
                                                        className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-800 dark:text-gray-300 uppercase tracking-wider"
                                                        {...props}
                                                    />
                                                ),
                                                td: ({ node, ...props }) => (
                                                    <td
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300"
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
                                                h1: ({ node, ...props }) => (
                                                    <h1
                                                        className="text-2xl font-bold"
                                                        {...props}
                                                    />
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p
                                                        className="text-gray-800 dark:text-gray-300"
                                                        {...props}
                                                    />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h2
                                                        className="text-xl font-semibold"
                                                        {...props}
                                                    />
                                                ),
                                                ul: ({ node, ...props }) => (
                                                    <ul
                                                        className="list-disc ml-5"
                                                        {...props}
                                                    />
                                                ),
                                                ol: ({ node, ...props }) => (
                                                    <ol
                                                        className="list-decimal ml-5"
                                                        {...props}
                                                    />
                                                ),
                                                table: ({ node, ...props }) => (
                                                    <table
                                                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                                        {...props}
                                                    />
                                                ),
                                                th: ({ node, ...props }) => (
                                                    <th
                                                        className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-800 dark:text-gray-300 uppercase tracking-wider"
                                                        {...props}
                                                    />
                                                ),
                                                td: ({ node, ...props }) => (
                                                    <td
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300"
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SolutionsDetail
