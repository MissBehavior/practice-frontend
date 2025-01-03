import { useTheme } from '@/components/theme-provider'
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
import { IoMdAddCircleOutline } from 'react-icons/io'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
import DotLoader from 'react-spinners/DotLoader'
import { useDropzone } from 'react-dropzone'
import { MdOutlineFileUpload } from 'react-icons/md'
import MDEditor from '@uiw/react-md-editor' // New import

interface TeamUpdateNewProps {
    fetchData: (page: number, query?: string) => void // Updated to accept query
    currentPage: number
}

function TeamUpdateNew({ fetchData, currentPage }: TeamUpdateNewProps) {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()
    const [image, setImage] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [valueEn, setValueEn] = useState<string>('')
    const [titlePost, setTitlePost] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { theme } = useTheme()

    const onDropMain = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (!image || !valueEn || !titlePost) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            setLoading(false)
            return
        }

        const cleanContent = DOMPurify.sanitize(valueEn)

        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', titlePost)
        formData.append('content', cleanContent)
        formData.append('userId', user.id)
        formData.append('userName', user.name)
        try {
            const response = await api.post('/postinternal/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('errorUploadingImage'),
            })
            console.error('Error uploading image:', error)
            setLoading(false)
            return
        }
        setOpen(false)
        toast({
            variant: 'success',
            title: t('success'),
            description: t('changesSaved'),
        })
        setLoading(false)
        fetchData(currentPage, '')
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
    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'auto'
        } else {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [open])
    return (
        <div className="min-h-32 dark:bg-[#101010] bg-[#F2F2F2] flex justify-center items-center select-none">
            <div className="">
                <Dialog
                    open={open}
                    onOpenChange={() => {
                        setTitlePost('')
                        setValueEn('')
                        setImage(null)
                        setLoading(false)
                        setOpen(!open)
                    }}
                >
                    <DialogTrigger asChild>
                        <div className="p-6 bg-[#FFFFFF] dark:bg-slate-400 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
                            {t('addNewPost')}
                            <h1 className="text-2xl font-bold text-gray-700 flex center justify-center">
                                <IoMdAddCircleOutline />
                            </h1>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] mt-16 mb-12 min-h-48 dark:bg-[#101010] bg-[#ffffff]">
                        <DialogHeader>
                            <DialogTitle> {t('newPost')}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form
                            className="grid gap-4 py-4 max-h-[50vh] overflow-auto"
                            onSubmit={handleSubmit}
                        >
                            {/* Image Upload */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    {t('image')}
                                </Label>
                                <div
                                    {...getMainRootProps()}
                                    style={{
                                        border: '2px dashed gray',
                                    }}
                                    className="col-span-3 flex justify-center items-center align-middle cursor-pointer"
                                >
                                    <input {...getMainInputProps()} />
                                    {image ? (
                                        <img
                                            src={URL.createObjectURL(image)}
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
                                                <strong>
                                                    {t('chooseFile')}
                                                </strong>
                                                {t('chooseFilePt2')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Title Post */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    {t('title')}
                                </Label>
                                <Input
                                    id="title"
                                    placeholder={t('postTitle')}
                                    className="col-span-3"
                                    value={titlePost}
                                    onChange={(e) => {
                                        setTitlePost(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            {/* Markdown Editor */}
                            <div className="grid grid-cols-1 items-center gap-4">
                                <Label className="text-left">
                                    {t('description')}
                                </Label>
                                <MDEditor
                                    value={valueEn}
                                    onChange={(value) =>
                                        setValueEn(value || '')
                                    }
                                    height={200}
                                    preview="edit"
                                    data-color-mode={
                                        theme === 'dark' ? 'dark' : 'light'
                                    }
                                />
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
                                <Button onClick={handleSubmit} type="submit">
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

export default TeamUpdateNew
