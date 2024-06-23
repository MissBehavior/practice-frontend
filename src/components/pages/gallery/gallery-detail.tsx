import { Skeleton } from '@/components/ui/skeleton'
import { GalleryData } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '@/components/ui/button'

function GalleryDetail() {
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<GalleryData>()
    const [isFullscreen, setIsFullscreen] = useState(false)

    const openFullscreen = () => {
        setIsFullscreen(true)
    }

    const closeFullscreen = () => {
        setIsFullscreen(false)
    }
    console.log(params)
    const fetchSolutionDetail = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                'http://localhost:3000/gallery/' + params.id
            )
            console.log('response:', response)
            console.log('-----------------')
            setData(response.data)
            setLoading(false)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // setTimeout(() => {
        fetchSolutionDetail()
        // }, 1000)
    }, [])
    if (loading) {
        return (
            <section className="flex flex-col flex-wrap mx-auto justify-center align-middle text-center mr-auto ml-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex w-full px-4 py-6 md:w-1/2 lg:w-1/3 justify-center"
                    >
                        <div className="space-y-3">
                            <Skeleton className="h-36 w-full" />
                            <Skeleton className="h-8 w-1/2 flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto" />
                            <Skeleton className="h-32 w-[450px]" />
                            <Skeleton className="h-16 w-[350px] mb-20" />
                        </div>
                    </div>
                ))}
            </section>
        )
    }

    return (
        <>
            <div>
                <div
                    onClick={openFullscreen}
                    style={{ cursor: 'pointer' }}
                    className="flex flex-row gap-4 mx-auto my-14"
                >
                    {data?.galleryImages &&
                        data?.galleryImages.length > 0 &&
                        data?.galleryImages.map((item) => (
                            <div>
                                <img src={item.imgUrl} />
                            </div>
                        ))}
                </div>

                {isFullscreen &&
                    data?.galleryImages &&
                    data.galleryImages.length > 0 && (
                        <div className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex justify-center items-center">
                            <Button
                                onClick={closeFullscreen}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    zIndex: 10000,
                                    backgroundColor: 'white',
                                    border: 'none',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Close
                            </Button>
                            <Carousel
                                showThumbs={true}
                                infiniteLoop
                                useKeyboardArrows
                                autoPlay
                                swipeable
                                emulateTouch
                                className="select-none max-w-[1748px] max-h-[100vh] w-full h-full"
                            >
                                {data?.galleryImages.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image.imgUrl}
                                            alt={`Slide ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    )}
            </div>
        </>
    )
}

export default GalleryDetail
