import { useAuth } from '@/services/auth-service'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GalleryNewDialog from './gallery-new-dialog'
import { GalleryData } from '@/types'
import GalleryDelete from './gallery-delete'
import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/breadcrumb'
import { useTranslation } from 'react-i18next'
import GalleryEditDialog from './gallery-edit'
import i18n from '@/i18n/config'

export default function Gallery() {
    const { user } = useAuth()
    const [data, setData] = useState<GalleryData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { t } = useTranslation()
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:3000/gallery')
            console.log('response:', response)
            console.log('-----------------')
            setData(response.data.gallery)
            setLoading(false)
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // setTimeout(() => {
        fetchData()
        // }, 10000)
        // fetchData(currentPage)
    }, [])
    if (loading) {
        return (
            <div className="dark:bg-[#101010] bg-slate-300 min-h-screen">
                <Breadcrumb title={t('gallery')} parent={t('gallery')} />

                <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col overflow-hidden rounded-lg shadow dark:bg-gray-800 bg-slate-400 p-4"
                        >
                            <Skeleton className="h-48 w-full mb-4 rounded" />
                        </div>
                    ))}
                </section>
            </div>
        )
    }

    return (
        <div className="min-h-svh dark:bg-[#101010] bg-slate-400">
            <Breadcrumb title={t('gallery')} parent={t('gallery')} />
            <section id="portfolio" className="text-center py-12 ">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <p className="mt-4 dark:text-white text-black max-w-md mx-auto">
                            {i18n.language === 'en'
                                ? 'Explore our collection of stunning images showcasing our work and creativity.'
                                : 'Naršykite mūsų nuostabių vaizdų kolekciją, atspindinčią mūsų darbą ir kūrybiškumą.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data.map((item, index) => (
                            <div
                                key={`${item.title}-${index}`}
                                className="relative overflow-hidden rounded-lg shadow-lg group"
                            >
                                {user.isAdmin && (
                                    <div className="absolute top-2 right-2 z-20">
                                        <GalleryDelete
                                            fetchData={fetchData}
                                            index={item._id}
                                        />
                                        <GalleryEditDialog
                                            gallery={{
                                                _id: item._id,
                                                title: item.title,
                                                cardImgUrl: item.cardImgUrl,
                                                galleryImages:
                                                    item.galleryImages || [],
                                            }}
                                            fetchData={fetchData}
                                        />
                                    </div>
                                )}
                                <img
                                    src={item.cardImgUrl}
                                    alt={item.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center">
                                        <h3 className="text-white text-xl font-semibold mb-2">
                                            {item.title}
                                        </h3>
                                        <Link
                                            to={`/gallery/` + item._id}
                                            title={item.title}
                                            data-lightbox-gallery="gallery1"
                                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            {t('viewGallery')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {user.isAdmin && (
                            <GalleryNewDialog fetchData={fetchData} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
