import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaThumbsUp, FaCommentDots, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

interface MostLikedPost {
    _id: string
    title: string
    content: string
    likes: any[]
    comments: any[]
    userId: {
        _id: string
        name: string
        profileImgUrl: string
    }
    createdAt: string
}

const MostLikedPostCard: React.FC = () => {
    const [post, setPost] = useState<MostLikedPost | null>(null)
    const { t } = useTranslation()

    const fetchMostLikedPost = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/postinternal/post-stats/most-liked'
            )
            console.log('Most liked post:', response.data)
            setPost(response.data)
        } catch (error) {
            console.error('Error fetching most liked post:', error)
        }
    }

    useEffect(() => {
        fetchMostLikedPost()
    }, [])

    if (!post) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    {t('noDataAvailable')}
                </p>
            </div>
        )
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString()

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
            <Link
                to={`/team-updates/${post._id}`}
                className="hover:text-blue-500 cursor-pointer hover:filter hover:brightness-110"
            >
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    {t('mostLikedPost')}
                </h2>

                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        {post.userId?.profileImgUrl ? (
                            <img
                                src={post.userId.profileImgUrl}
                                alt={post.userId.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaUserCircle className="text-gray-400 w-full h-full" />
                        )}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {post.userId?.name || 'Unknown User'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {post.title}
                </h4>

                <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaThumbsUp className="mr-2 text-blue-500" />
                        <span>
                            {post.likes.length} {t('likes')}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaCommentDots className="mr-2 text-green-500" />
                        <span>
                            {post.comments.length} {t('comments')}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MostLikedPostCard
