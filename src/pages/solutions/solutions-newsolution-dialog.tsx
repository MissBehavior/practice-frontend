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
import { toast } from '@/components/ui/use-toast'
import { useAuth, useAxios } from '@/services/auth-service'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdAddCircleOutline } from 'react-icons/io'
import DotLoader from 'react-spinners/DotLoader'
import MDEditor from '@uiw/react-md-editor' // Import MDEditor

interface SolutionsAddNewSolutionProps {
    fetchData: () => void
}

function SolutionsAddNewSolution({ fetchData }: SolutionsAddNewSolutionProps) {
    const { userToken } = useAuth()
    const api = useAxios()
    const [image, setImage] = useState<File | null>(null)
    const [contentMainImg, setContentMainImg] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [contentCard, setContentCard] = useState('')
    const [contentCardLT, setContentCardLT] = useState('')
    const [titleCard, setTitleCard] = useState('')
    const [titleCardLT, setTitleCardLT] = useState('')
    const [contentMain, setContentMain] = useState<string | undefined>('')
    const [contentMainLT, setContentMainLT] = useState<string | undefined>('')
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { theme } = useTheme()

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Image selected')
        console.log(e.target.files?.[0])
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
        } else {
            setImage(null)
        }
    }

    const handleContentMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Content Main Image selected')
        console.log(e.target.files?.[0])
        const file = e.target.files?.[0]
        if (file) {
            setContentMainImg(file)
        } else {
            setContentMainImg(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        console.log('HANDLE SUBMIT')
        console.log(image)
        console.log(contentMainImg)

        if (
            !image ||
            !titleCard ||
            !titleCardLT ||
            !contentCard ||
            !contentCardLT ||
            !contentMain ||
            !contentMainLT ||
            !contentMainImg
        ) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('image', image)
        formData.append('titleCard', titleCard)
        formData.append('titleCardLT', titleCardLT)
        formData.append('contentCard', contentCard)
        formData.append('contentCardLT', contentCardLT)
        formData.append('contentMain', contentMain)
        formData.append('contentMainLT', contentMainLT)
        formData.append('contentMainImg', contentMainImg)

        try {
            const response = await api.post(
                '/solutions/api/upload/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            console.log(response.data)
        } catch (error) {
            console.error('Error uploading image:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
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
        fetchData()
    }
    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'auto'
            console.log('Body overflow reset to auto.')
        } else {
            document.body.style.overflow = 'hidden'
            console.log('Body overflow set to hidden.')
        }

        return () => {
            document.body.style.overflow = 'auto'
            console.log('Component unmounted. Body overflow reset to auto.')
        }
    }, [open])
    return (
        <div className="min-h-48 flex justify-center items-center select-none">
            <div className="">
                <Dialog
                    open={open}
                    onOpenChange={() => {
                        setImage(null)
                        setContentMainImg(null)
                        setContentCard('')
                        setContentCardLT('')
                        setTitleCard('')
                        setTitleCardLT('')
                        setContentMain('')
                        setContentMainLT('')
                        setOpen(!open)
                    }}
                >
                    <DialogTrigger asChild>
                        <div className="p-6 bg-white dark:bg-slate-400 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
                            {t('newSolution')}
                            <h1 className="text-2xl font-bold text-gray-700 flex center justify-center">
                                <IoMdAddCircleOutline />
                            </h1>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                            <DialogTitle>{t('newSolution')}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form
                            className="grid gap-4 py-4"
                            onSubmit={handleSubmit}
                        >
                            {/* Image Upload */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    {t('image')}
                                </Label>
                                <Input
                                    id="file"
                                    className="col-span-3"
                                    type="file"
                                    onChange={handleImage}
                                    accept="image/*"
                                />
                            </div>
                            {/* Title Card */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    {t('titleEN')}
                                </Label>
                                <Input
                                    id="title"
                                    placeholder={t('solutionTitleEN')}
                                    className="col-span-3"
                                    value={titleCard}
                                    onChange={(e) => {
                                        setTitleCard(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            {/* Title Card LT */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="titleLT" className="text-right">
                                    {t('titleLT')}
                                </Label>
                                <Input
                                    id="titleLT"
                                    placeholder={t('solutionTitleLT')}
                                    className="col-span-3"
                                    value={titleCardLT}
                                    onChange={(e) => {
                                        setTitleCardLT(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            {/* Content Card */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    {t('descriptionEN')}
                                </Label>
                                <Input
                                    id="description"
                                    placeholder={t('solutionDescriptionEN')}
                                    className="col-span-3"
                                    value={contentCard}
                                    onChange={(e) => {
                                        setContentCard(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            {/* Content Card LT */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="descriptionLT"
                                    className="text-right"
                                >
                                    {t('descriptionLT')}
                                </Label>
                                <Input
                                    id="descriptionLT"
                                    placeholder={t('solutionDescriptionLT')}
                                    className="col-span-3"
                                    value={contentCardLT}
                                    onChange={(e) => {
                                        setContentCardLT(e.target.value)
                                    }}
                                    required
                                />
                            </div>

                            {/* Content Main */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label
                                    htmlFor="contentMain"
                                    className="text-right mt-2"
                                >
                                    {t('contentMainEN')}
                                </Label>
                                <div className="col-span-3">
                                    <MDEditor
                                        value={contentMain}
                                        onChange={(value) =>
                                            setContentMain(value)
                                        }
                                        height={150}
                                        data-color-mode={
                                            theme === 'dark' ? 'dark' : 'light'
                                        }
                                    />
                                </div>
                            </div>
                            {/* Content Main LT */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label
                                    htmlFor="contentMainLT"
                                    className="text-right mt-2"
                                >
                                    {t('contentMainLT')}
                                </Label>
                                <div className="col-span-3">
                                    <MDEditor
                                        value={contentMainLT}
                                        onChange={(value) =>
                                            setContentMainLT(value)
                                        }
                                        height={150}
                                        data-color-mode={
                                            theme === 'dark' ? 'dark' : 'light'
                                        }
                                    />
                                </div>
                            </div>
                            {/* Content Main Image Upload */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="contentMainImg"
                                    className="text-right"
                                >
                                    {t('contentMainImg')}
                                </Label>
                                <Input
                                    id="contentMainImg"
                                    className="col-span-3"
                                    type="file"
                                    onChange={handleContentMainImage}
                                    accept="image/*"
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

export default SolutionsAddNewSolution
