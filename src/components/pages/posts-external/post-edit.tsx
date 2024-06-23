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
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { PostData } from '@/types'
import MyEditor from '@/components/editor'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/components/theme-provider'
import DotLoader from 'react-spinners/DotLoader'
import { toast } from '@/components/ui/use-toast'
interface PostEditDialogProps {
    fetchData: (currentPage: number) => void
    item: PostData
    currentPage: number
}

function PostEdit({ fetchData, currentPage, item }: PostEditDialogProps) {
    const { userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [titlePost, setTitlePost] = useState<string>('')
    const [valueEn, setValueEn] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { theme } = useTheme()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        console.log('HANDLE SUBMIT in EDIT')
        if (!valueEn || !titlePost) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('fillAllFields'),
            })
            return
        }
        const formData = new FormData()
        if (image) {
            formData.append('image', image)
        }
        formData.append('title', titlePost)
        formData.append('content', valueEn)
        formData.append('userId', item.userId)
        formData.append('userName', item.userName)
        try {
            const response = await api.patch('/post/' + item._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
        } catch (error) {
            console.error('Error Updating :', error)
        }
        setOpen(false)
        setLoading(false)
        fetchData(currentPage)
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
        setTitlePost(item.title)
        setValueEn(item.content)
        setImage(null)
    }, [])
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-slate-500 hover:bg-orange-300 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer">
                        <MdEdit className="relative top-0 right-0 w-[40px] p-1 h-[40px] rounded-md  shadow-xl transition-all transform duration-150 hover:scale-105 cursor-pointer" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>{t('editPost')} </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                {t('image')}
                            </Label>
                            <Input
                                id="file"
                                className="col-span-3 dark:text-white dark:file:text-white"
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
                                placeholder={item.title}
                                className="col-span-3"
                                onChange={(e) => {
                                    setTitlePost(e.target.value)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Label className="text-left">
                                {t('description')}{' '}
                            </Label>
                            <MyEditor
                                valueEn={valueEn}
                                setValueEn={setValueEn}
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
    )
}

export default PostEdit
