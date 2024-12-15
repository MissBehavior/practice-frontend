import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import Breadcrumb from '@/components/breadcrumb'
import { GalleryData, galleryImages } from '@/types'

export default function GalleryDetail() {
    const { id } = useParams()
    const [gallery, setGallery] = useState<GalleryData>()
    const [images, setImages] = useState<galleryImages[]>([])

    const fetchGalleryDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/gallery/${id}`
            )
            console.log('Gallery details:', response.data)
            setGallery(response.data)
            setImages(response.data.galleryImages) // Assuming `images` is an array of image URLs
        } catch (error) {
            console.error('Error fetching gallery details:', error)
        }
    }

    useEffect(() => {
        fetchGalleryDetails()
    }, [id])

    if (!gallery) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-300 dark:bg-[#101010]">
            <Breadcrumb title={gallery.title} parent={'Gallery'} />
            <section className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold dark:text-white text-black mb-6 text-center">
                    {gallery.title}
                </h1>

                <Gallery withDownloadButton>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((image, index) => (
                            <Item
                                key={index}
                                original={image.imgUrl}
                                thumbnail={image.imgUrl}
                            >
                                {({ ref, open }) => (
                                    <img
                                        ref={ref}
                                        onClick={open}
                                        src={image.imgUrl}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-lg cursor-pointer transform hover:scale-110 transition-transform duration-300"
                                    />
                                )}
                            </Item>
                        ))}
                    </div>
                </Gallery>
            </section>
        </div>
    )
}
