import MyEditor from '@/components/editor'
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
import React, { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'

interface PostNewProps {
    fetchData: (page: number) => void
    currentPage: number
}
function PostNew({ fetchData, currentPage }: PostNewProps) {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()
    const [image, setImage] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [valueEn, setValueEn] = useState<string>('')
    const [titlePost, setTitlePost] = useState<string>('')
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
        e.preventDefault()
        console.log('HANDLE SUBMIT')
        console.log(image)
        console.log('--------------')
        console.log(valueEn)
        console.log(titlePost)
        console.log(user.id)
        console.log(user.name)

        if (!image || !valueEn || !titlePost) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            return
        }
        const cleanHTML = DOMPurify.sanitize(valueEn)
        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', titlePost)
        formData.append('content', cleanHTML)
        formData.append('userId', user.id)
        formData.append('userName', user.name)
        try {
            const response = await api.post('/post/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
        } catch (error) {
            console.error('Error uploading image:', error)
        }
        setOpen(false)
        toast({
            variant: 'success',
            title: t('success'),
            description: t('changesSaved'),
        })
        fetchData(currentPage)
    }
    return (
        <div className="mt-16 mb-12 min-h-32 dark:bg-background flex justify-center items-center select-none">
            <div className="">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="p-6 bg-white dark:bg-slate-400 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
                            {t('addNewPost')}
                            <h1 className="text-2xl font-bold text-gray-700 flex center justify-center">
                                <IoMdAddCircleOutline />
                            </h1>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] mt-16 mb-12 min-h-32">
                        <DialogHeader>
                            <DialogTitle> {t('newPost')}</DialogTitle>
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
                                    className="col-span-3 dark:text-white dark:file:text-white "
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
                                    placeholder={t('postTitle')}
                                    className="col-span-3"
                                    onChange={(e) => {
                                        setTitlePost(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-1 items-center gap-4">
                                <Label className="text-left">
                                    {t('description')}
                                </Label>
                                <MyEditor
                                    valueEn={valueEn}
                                    setValueEn={setValueEn}
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
        </div>
    )
}

export default PostNew
