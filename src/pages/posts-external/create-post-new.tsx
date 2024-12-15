import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/services/auth-service'
import { Category } from '@/types'
import { t } from 'i18next'

interface CreatePostNewProps {
    onPostCreated?: () => void
}
export default function CreatePostNew({ onPostCreated }: CreatePostNewProps) {
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [titleLT, setTitleLT] = useState('')
    const [content, setContent] = useState('')
    const [contentLT, setContentLT] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    // Error states for validation
    const [errors, setErrors] = useState<{
        title?: string
        titleLT?: string
        content?: string
        contentLT?: string
        image?: string
        categories?: string
    }>({})

    const { user, userToken } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    let blurTimeout: ReturnType<typeof setTimeout> | null = null

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>(
                    'http://localhost:3000/categories'
                )
                setCategories(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        fetchCategories()
    }, [])

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(query.trim().toLowerCase())
    )

    // Check for exact match
    const exactMatch = categories.some(
        (cat) => cat.name.toLowerCase() === query.trim().toLowerCase()
    )

    const handleCategorySelect = (categoryName: string) => {
        if (!selectedCategories.includes(categoryName)) {
            setSelectedCategories((prev) => [...prev, categoryName])
        }
        setQuery('')
        setIsDropdownOpen(false)
    }

    const removeCategory = (categoryName: string) => {
        setSelectedCategories((prev) => prev.filter((c) => c !== categoryName))
    }

    const handleCreateCategory = async (categoryName: string) => {
        try {
            const response = await axios.post<Category>(
                'http://localhost:3000/categories',
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${userToken?.accessToken}`,
                    },
                }
            )
            const newCategory = response.data
            setCategories((prev) => [...prev, newCategory])
            handleCategorySelect(newCategory.name)
        } catch (error) {
            console.error('Error creating category:', error)
        }
    }

    const validateFields = () => {
        const newErrors: {
            title?: string
            titleLT?: string
            content?: string
            contentLT?: string
            image?: string
            categories?: string
        } = {}

        if (!title.trim()) newErrors.title = 'Title is required'
        if (!titleLT.trim()) newErrors.titleLT = 'TitleLT is required'
        if (!content.trim()) newErrors.content = 'Content is required'
        if (!contentLT.trim()) newErrors.contentLT = 'ContentLT is required'
        if (!image) newErrors.image = 'Image is required'
        if (selectedCategories.length === 0)
            newErrors.categories = 'At least one category is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user || !user.id) {
            console.error('No user logged in or missing userId')
            return
        }

        if (!validateFields()) {
            return
        }

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('title', title)
            formData.append('titleLT', titleLT)
            formData.append('content', content)
            formData.append('contentLT', contentLT)
            formData.append('userId', user.id)
            selectedCategories.forEach((cat) =>
                formData.append('categories', cat)
            )
            if (image) {
                formData.append('image', image)
            }

            const response = await axios.post(
                'http://localhost:3000/posts',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken?.accessToken}`,
                    },
                }
            )

            console.log('Post created successfully:', response.data)
            onPostCreated?.()
            resetDialogState()
        } catch (error) {
            console.error('Error creating post:', error)
        } finally {
            setLoading(false)
        }
    }

    const resetDialogState = () => {
        setOpen(false)
        setTitle('')
        setTitleLT('')
        setContent('')
        setContentLT('')
        setImage(null)
        setSelectedCategories([])
        setQuery('')
        setLoading(false)
        setErrors({})
    }

    const handleInputFocus = () => {
        if (blurTimeout) clearTimeout(blurTimeout)
        setIsDropdownOpen(true)
    }

    const handleInputBlur = () => {
        // Delay closing so we can click on items
        blurTimeout = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 150)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && query.trim().length > 0 && !exactMatch) {
            e.preventDefault()
            handleCreateCategory(query.trim())
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    resetDialogState()
                } else {
                    setTitle('')
                    setTitleLT('')
                    setContent('')
                    setContentLT('')
                    setSelectedCategories([])
                    setQuery('')
                }
                setOpen(isOpen)
            }}
        >
            <DialogTrigger asChild>
                <Button variant="default">{t('createNewPost')}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="titleLT">TitleLT</Label>
                        <Input
                            id="titleLT"
                            type="text"
                            value={titleLT}
                            onChange={(e) => setTitleLT(e.target.value)}
                        />
                        {errors.titleLT && (
                            <p className="text-red-500 text-sm">
                                {errors.titleLT}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm">
                                {errors.content}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="contentLT">ContentLT</Label>
                        <Textarea
                            id="contentLT"
                            rows={5}
                            value={contentLT}
                            onChange={(e) => setContentLT(e.target.value)}
                        />
                        {errors.contentLT && (
                            <p className="text-red-500 text-sm">
                                {errors.contentLT}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files
                                if (files && files.length > 0) {
                                    setImage(files[0])
                                } else {
                                    setImage(null)
                                }
                            }}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Categories */}
                    <div>
                        <Label>Categories</Label>
                        {selectedCategories.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {selectedCategories.map((cat) => (
                                    <span
                                        key={cat}
                                        className="flex items-center gap-1 bg-gray-200 rounded px-2 py-1 text-sm"
                                    >
                                        {cat}
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => removeCategory(cat)}
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="relative">
                            <Input
                                ref={inputRef}
                                placeholder="Search or create category..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                onKeyDown={handleKeyDown}
                            />

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-50 rounded shadow-lg mt-1">
                                    <Command shouldFilter={false}>
                                        <CommandInput
                                            style={{ display: 'none' }}
                                        />
                                        <CommandList>
                                            {query.trim().length > 0 &&
                                                !exactMatch && (
                                                    <CommandGroup heading="Create new category">
                                                        <CommandItem
                                                            onSelect={() =>
                                                                handleCreateCategory(
                                                                    query.trim()
                                                                )
                                                            }
                                                        >
                                                            Create "
                                                            {query.trim()}"
                                                        </CommandItem>
                                                    </CommandGroup>
                                                )}

                                            {filteredCategories.length > 0 && (
                                                <CommandGroup heading="Categories">
                                                    {filteredCategories.map(
                                                        (cat) => (
                                                            <CommandItem
                                                                key={cat._id}
                                                                onSelect={() =>
                                                                    handleCategorySelect(
                                                                        cat.name
                                                                    )
                                                                }
                                                            >
                                                                {cat.name}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            )}

                                            {filteredCategories.length === 0 &&
                                                query.trim() === '' &&
                                                categories.length > 0 && (
                                                    <CommandEmpty>
                                                        No matching categories
                                                    </CommandEmpty>
                                                )}

                                            {categories.length === 0 &&
                                                query.trim() === '' && (
                                                    <CommandEmpty>
                                                        No categories found
                                                    </CommandEmpty>
                                                )}
                                        </CommandList>
                                    </Command>
                                </div>
                            )}
                        </div>

                        {errors.categories && (
                            <p className="text-red-500 text-sm">
                                {errors.categories}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Post'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
