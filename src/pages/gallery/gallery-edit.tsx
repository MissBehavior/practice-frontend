import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth, useAxios } from '@/services/auth-service'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import DotLoader from 'react-spinners/DotLoader'
import { useTheme } from '@/components/theme-provider'
import { MdEdit, MdOutlineFileUpload, MdClose } from 'react-icons/md'
import { toast } from '@/components/ui/use-toast'
import { galleryImages } from '@/types'

interface GalleryEditDialogProps {
    gallery: {
        _id: string
        title: string
        cardImgUrl: string
        galleryImages: galleryImages[]
    }
    fetchData: () => void
}

function GalleryEditDialog({ gallery, fetchData }: GalleryEditDialogProps) {
    const { userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()
    const { theme } = useTheme()

    const [cardImgUrl, setCardImgUrl] = useState<File | string>(
        gallery.cardImgUrl
    )
    const [title, setTitle] = useState(gallery.title)
    const [galleryImagesState, setGalleryImagesState] = useState<
        (File | galleryImages)[]
    >(gallery.galleryImages)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onDropMain = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setCardImgUrl(acceptedFiles[0])
        }
    }, [])

    const onDropAdditional = useCallback((acceptedFiles: File[]) => {
        setGalleryImagesState((prev) => [...prev, ...acceptedFiles])
    }, [])

    const handleRemoveImage = (index: number) => {
        setGalleryImagesState((prev) => prev.filter((_, i) => i !== index))
    }

    const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
        useDropzone({
            onDrop: onDropMain,
            accept: {
                'image/*': ['.jpeg', '.png'],
            },
            maxFiles: 1,
            onDropRejected: () => {
                toast({
                    variant: 'destructive',
                    title: t('error'),
                    description: t('onlyOneImageAllowed'),
                })
            },
        })

    const {
        getRootProps: getAdditionalRootProps,
        getInputProps: getAdditionalInputProps,
    } = useDropzone({
        onDrop: onDropAdditional,
        accept: {
            'image/*': ['.jpeg', '.png'],
        },
        multiple: true,
        maxFiles: 20,
        onDropRejected: () => {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('max20Images'),
            })
        },
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !cardImgUrl || !galleryImagesState) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            setLoading(false)
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append('title', title)

        if (cardImgUrl instanceof File) {
            formData.append('mainImg', cardImgUrl)
        } else {
            formData.append('existingCardImgUrl', gallery.cardImgUrl)
        }

        galleryImagesState.forEach((image) => {
            if (image instanceof File) {
                formData.append('galleryImages', image)
            } else {
                formData.append('existingGalleryImages', image.imgUrl)
            }
        })

        try {
            const response = await api.patch(
                `/gallery/${gallery._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
        } catch (error) {
            console.error('Error updating gallery', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
            setLoading(false)
            return
        }
        setOpen(false)
        setLoading(false)
        toast({
            variant: 'success',
            title: t('success'),
            description: t('changesSaved'),
        })
        fetchData()
    }

    const handleDialogOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setTitle(gallery.title)
            setCardImgUrl(gallery.cardImgUrl)
            setGalleryImagesState(gallery.galleryImages)
        }
        setOpen(isOpen)
    }

    useEffect(() => {
        if (open) {
            setTitle(gallery.title)
            setCardImgUrl(gallery.cardImgUrl)
            setGalleryImagesState(gallery.galleryImages)
        }
    }, [open, gallery])

    return (
        <div>
            <Dialog open={open} onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-slate-500 hover:bg-orange-300 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer">
                        <MdEdit className="w-[40px] p-1 h-[40px] rounded-md shadow-xl transition-all transform duration-150 hover:scale-105 cursor-pointer" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] xs:max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>{t('editGallery')}</DialogTitle>
                    </DialogHeader>
                    <form className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                {t('title')}
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                placeholder={t('galleryTitle') + '...'}
                                className="col-span-3"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <p>{t('galleryMainImage')} (Max: 1 image)</p>
                        <div
                            {...getMainRootProps()}
                            style={{ border: '2px dashed gray' }}
                            className="flex flex-row flex-wrap justify-center items-center gap-4"
                        >
                            <input {...getMainInputProps()} />
                            {cardImgUrl ? (
                                <div
                                    className="relative group"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                    }}
                                >
                                    <img
                                        src={
                                            cardImgUrl instanceof File
                                                ? URL.createObjectURL(
                                                      cardImgUrl
                                                  )
                                                : cardImgUrl
                                        }
                                        alt="Main Preview"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setCardImgUrl('')
                                        }}
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <MdClose />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center align-middle cursor-pointer">
                                    <MdOutlineFileUpload className="w-12 h-12" />
                                    <p>
                                        <strong>{t('chooseFile')}</strong>{' '}
                                        {t('chooseFilePt2')}
                                    </p>
                                </div>
                            )}
                        </div>
                        <p>{t('galleryAdditionalImages')} (Max: 20 images)</p>
                        <div
                            {...getAdditionalRootProps()}
                            style={{ border: '2px dashed gray' }}
                            className="flex flex-row flex-wrap justify-center items-center gap-4"
                        >
                            <input {...getAdditionalInputProps()} />
                            <div className="flex flex-row flex-wrap align-middle justify-center items-start h-full max-h-[30vh] overflow-y-auto overflow-x-hidden">
                                {galleryImagesState.length > 0 ? (
                                    galleryImagesState.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                            }}
                                        >
                                            <img
                                                src={
                                                    image instanceof File
                                                        ? URL.createObjectURL(
                                                              image
                                                          )
                                                        : image.imgUrl
                                                }
                                                alt={`Gallery Image ${index}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    handleRemoveImage(index)
                                                }}
                                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <MdClose />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col justify-center items-center align-middle cursor-pointer">
                                        <MdOutlineFileUpload className="w-12 h-12" />
                                        <p>
                                            <strong>{t('chooseFile')}</strong>
                                            {t('chooseFilePt2')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        {loading && (
                            <DotLoader
                                color={theme === 'dark' ? '#fff' : '#000'}
                            />
                        )}
                        {!loading && (
                            <Button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }}
                            >
                                {t('submit')}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default GalleryEditDialog
