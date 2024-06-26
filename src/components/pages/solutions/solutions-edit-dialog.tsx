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
import React, { useEffect } from 'react'
import { MdEdit } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
interface SolutionsEditDialogProps {
    fetchData: () => void
    _id: string
    cardImgUrl: string
    titleCard: string
    contentCard: string
}

function SolutionsEditDialog({
    _id,
    cardImgUrl,
    titleCard,
    contentCard,
    fetchData,
}: SolutionsEditDialogProps) {
    const { userToken } = useAuth()
    const api = useAxios()
    const [open, setOpen] = React.useState(false)
    const [image, setImage] = React.useState<File | null>(null)
    const [contentCardEdit, setContentCard] = React.useState('')
    const [titleCardEdit, setTitleCard] = React.useState('')
    const { t } = useTranslation()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('HANDLE SUBMIT in EDIT')
        if (!image) {
            alert('Please select an image to upload.')
            return
        }
        const formData = new FormData()
        formData.append('image', image)
        formData.append('titleCard', titleCardEdit)
        formData.append('contentCard', contentCardEdit)
        try {
            const response = await api.patch('/solutions/' + _id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
        } catch (error) {
            console.error('Error Updating :', error)
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
        console.log('Image selected')
        console.log(e.target.files?.[0])
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
        } else {
            setImage(null)
        }
    }
    useEffect(() => {
        setTitleCard(titleCard)
        setContentCard(contentCard)
    }, [])
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-slate-500 hover:bg-orange-300 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer">
                        <MdEdit className="relative top-0 right-0 w-[40px] p-1 h-[40px] rounded-md shadow-xl transition-all transform duration-150 hover:scale-105 cursor-pointer" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('editSolution')} </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
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
                                placeholder={titleCard}
                                className="col-span-3"
                                onChange={(e) => {
                                    setTitleCard(e.target.value)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                {t('description')}
                            </Label>
                            <Input
                                id="description"
                                placeholder={contentCard}
                                className="col-span-3"
                                onChange={(e) => {
                                    setContentCard(e.target.value)
                                }}
                            />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button onClick={handleSubmit} type="submit">
                            {t('submit')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SolutionsEditDialog
