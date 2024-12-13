// src/components/PostDetail.tsx

import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa'
import { PostData } from '@/types' // Ensure this type includes all necessary fields
import { Button } from '../../components/ui/button' // Assuming you have a Button component
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import axios from 'axios'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import Breadcrumb from '@/components/breadcrumb'
import Tag from './tag'

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<PostData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { t } = useTranslation()
    useEffect(() => {
        console.log('USEEFFECT')
        console.log(id)
        if (!id) {
            setError(t('post_not_found'))
            setLoading(false)
            return
        }

        const fetchPost = async () => {
            try {
                const response = await axios.get<PostData>(
                    `http://localhost:3000/posts/${id}`
                )
                console.log('lllllllllllllllllllllll')
                console.log(response.data)
                setPost(response.data)
            } catch (err: any) {
                console.error(err)
                if (err.response) {
                    // Server responded with a status other than 200 range
                    setError(
                        err.response.data.message || t('error_fetching_post')
                    )
                } else if (err.request) {
                    // Request was made but no response
                    setError(t('no_response_from_server'))
                } else {
                    // Something else happened
                    setError(t('error_fetching_post'))
                }
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#191919]">
                <p className="text-gray-300 text-xl">{t('loading')}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#191919]">
                <p className="text-red-500 text-xl mb-4">{error}</p>
                <Button onClick={() => navigate(-1)}>
                    <FaArrowLeft className="mr-2" />
                    {t('go_back')}
                </Button>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#191919]">
                <p className="text-gray-300 text-xl">{t('post_not_found')}</p>
                <Button onClick={() => navigate(-1)}>
                    <FaArrowLeft className="mr-2" />
                    {t('go_back')}
                </Button>
            </div>
        )
    }

    const MAX_DISPLAY_CATEGORIES = 5

    return (
        <>
            <Breadcrumb title={t('News')} parent={t('News')} />
            <div className="py-10 bg-[#191919] min-h-screen">
                <div className="max-w-5xl mx-auto px-4 ">
                    <Link
                        to="/post-external"
                        className="flex items-center text-gray-300 hover:text-gray-500 mb-6"
                    >
                        <FaArrowLeft className="mr-2" />
                        {t('back_to_posts')}
                    </Link>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-svh">
                        <img
                            className="w-full h-96 object-cover"
                            src={post.postPicture}
                            alt={post.title}
                        />
                        <div className="p-6">
                            <div className="flex flex-wrap mb-4 gap-2">
                                {post.categories
                                    .slice(0, MAX_DISPLAY_CATEGORIES)
                                    .map((category) => (
                                        <Tag
                                            key={category._id}
                                            name={category.name}
                                        />
                                    ))}
                                {post.categories.length >
                                    MAX_DISPLAY_CATEGORIES && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="rounded p-1 bg-slate-500 m-1 text-xs cursor-pointer transition-colors hover:bg-slate-700">
                                                    +
                                                    {post.categories.length -
                                                        MAX_DISPLAY_CATEGORIES}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-gray-800 text-white text-xs rounded py-2 px-3">
                                                <div className="flex flex-col">
                                                    {post.categories
                                                        .slice(
                                                            MAX_DISPLAY_CATEGORIES
                                                        )
                                                        .map((category) => (
                                                            <span
                                                                key={
                                                                    category._id
                                                                }
                                                                className="rounded p-1 bg-slate-600 m-1 whitespace-nowrap"
                                                            >
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center text-gray-600 text-sm mb-4">
                                <FaCalendarAlt className="mr-2" />
                                <span>
                                    {format(
                                        new Date(post.createdAt),
                                        'MMMM d, yyyy'
                                    )}
                                </span>
                                <span className="mx-2">|</span>
                                <FaUser className="mr-2" />
                                <span>
                                    {t('by')} {post.userId.name}
                                </span>
                            </div>
                            <div className="prose prose-lg text-gray-800">
                                {/* Render HTML content safely */}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                />
                            </div>
                            {/* Optional: Display additional information or related posts */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetail
