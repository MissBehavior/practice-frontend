import React from 'react'
import { PostData } from '@/types'
import { getRandomColorFromString } from '../../lib/utils'
import Tag from './tag'
import { Link } from 'react-router-dom'
import i18n from '@/i18n/config'
import { useTranslation } from 'react-i18next'

interface LatestPostProps {
    latestPost: PostData | null
}

export default function LatestPost({ latestPost }: LatestPostProps) {
    const { t } = useTranslation()
    if (!latestPost) return <div>Loading...</div>

    return (
        <article className="mx-2 my-10 max-w-screen-lg rounded-md text-gray-700 shadow-md md:mx-auto dark:bg-[#191919] bg-[#ffffff]">
            <div className="flex flex-col md:flex-row">
                <div className="p-5 md:w-4/6 md:p-8">
                    <div className="flex flex-wrap gap-2">
                        {latestPost.categories &&
                            latestPost.categories.map((cat) => (
                                <Tag key={cat._id} name={cat.name} />
                            ))}
                    </div>
                    <p className="mt-2 text-xl font-black md:mt-6 md:text-4xl dark:text-white">
                        {i18n.language === 'en'
                            ? latestPost.title
                            : latestPost.titleLT}
                    </p>
                    <p className="mt-3 text-gray-600 dark:text-white">
                        {i18n.language === 'en'
                            ? latestPost.content.substring(0, 200)
                            : latestPost.contentLT.substring(0, 200)}
                        ...
                        {/* {latestPost.content.substring(0, 200)}... */}
                    </p>

                    <Link
                        to={`/post-external/${latestPost._id}`}
                        className="mt-4 mr-2 flex items-center justify-center rounded-md bg-[#101010] hover:bg-[#272727] px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 "
                    >
                        {t('read_more')}
                    </Link>
                </div>
                <div className="mx-auto hidden items-center px-5 md:flex md:p-8">
                    <img
                        className="rounded-md shadow-lg"
                        src={latestPost.postPicture}
                        alt="Shop image"
                    />
                </div>
            </div>
        </article>
    )
}
