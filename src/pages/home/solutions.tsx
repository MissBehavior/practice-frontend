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
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'

export default function Solutions() {
    const { t } = useTranslation()
    const [solutionData, setSolutionData] = useState<SolutionsData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

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
        fetchData()
    }, [])

    const title = 'Our Works'
    const titleLT = 'Mūsų darbai'
    const description =
        'Explore the solutions we offer to help businesses optimize processes, improve efficiency, and achieve outstanding results.'
    const descriptionLT =
        'Susipažinkite su mūsų siūlomais sprendimais, padedančiais įmonėms optimizuoti procesus, padidinti efektyvumą ir pasiekti puikių rezultatų.'

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-end">
                <div className="w-full lg:w-1/2">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold dark:text-white text-black">
                            {i18n.language === 'en' ? title : titleLT}
                        </h2>
                        <p className="dark:text-slate-50 text-gray-700 mt-4">
                            {i18n.language === 'en'
                                ? description
                                : descriptionLT}
                        </p>
                    </div>
                </div>
                <div className="mt-4 lg:mt-0">
                    <Link to="/solutions">
                        <Button variant="outline">
                            {t('view_all_solutions')}
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="py-8">
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
                                        <div className="w-full h-96 relative bg-neutral-800 flex items-center justify-center">
                                            <img
                                                src={card.cardImgUrl}
                                                alt="Portfolio Image"
                                                className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-[#4d93c2] to-black opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-85"></div>
                                        </div>

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
                                                    <Link
                                                        className="inline-block bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300"
                                                        to={`/solutions/${card._id}`}
                                                    >
                                                        {t('learn_more')}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            className="absolute inset-0"
                                            to={`/solutions/${card._id}`}
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
