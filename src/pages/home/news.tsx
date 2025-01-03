import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import i18n from '@/i18n/config'
import { useAuth } from '@/services/auth-service'
import { PostData } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface PaginatedResponse {
    totalPages: number
    currentPage: number
    posts: PostData[]
}
function NewsHome() {
    const [postData, setPostData] = useState<PostData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { t } = useTranslation()

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get<PaginatedResponse>(
                'http://localhost:3000/posts',
                {
                    params: { limit: 3 },
                }
            )
            setPostData(response.data.posts)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }
    useEffect(() => {
        // setTimeout(() => {
        //     fetchData()
        // }, 10000)
        fetchData()
    }, [])

    return (
        <div className="pt-28 mb-8">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-wrap items-end justify-between">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                            {i18n.language === 'en'
                                ? 'Latest News'
                                : 'Naujausi Naujienos'}
                        </h2>
                        <p className="mt-4 dark:text-neutral-500 text-gray-800">
                            {i18n.language === 'en'
                                ? 'Stay updated with the latest developments, achievements, and insights from our team. Sekite naujausius mūsų komandos įvykius, pasiekimus ir įžvalgas.'
                                : 'Sekite naujausius mūsų komandos įvykius, pasiekimus ir įžvalgas.'}
                        </p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                        <Link to="/post-external">
                            <Button variant="outline">
                                {t('view_all_news')}
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap -mx-4">
                        {loading
                            ? // Skeletons when loading
                              Array.from({ length: 3 }).map((_, index) => (
                                  <div
                                      className="w-full md:w-1/3 px-4 mb-8"
                                      key={index}
                                  >
                                      <div className="relative rounded-lg overflow-hidden shadow-lg bg-neutral-900 h-full">
                                          {/* Image skeleton */}
                                          <div className="w-full h-96 bg-neutral-800 flex items-center justify-center overflow-hidden relative">
                                              <Skeleton className="w-full h-full object-cover" />
                                          </div>
                                          {/* Text skeleton */}
                                          <div className="absolute bottom-0 left-0 w-full p-4 pb-8 z-10 text-white">
                                              <Skeleton className="h-4 w-1/2 mb-2" />
                                              <Skeleton className="h-6 w-3/4 mb-3" />
                                              <Skeleton className="h-8 w-24 rounded" />
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : // Actual content when not loading
                              postData.map((post, index) => (
                                  <div
                                      className="w-full md:w-1/3 px-4 mb-8"
                                      key={index}
                                  >
                                      <div className="relative group transition-transform duration-300 rounded-lg overflow-hidden shadow-lg bg-neutral-900 h-full">
                                          {/* Image Container */}
                                          <div className="w-full h-96 relative bg-neutral-800 flex items-center justify-center overflow-hidden">
                                              <img
                                                  src={post.postPicture}
                                                  alt="Portfolio Image"
                                                  className="w-full h-full object-cover filter brightness-75 transform group-hover:scale-105 transition-transform duration-300"
                                              />
                                              <div className="absolute inset-0 bg-gradient-to-b from-[#4d93c2] to-black opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-85"></div>
                                          </div>

                                          {/* Text Content Overlay */}
                                          <div className="absolute bottom-0 left-0 w-full p-4 pb-8 z-10">
                                              <div className="text-white">
                                                  <p className="text-sm mb-1 line-clamp-2">
                                                      {post.content}
                                                  </p>
                                                  <h4 className="text-xl font-bold mb-2 line-clamp-2">
                                                      <Link
                                                          to={`/post-external/${post._id}`}
                                                      >
                                                          {post.title}
                                                      </Link>
                                                  </h4>
                                                  <div>
                                                      <Link
                                                          className="inline-block bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300"
                                                          to={`/post-external/${post._id}`}
                                                      >
                                                          {t('learn_more')}
                                                      </Link>
                                                  </div>
                                              </div>
                                          </div>

                                          {/* Link overlay for entire card */}
                                          <Link
                                              className="absolute inset-0"
                                              to={`/post-external/${post._id}`}
                                          ></Link>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsHome
