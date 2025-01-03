import React, { useEffect } from 'react'
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
import { MdEdit } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
import MDEditor from '@uiw/react-md-editor'

interface SolutionsEditDialogProps {
    fetchData: () => void
    _id: string
    cardImgUrl: string
    titleCard: string
    titleCardLT: string
    contentCard: string
    contentCardLT: string
    contentMain: string
    contentMainLT: string
}

function SolutionsEditDialog({
    _id,
    cardImgUrl,
    titleCard,
    titleCardLT,
    contentCard,
    contentCardLT,
    contentMain,
    contentMainLT,
    fetchData,
}: SolutionsEditDialogProps) {
    const { userToken } = useAuth()
    const api = useAxios()
    const [open, setOpen] = React.useState(false)
    const [image, setImage] = React.useState<File | null>(null)

    const [preview, setPreview] = React.useState<string>(cardImgUrl)
    const [contentCardEdit, setContentCardEdit] = React.useState(contentCard)
    const [contentCardLTEdit, setContentCardLTEdit] =
        React.useState(contentCardLT)
    const [titleCardEdit, setTitleCardEdit] = React.useState(titleCard)
    const [titleCardLTEdit, setTitleCardLTEdit] = React.useState(titleCardLT)
    const [contentMainEdit, setContentMainEdit] = React.useState(contentMain)
    const [contentMainLTEdit, setContentMainLTEdit] =
        React.useState(contentMainLT)
    const { t } = useTranslation()

    const handleSubmit = async (e: React.FormEvent) => {
        const formData = new FormData()
        if (image) {
            formData.append('image', image)
        } else {
            formData.append('cardImgUrl', cardImgUrl)
        }
        formData.append('titleCard', titleCardEdit)
        formData.append('titleCardLT', titleCardLTEdit)
        formData.append('contentCard', contentCardEdit)
        formData.append('contentCardLT', contentCardLTEdit)
        formData.append('contentMain', contentMainEdit)
        formData.append('contentMainLT', contentMainLTEdit)

        try {
            const response = await api.patch(`/solutions/${_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            toast({
                variant: 'success',
                title: t('success'),
                description: t('changesSaved'),
            })
        } catch (error) {
            console.error('Error Updating:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('errorUpdating'),
            })
            return
        }

        setOpen(false)
        fetchData()
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        } else {
            setImage(null)
            setPreview(cardImgUrl)
        }
    }

    useEffect(() => {
        setTitleCardEdit(titleCard)
        setTitleCardLTEdit(titleCardLT)
        setContentCardEdit(contentCard)
        setContentCardLTEdit(contentCardLT)
        setContentMainEdit(contentMain)
        setContentMainLTEdit(contentMainLT)
    }, [titleCard, titleCardLT, contentCard, contentMain, contentMainLT])
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
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-slate-500 hover:bg-orange-300 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer">
                        <MdEdit className="relative top-0 right-0 w-[40px] p-1 h-[40px] rounded-md shadow-xl transition-all transform duration-150 hover:scale-105 cursor-pointer" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>{t('editSolution')}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                        {/* Image Upload Section */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                {t('image')}
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={handleImage}
                                    accept="image/*"
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-2 rounded-md w-full h-32 object-contain"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Content Main Image Upload Section */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="contentMainImg"
                                className="text-right"
                            >
                                {t('contentMainImg')}
                            </Label>
                            {/* <div className="col-span-3">
                                <Input
                                    id="contentMainImg"
                                    type="file"
                                    onChange={handleContentMainImage}
                                    accept="image/*"
                                />
                                {contentMainImg ? (
                                    <img
                                        src={URL.createObjectURL(
                                            contentMainImg
                                        )}
                                        alt="Content Main Preview"
                                        className="mt-2 rounded-md w-full h-32 object-contain"
                                    />
                                ) : (
                                    contentMainImgUrl && (
                                        <img
                                            src={contentMainImgUrl}
                                            alt="Content Main Existing"
                                            className="mt-2 rounded-md w-full h-32 object-contain"
                                        />
                                    )
                                )}
                            </div> */}
                        </div>

                        {/* Title Card */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="titleCard" className="text-right">
                                {t('title')}
                            </Label>
                            <Input
                                id="titleCard"
                                placeholder={titleCard}
                                className="col-span-3"
                                value={titleCardEdit}
                                onChange={(e) =>
                                    setTitleCardEdit(e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Title Card LT */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="titleCardLT" className="text-right">
                                {t('titleLT')}
                            </Label>
                            <Input
                                id="titleCardLT"
                                placeholder={titleCardLT}
                                className="col-span-3"
                                value={titleCardLTEdit}
                                onChange={(e) =>
                                    setTitleCardLTEdit(e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Content Card */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contentCard" className="text-right">
                                {t('contentCard')}
                            </Label>
                            <Input
                                id="contentCard"
                                placeholder={contentCard}
                                className="col-span-3"
                                value={contentCardEdit}
                                onChange={(e) =>
                                    setContentCardEdit(e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Content Card LT */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="contentCardLT"
                                className="text-right"
                            >
                                {t('contentCardLT')}
                            </Label>
                            <Input
                                id="contentCardLT"
                                placeholder={contentCardLT}
                                className="col-span-3"
                                value={contentCardLTEdit}
                                onChange={(e) =>
                                    setContentCardLTEdit(e.target.value)
                                }
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
                            <div className="col-span-3">
                                <MDEditor
                                    value={contentMainEdit}
                                    onChange={(value) =>
                                        setContentMainEdit(value || '')
                                    }
                                    height={150}
                                    data-color-mode="light"
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
                                    value={contentMainLTEdit}
                                    onChange={(value) =>
                                        setContentMainLTEdit(value || '')
                                    }
                                    height={150}
                                    data-color-mode="light"
                                />
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                            {t('submit')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SolutionsEditDialog
