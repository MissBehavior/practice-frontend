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
import { useAuth } from '@/services/auth-service'
import axios from 'axios'
import React, { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

interface PostNewProps {
    fetchData: (page: number) => void
    currentPage: number
}
function PostNew({ fetchData, currentPage }: PostNewProps) {
    const { user, userToken } = useAuth()
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

        if (!image) {
            alert('Please select an image to upload.')
            return
        }

        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', titlePost)
        formData.append('content', valueEn)
        formData.append('userId', user.id)
        formData.append('userName', user.name)
        try {
            const response = await axios.post(
                'http://localhost:3000/post/',
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
        }
        setOpen(false)
        fetchData(currentPage)
    }
    return (
        <div className="mt-16 mb-12 min-h-72 bg-gray-100 flex justify-center items-center select-none">
            <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="mt-4">
                            Add new new Post
                            <h1 className="text-2xl font-bold text-gray-700 flex center justify-center">
                                <IoMdAddCircleOutline />
                            </h1>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>New post</DialogTitle>
                            <DialogDescription>
                                Add image, title and description
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            className="grid gap-4 py-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    Image
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
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Post title"
                                    className="col-span-3"
                                    onChange={(e) => {
                                        setTitlePost(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-1 items-center gap-4">
                                <Label className="text-left">Description</Label>
                                <MyEditor
                                    valueEn={valueEn}
                                    setValueEn={setValueEn}
                                />
                            </div>
                        </form>
                        <DialogFooter>
                            <Button onClick={handleSubmit} type="submit">
                                Submit
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default PostNew
