import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Gallery, GalleryProps, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import Breadcrumb from '@/components/breadcrumb'
import { GalleryData, galleryImages } from '@/types'
import { FaArrowLeft } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function GalleryDetail() {
    const { id } = useParams()
    const [gallery, setGallery] = useState<GalleryData>()
    const [images, setImages] = useState<galleryImages[]>([])
    const { t } = useTranslation()
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
    const uiElements: GalleryProps['uiElements'] = [
        {
            name: 'custom-rotate-button',
            ariaLabel: 'Rotate',
            order: 9,
            isButton: true,
            html: {
                isCustomSVG: true,
                inner: '<path d="M13.887 6.078C14.258 6.234 14.5 6.598 14.5 7V8.517C18.332 8.657 21.258 10.055 23.15 12.367 24.519 14.041 25.289 16.13 25.496 18.409A1 1 0 0123.504 18.591C23.327 16.645 22.68 14.952 21.601 13.633 20.156 11.867 17.831 10.653 14.5 10.517V12A1.002 1.002 0 0112.779 12.693L10.304 10.121A1.002 1.002 0 0110.324 8.713L12.8 6.286A1 1 0 0113.887 6.078ZM7.5 16A1.5 1.5 0 006 17.5V24.5A1.5 1.5 0 007.5 26H17.5A1.5 1.5 0 0019 24.5V17.5A1.5 1.5 0 0017.5 16H7.5Z" id="pswp__icn-rotate"/>',
                outlineID: 'pswp__icn-rotate',
            },
            appendTo: 'bar',
            onClick: (e, el, pswpInstance) => {
                if (!pswpInstance.currSlide?.content.element) {
                    return
                }
                const item = pswpInstance.currSlide.content.element
                const prevRotateAngle = Number(item.dataset.rotateAngel) || 0
                const rotateAngle =
                    prevRotateAngle === 270 ? 0 : prevRotateAngle + 90
                // add slide rotation
                item.style.transform = `${item.style.transform.replace(
                    `rotate(-${prevRotateAngle}deg)`,
                    ''
                )} rotate(-${rotateAngle}deg)`
                item.dataset.rotateAngel = String(rotateAngle)
            },
            onInit: (el, pswpInstance) => {
                // remove applied rotation on slide change
                // https://photoswipe.com/events/#slide-content-events
                pswpInstance.on('contentRemove', () => {
                    if (!pswpInstance.currSlide?.content.element) {
                        return
                    }

                    const item = pswpInstance.currSlide.content.element
                    item.style.transform = `${item.style.transform.replace(
                        `rotate(-${item.dataset.rotateAngel}deg)`,
                        ''
                    )}`
                    delete item.dataset.rotateAngel
                })
            },
        },
    ]
    const smallItemStyles: React.CSSProperties = {
        cursor: 'pointer',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%',
    }

    return (
        <div className="min-h-screen bg-slate-300 dark:bg-[#101010]">
            <Breadcrumb title={gallery.title} parent={'Gallery'} />
            <Link
                to="/gallery"
                className="flex items-center text-gray-300 hover:text-gray-500 mb-6"
            >
                <FaArrowLeft className="mr-2" />
                {t('back_to_gallery')}
            </Link>
            <section className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold dark:text-white text-black mb-6 text-center">
                    {gallery.title}
                </h1>
                <Gallery
                    uiElements={uiElements}
                    withCaption={true}
                    withDownloadButton={true}
                    options={{
                        bgOpacity: 0.8,
                        showHideOpacity: true,
                        closeOnVerticalDrag: false,
                        zoom: false,
                        loop: true,
                        maxZoomLevel: 1,
                        spacing: 0.05,
                        preload: [2, 4],
                    }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((image, index) => {
                            const img = new Image()
                            img.src = image.imgUrl
                            return (
                                <Item
                                    key={index}
                                    original={image.imgUrl}
                                    thumbnail={image.imgUrl}
                                    width={img.naturalWidth || 1200}
                                    height={img.naturalHeight || 800}
                                    caption={`${image.imgPath}`}
                                >
                                    {({ ref, open }) => (
                                        <div
                                            ref={ref}
                                            onClick={open}
                                            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                        >
                                            <img
                                                src={image.imgUrl}
                                                alt={`Gallery Image ${
                                                    index + 1
                                                }`}
                                                className="w-full h-64 object-cover rounded-lg dark:bg-[#101010] bg-white transform hover:scale-105 transition-transform duration-300"
                                                style={smallItemStyles}
                                            />
                                        </div>
                                    )}
                                </Item>
                            )
                        })}
                    </div>
                </Gallery>
            </section>
        </div>
    )
}
