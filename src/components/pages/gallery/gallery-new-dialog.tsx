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
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useDropzone } from 'react-dropzone'
import DotLoader from 'react-spinners/DotLoader'
import { useTheme } from '@/components/theme-provider'
import { MdOutlineFileUpload } from 'react-icons/md'

interface GalleryNewDialogProps {
    fetchData: () => void
}
function GalleryNewDialog({ fetchData }: GalleryNewDialogProps) {
    const { userToken } = useAuth()
    const { t } = useTranslation()
    const api = useAxios()
    const [cardImgUrl, setCardImgUrl] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [galleryImages, setGalleryImages] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const { theme } = useTheme()

    const onDropMain = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setCardImgUrl(acceptedFiles[0])
        }
    }, [])
    const onDropAdditional = useCallback(
        (acceptedFiles: File[]) => {
            setGalleryImages([...galleryImages, ...acceptedFiles])
        },
        [galleryImages]
    )
    const handleMainImgChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            setCardImgUrl(event.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        console.log('SUBMIT CALLED AYY')
        e.preventDefault()
        if (!title || !cardImgUrl || !galleryImages) {
            alert('Please fill all fields and select images')
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('cardImgUrl', cardImgUrl)
        Array.from(galleryImages).forEach((file) => {
            formData.append('galleryImages', file)
        })

        try {
            const response = await api.post('/gallery', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
            // Handle success (e.g., show success message, redirect, etc.)
        } catch (error) {
            console.error('Error uploading gallery', error)
            // Handle error (e.g., show error message)
        }
        setOpen(false)
        setLoading(false)
        fetchData()
    }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     console.log('HANDLE SUBMIT')
    //     console.log(image)
    //     if (!image) {
    //         alert('Please select an image to upload.')
    //         return
    //     }

    //     const formData = new FormData()
    //     formData.append('image', image)
    //     formData.append('title', title)
    //     try {
    //         const response = await api.post('/gallery/', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `Bearer ${userToken!.accessToken}`,
    //             },
    //         })
    //         console.log(response.data)
    //     } catch (error) {
    //         console.error('Error uploading image:', error)
    //     }
    //     setOpen(false)
    //     fetchData()
    // }
    const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
        useDropzone({
            onDrop: onDropMain,
            accept: {
                'image/*': ['.jpeg', '.png'],
            },
            maxFiles: 1,
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
    })

    return (
        <div className="mt-16 mb-12 min-h-64 bg-white dark:bg-background flex justify-center items-center select-none">
            <div className="">
                <Dialog
                    open={open}
                    onOpenChange={() => {
                        setTitle('')
                        setGalleryImages([])
                        setCardImgUrl(null)
                        setOpen(!open)
                    }}
                >
                    <DialogTrigger asChild>
                        <div className="p-6 bg-white dark:bg-slate-400 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
                            {t('addNewGallery')}
                            <h1 className="text-2xl font-bold text-gray-700 flex center justify-center">
                                <IoMdAddCircleOutline />
                            </h1>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{t('newGallery')}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    {t('title')}
                                </Label>
                                <Input
                                    id="title"
                                    placeholder={t('galleryTitle') + '...'}
                                    className="col-span-3"
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                />
                            </div>
                            <p>
                                {t('galleryMainImage')} ({t('max')}
                                <strong> 1 </strong>
                                {t('image')})
                            </p>
                            <div
                                {...getMainRootProps()}
                                style={{
                                    border: '2px dashed gray',
                                    padding: '20px',
                                    margin: '10px 0',
                                }}
                            >
                                <input {...getMainInputProps()} />
                                {cardImgUrl ? (
                                    <img
                                        src={URL.createObjectURL(cardImgUrl)}
                                        alt="Main Preview"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                    />
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

                            <p>
                                {t('galleryAdditionalImages')} ({t('max')}
                                <strong> 20 </strong>
                                {t('images')})
                            </p>
                            <div
                                {...getAdditionalRootProps()}
                                style={{
                                    border: '2px dashed gray',
                                    padding: '20px',
                                    margin: '10px 0',
                                }}
                                className="flex flex-row flex-wrap justify-center items-center gap-4"
                            >
                                <input {...getAdditionalInputProps()} />
                                {galleryImages.length > 0 ? (
                                    galleryImages.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={`Additional Preview ${index}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                margin: '5px',
                                            }}
                                        />
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
                        </form>
                        <DialogFooter>
                            {loading && (
                                <DotLoader
                                    color={
                                        theme === 'dark'
                                            ? '#ffffff'
                                            : 'rgb(51 65 85)'
                                    }
                                />
                            )}
                            {!loading && (
                                <Button type="submit" onClick={handleSubmit}>
                                    {t('submit')}
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default GalleryNewDialog
