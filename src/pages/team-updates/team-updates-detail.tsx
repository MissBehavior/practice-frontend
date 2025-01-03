import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth, useAxios } from '@/services/auth-service'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { PostDataInternal } from '@/types'
import { toast } from '@/components/ui/use-toast'
import {
    FaCalendarAlt,
    FaHeart,
    FaRegHeart,
    FaUser,
    FaCommentDots,
    FaTrash,
    FaArrowLeft,
} from 'react-icons/fa'
import Breadcrumb from '@/components/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import MDEditor from '@uiw/react-md-editor' // Import MDEditor
import EditDialogOverflowEffect from './edit-details-overflow'

export default function TeamUpdatesDetail() {
    const { id } = useParams<{ id: string }>()
    const { user, userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()

    const [post, setPost] = useState<PostDataInternal | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [comment, setComment] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editTitle, setEditTitle] = useState<string>('')
    const [editContent, setEditContent] = useState<string>('')
    const [editImage, setEditImage] = useState<File | null>(null)
    const [editImagePreview, setEditImagePreview] = useState<string>('')

    const fetchPostDetails = async () => {
        setLoading(true)
        try {
            const response = await api.get<PostDataInternal>(
                `http://localhost:3000/postinternal/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            setPost(response.data)
            setEditTitle(response.data.title)
            setEditContent(response.data.content)
            setEditImagePreview(response.data.postPicture)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching post details:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
            setLoading(false)
        }
    }

    const handlePostComment = async (parentCommentId?: string) => {
        if (!post) return

        try {
            const commentData = {
                userId: user.id,
                text: comment,
            }

            const response = await axios.post(
                `http://localhost:3000/postinternal/comment/${post._id}`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            const updatedPost = response.data
            setPost((prevPost) =>
                prevPost
                    ? { ...prevPost, comments: updatedPost.comments }
                    : null
            )

            setComment('')
        } catch (error) {
            console.error('Error posting comment:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        if (!post) return

        try {
            const response = await axios.delete(
                `http://localhost:3000/postinternal/comment/${post._id}/${commentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            const updatedPost = response.data
            setPost((prevPost) =>
                prevPost
                    ? { ...prevPost, comments: updatedPost.comments }
                    : null
            )
        } catch (error) {
            console.error('Error deleting comment:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
        }
    }

    const handleLikeComment = async (commentId: string) => {
        if (!post) return

        try {
            const response = await axios.patch(
                `http://localhost:3000/postinternal/${post._id}/comment/${commentId}/like/`,
                { userId: user.id },
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            console.log('HANDLE LIKE COMMENT')
            console.log(response.data)
            const updatedPost = response.data
            setPost((prevPost) =>
                prevPost
                    ? { ...prevPost, comments: updatedPost.comments }
                    : null
            )
        } catch (error) {
            console.error('Error liking comment:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
        }
    }

    const likeUnlikeHandle = async () => {
        if (!post) return

        try {
            const response = await axios.patch(
                `http://localhost:3000/postinternal/like/${post._id}`,
                { userId: user.id },
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )

            console.log('HANDLE LIKE UNLIKE POST', response.data)
            const updatedPost = response.data
            setPost(updatedPost)
        } catch (error) {
            console.error('Error liking/unliking post:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('error'),
            })
        }
    }

    const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEditImage(file)
            setEditImagePreview(URL.createObjectURL(file))
        } else {
            setEditImage(null)
            setEditImagePreview(post?.postPicture || '')
        }
    }

    const handleEditSubmit = async () => {
        if (!post) return

        try {
            const formData = new FormData()
            formData.append('title', editTitle)
            formData.append('content', editContent)

            if (editImage) {
                formData.append('image', editImage)
            } else {
            }

            const response = await api.patch(
                `http://localhost:3000/postinternal/${post._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )

            setPost(response.data)
            toast({
                variant: 'success',
                title: t('success'),
                description: t('changesSaved'),
            })
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating post:', error)
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('errorUpdating'),
            })
        }
    }
    useEffect(() => {
        fetchPostDetails()
    }, [id])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb
                    title={t('team_updates')}
                    parent={t('team_updates')}
                />
                <Skeleton className="h-[500px] w-full mb-6" />
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        )
    }

    if (!post) {
        return <div>{t('post_not_found')}</div>
    }

    return (
        <div className="dark:bg-[#101010] bg-slate-300 min-h-screen">
            <Breadcrumb title={t('team_updates')} parent={t('team_updates')} />

            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/team-updates"
                    className="flex items-center text-gray-300 hover:text-gray-500 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    {t('back_to_teamupdates')}
                </Link>
                <div className="max-w-4xl mx-auto dark:bg-[#191919] bg-slate-400 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="relative">
                        <img
                            src={post.postPicture}
                            alt={post.title}
                            className="w-full h-[500px] object-cover filter brightness-75"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {post.title}
                            </h1>
                            {/* Edit Button */}
                            {(user.isAdmin ||
                                (user.isEmployee &&
                                    post.userName === user.name)) && (
                                <Dialog
                                    open={isEditing}
                                    onOpenChange={setIsEditing}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="mt-2 text-white bg-blue-500 hover:bg-blue-600"
                                        >
                                            {t('edit')}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[800px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {t('editPost')}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {' '}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            {/* Image Upload Section */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label
                                                    htmlFor="editImage"
                                                    className="text-right"
                                                >
                                                    {t('image')}
                                                </label>
                                                <div className="col-span-3">
                                                    <input
                                                        id="editImage"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleEditImage
                                                        }
                                                        className="block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-blue-50 file:text-blue-700
                                                        hover:file:bg-blue-100"
                                                    />
                                                    {editImagePreview && (
                                                        <img
                                                            src={
                                                                editImagePreview
                                                            }
                                                            alt="Edit Preview"
                                                            className="mt-2 rounded-md w-full h-64 object-contain"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Title Input */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label
                                                    htmlFor="editTitle"
                                                    className="text-right"
                                                >
                                                    {t('title')}
                                                </label>
                                                <input
                                                    id="editTitle"
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={(e) =>
                                                        setEditTitle(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="col-span-3 p-2 border rounded-lg dark:bg-[#242e3d] bg-slate-300 dark:text-white text-black"
                                                    required
                                                />
                                            </div>
                                            {/* Content Editor */}
                                            <div className="grid grid-cols-4 items-start gap-4">
                                                <label
                                                    htmlFor="editContent"
                                                    className="text-right mt-2"
                                                >
                                                    {t('content')}
                                                </label>
                                                <div className="col-span-3">
                                                    <MDEditor
                                                        value={editContent}
                                                        onChange={(value) =>
                                                            setEditContent(
                                                                value || ''
                                                            )
                                                        }
                                                        height={300}
                                                        preview="edit"
                                                        data-color-mode="dark"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleEditSubmit}>
                                                {t('save_changes')}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                {t('cancel')}
                                            </Button>
                                        </DialogFooter>
                                        {/* useEffect to manage body overflow */}
                                        <EditDialogOverflowEffect
                                            open={isEditing}
                                        />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center text-gray-600 text-sm mb-6">
                            <FaCalendarAlt className="mr-2 text-blue-400" />
                            <span className="dark:text-blue-200 text-gray-700">
                                {new Date(post.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}
                            </span>
                            <span className="mx-2">•</span>
                            <FaUser className="mr-2 text-blue-400" />
                            <span className="dark:text-blue-200 text-gray-700">
                                {t('by')} {post.userId.name}
                            </span>
                        </div>

                        <div className="prose max-w-none mb-8 text-white">
                            <ReactMarkdown>{post.content}</ReactMarkdown>{' '}
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                            <Button
                                variant={
                                    post.likes.some(
                                        (like) => like._id === user.id
                                    )
                                        ? 'destructive'
                                        : 'outline'
                                }
                                onClick={likeUnlikeHandle}
                                className="flex items-center"
                            >
                                {post.likes.some(
                                    (like) => like._id === user.id
                                ) ? (
                                    <FaHeart className="mr-2 text-white" />
                                ) : (
                                    <FaRegHeart className="mr-2" />
                                )}
                                {post.likes.length} {t('likes')}
                            </Button>

                            <div className="flex items-center text-gray-400">
                                <FaCommentDots className="mr-2" />
                                {post.comments.length} {t('comments')}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold mb-6 text-gray-500">
                                {t('comments')}
                            </h3>

                            {post.comments.length === 0 && (
                                <div className="text-center py-8 bg-gray-100 rounded-lg">
                                    <p className="text-gray-500 text-lg">
                                        {t('no_comments_yet')}😥
                                    </p>
                                </div>
                            )}

                            <div className="space-y-1">
                                {post.comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className="dark:bg-[#101010] bg-slate-300 py-2 px-3 rounded-xl relative"
                                    >
                                        {comment.user._id === user.id && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteComment(
                                                        comment._id
                                                    )
                                                }
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                        <div className="flex items-center mb-3">
                                            <div className="flex-grow">
                                                <span className="font-semibold text-white-800 mr-2">
                                                    {comment.user.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {format(
                                                        new Date(
                                                            comment.createdAt
                                                        ),
                                                        'MMM dd, yyyy'
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-white mb-3">
                                            {comment.text}
                                        </p>
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleLikeComment(
                                                        comment._id
                                                    )
                                                }
                                                className="flex items-center"
                                            >
                                                {comment.likes.some(
                                                    (like) =>
                                                        like._id === user.id
                                                ) ? (
                                                    <FaHeart className="mr-2 text-red-500" />
                                                ) : (
                                                    <FaRegHeart className="mr-2" />
                                                )}
                                                {comment.likes.length}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handlePostComment()
                                }}
                                className="mt-8 rounded-xl"
                            >
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={t('write_a_comment')}
                                    className="w-full p-4 dark:border-[#242e3d]  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#101010] bg-slate-300"
                                    rows={4}
                                />
                                <div className="flex justify-end mt-4">
                                    <Button
                                        type="submit"
                                        variant={'outline'}
                                        disabled={!comment.trim()}
                                        className="px-6 py-2"
                                    >
                                        {t('post_comment')}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
