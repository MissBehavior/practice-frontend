// components/LatestPost.tsx
import React from 'react'
import { PostData } from '@/types'
import { getRandomColorFromString } from '../../lib/utils'
import Tag from './tag'
import { Link } from 'react-router-dom'

interface LatestPostProps {
    latestPost: PostData | null
}

export default function LatestPost({ latestPost }: LatestPostProps) {
    if (!latestPost) return <div>Loading...</div>

    return (
        <article className="mx-2 my-10 max-w-screen-lg rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto dark:bg-[#191919] bg-slate-400">
            <div className="flex flex-col md:flex-row">
                <div className="p-5 md:w-4/6 md:p-8">
                    <div className="flex flex-wrap gap-2">
                        {latestPost.categories &&
                            latestPost.categories.map((cat) => (
                                <Tag key={cat._id} name={cat.name} />
                            ))}
                    </div>
                    <p className="mt-2 text-xl font-black md:mt-6 md:text-4xl">
                        {latestPost.title}
                    </p>
                    <p className="mt-3 text-gray-600">
                        {latestPost.content.substring(0, 200)}...
                    </p>

                    <Link
                        to={`/post-external/${latestPost._id}`}
                        className="mt-4 mr-2 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 hover:bg-sky-500"
                    >
                        Read More
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
