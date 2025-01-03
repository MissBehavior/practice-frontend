import React from 'react'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { PostData } from '@/types'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { FaCalendarAlt, FaUser } from 'react-icons/fa' // Import the calendar and user icons
import Tag from './tag'
import i18n from '@/i18n/config'

interface PostGridProps {
    data: PostData[]
    totalPages: number
    currentPage: number
    onNextPage: () => void
    onPrevPage: () => void
    t: (key: string) => string
}

const MAX_DISPLAY_CATEGORIES = 4

const PostGrid: React.FC<PostGridProps> = React.memo(
    ({ data, totalPages, currentPage, onNextPage, onPrevPage, t }) => {
        return (
            <div className="py-28  dark:bg-[#101010] bg-slate-300">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((post, i) => (
                            <div
                                key={i}
                                className="flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow bg-slate-400 dark:bg-[#191919]"
                            >
                                <Link to={`/post-external/${post._id}`}>
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={post.postPicture}
                                        alt={post.title}
                                    />
                                </Link>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <p className="text-sm font-medium text-white mb-2 flex flex-wrap gap-2">
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
                                                            {post.categories
                                                                .length -
                                                                MAX_DISPLAY_CATEGORIES}
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-gray-800 text-white text-xs rounded py-2 px-3">
                                                        <div className="flex flex-col">
                                                            {post.categories
                                                                .slice(
                                                                    MAX_DISPLAY_CATEGORIES
                                                                )
                                                                .map(
                                                                    (
                                                                        category
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                category._id
                                                                            }
                                                                            className="rounded p-1 bg-slate-600 m-1 whitespace-nowrap"
                                                                        >
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </p>
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-slate-300 mb-2">
                                        <Link
                                            to={`/post-external/${post._id}`}
                                            className="hover:text-gray-600"
                                        >
                                            {i18n.language === 'en'
                                                ? post.title
                                                : post.titleLT}
                                        </Link>
                                    </h4>
                                    {/* Added Date Section */}
                                    <div className="flex items-center text-gray-600 dark:text-slate-400 text-sm mb-2">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    {/* Added Author Section */}
                                    <div className="flex items-center text-gray-600 dark:text-slate-400 text-sm mb-4">
                                        <FaUser className="mr-2" />
                                        <span>
                                            {t('by')} {post.userId.name}
                                        </span>
                                    </div>
                                    <div className="mt-auto">
                                        <Link
                                            to={`/post-external/${post._id}`}
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
                {totalPages > 1 && (
                    <div className="flex items-center space-x-4 justify-center dark:bg-[#191919] bg-slate-400 mt-5">
                        <Button
                            disabled={currentPage === 1}
                            onClick={onPrevPage}
                        >
                            {t('previous')}
                        </Button>
                        <Button
                            disabled={currentPage === totalPages}
                            onClick={onNextPage}
                        >
                            {t('next')}
                        </Button>
                    </div>
                )}
            </div>
        )
    }
)

export default PostGrid
