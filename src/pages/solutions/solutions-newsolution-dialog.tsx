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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdAddCircleOutline } from 'react-icons/io'
import DotLoader from 'react-spinners/DotLoader'

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
    const [titleCard, setTitleCard] = useState('')
    const [titleCardLT, setTitleCardLT] = useState('')
    const [contentMain, setContentMain] = useState('')
    const [contentMainLT, setContentMainLT] = useState('')
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

        // Validate required fields
        if (
            !image ||
            !titleCard ||
            !titleCardLT ||
            !contentCard ||
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

    return (
        <div className="min-h-48 flex justify-center items-center select-none">
            <div className="">
                <Dialog
                    open={open}
                    onOpenChange={() => {
                        setImage(null)
                        setContentMainImg(null)
                        setContentCard('')
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
                    <DialogContent className="sm:max-w-[600px]">
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
                                    {t('title')}
                                </Label>
                                <Input
                                    id="title"
                                    placeholder={t('solutionTitle')}
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
                                    {t('description')}
                                </Label>
                                <Input
                                    id="description"
                                    placeholder={t('solutionDescription')}
                                    className="col-span-3"
                                    value={contentCard}
                                    onChange={(e) => {
                                        setContentCard(e.target.value)
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
                                    {t('contentMain')}
                                </Label>
                                <textarea
                                    id="contentMain"
                                    placeholder={t('solutionContentMain')}
                                    className="col-span-3 p-2 border rounded"
                                    value={contentMain}
                                    onChange={(e) => {
                                        setContentMain(e.target.value)
                                    }}
                                    required
                                    rows={4}
                                ></textarea>
                            </div>
                            {/* Content Main LT */}
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label
                                    htmlFor="contentMainLT"
                                    className="text-right mt-2"
                                >
                                    {t('contentMainLT')}
                                </Label>
                                <textarea
                                    id="contentMainLT"
                                    placeholder={t('solutionContentMainLT')}
                                    className="col-span-3 p-2 border rounded"
                                    value={contentMainLT}
                                    onChange={(e) => {
                                        setContentMainLT(e.target.value)
                                    }}
                                    required
                                    rows={4}
                                ></textarea>
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
