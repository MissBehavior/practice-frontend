import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useAuth } from '@/services/auth-service'
import axios from 'axios'
import { SolutionsData } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

export default function Solutions() {
    const { user } = useAuth()
    const [solutionData, setSolutionData] = useState<SolutionsData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [hoveredItem, setHoveredItem] = useState<number | undefined>()

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:3000/solutions')
            console.log('response:', response)
            console.log('-----------------')
            setSolutionData(response.data.solutions)
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

    const title = 'Our Works'
    const description =
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.'

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-white">
                            {title}
                        </h2>
                        <p className="text-slate-50 mt-4">{description}</p>
                    </div>
                </div>
            </div>

            <div className="">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    speed={500}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    spaceBetween={20}
                    slidesPerView={6}
                    className="flex flex-row items-center align-middle justify-center"
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        320: { slidesPerView: 1 },
                        481: { slidesPerView: 2 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        993: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1200: { slidesPerView: 5 },
                        1280: { slidesPerView: 5 },
                    }}
                >
                    {loading ? (
                        <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative group">
                                        <Skeleton className="w-full h-64" />
                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <Skeleton className="h-4 w-1/4 mb-2" />
                                            <Skeleton className="h-6 w-1/2 mb-2" />
                                            <Skeleton className="h-8 w-24" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        <>
                            {solutionData.map((card, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative group transition-transform duration-300 rounded-lg overflow-hidden shadow-lg bg-neutral-900">
                                        {/* Image Container */}
                                        <div className="w-full h-96 relative bg-neutral-800 flex items-center justify-center">
                                            <img
                                                src={card.cardImgUrl}
                                                alt="Portfolio Image"
                                                className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 duration-300"
                                            />
                                            {/* Gradients can be subtle or more pronounced depending on preference */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-[#4d93c2] to-black opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-85"></div>
                                        </div>

                                        {/* Text Content Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-4 pb-8 z-10">
                                            <div className="text-white ">
                                                <p className="text-sm mb-1 line-clamp-2">
                                                    {card.contentCard}
                                                </p>
                                                <h4 className="text-xl font-bold mb-2 line-clamp-2">
                                                    <a href="/portfolio-details">
                                                        {card.titleCard}
                                                    </a>
                                                </h4>
                                                <div>
                                                    <a
                                                        className="inline-block bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300"
                                                        href="/portfolio-details"
                                                    >
                                                        Learn more
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Link overlay for entire card */}
                                        <Link
                                            className="absolute inset-0"
                                            to="/portfolio-details"
                                        ></Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </>
                    )}
                </Swiper>
            </div>
        </div>
    )
}
