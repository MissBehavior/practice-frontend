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
    const [open, setOpen] = useState(false)
    const [contentCard, setContentCard] = useState('')
    const [titleCard, setTitleCard] = useState('')
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

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        console.log('HANDLE SUBMIT')
        console.log(image)
        if (!image || !titleCard || !contentCard) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            return
        }

        const formData = new FormData()
        formData.append('image', image)
        formData.append('titleCard', titleCard)
        formData.append('contentCard', contentCard)
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
        <div className="mt-16 mb-12 min-h-64 bg-white dark:bg-background flex justify-center items-center select-none">
            <div className="">
                <Dialog
                    open={open}
                    onOpenChange={() => {
                        setImage(null)
                        setContentCard('')
                        setTitleCard('')
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
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{t('newSolution')}</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form
                            className="grid gap-4 py-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    {t('image')}
                                </Label>
                                <Input
                                    id="file"
                                    className="col-span-3"
                                    type="file"
                                    onChange={handleImage}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    {t('title')}
                                </Label>
                                <Input
                                    id="title"
                                    placeholder={t('solutionTitle')}
                                    className="col-span-3"
                                    onChange={(e) => {
                                        setTitleCard(e.target.value)
                                    }}
                                />
                            </div>
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
                                    onChange={(e) => {
                                        setContentCard(e.target.value)
                                    }}
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
