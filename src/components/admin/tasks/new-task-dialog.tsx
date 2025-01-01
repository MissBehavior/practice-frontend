import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Task, TaskToSend, UserObjectPopulated } from '@/types'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { useAuth, useAxios } from '@/services/auth-service'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'

interface NewTaskDialogProps {
    stageTitle: string
    onClose: () => void
    onCreate: (newTaskData: Partial<TaskToSend>) => Promise<void>
}
export const NewTaskDialog: React.FC<NewTaskDialogProps> = ({
    stageTitle,
    onClose,
    onCreate,
}) => {
    const { user, userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [tags, setTags] = useState('')

    const [assignee, setAssignee] = useState<UserObjectPopulated[]>([])
    const [allUsers, setAllUsers] = useState<UserObjectPopulated[]>([])
    const [assigneeQuery, setAssigneeQuery] = useState('')
    const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [errorUsers, setErrorUsers] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadingUsers(true)
            try {
                const response = await api.get('http://localhost:3000/user/', {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                })
                console.log('response NEW TASK', response)
                setAllUsers(response.data)
            } catch (error) {
                console.error('Error fetching users:', error)
                setErrorUsers('Failed to load users')
            } finally {
                setLoadingUsers(false)
            }
        }

        fetchUsers()
    }, [])

    const handleAssigneeSelect = (user: UserObjectPopulated) => {
        if (!assignee.find((assignee) => assignee._id === user._id)) {
            setAssignee((prev) => [...prev, user])
        }
        setAssigneeQuery('')
        setIsAssigneeDropdownOpen(false)
    }

    const removeAssignee = (userId: string) => {
        setAssignee((prev) =>
            prev.filter((assignee) => assignee._id !== userId)
        )
    }

    const filteredUsers = allUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(assigneeQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(assigneeQuery.toLowerCase())
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const parsedTags = tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)

        const selectedAssigneeIds = assignee.map((user) => user._id)

        const newTaskData: Partial<TaskToSend> = {
            title,
            description,
            dueDate,
            tags: parsedTags,
            assignee: selectedAssigneeIds,
            stage: stageTitle,
            createdBy: user!.id,
        }

        await onCreate(newTaskData)
        onClose()
    }
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {i18n.language === 'en'
                            ? 'Create a new task in '
                            : 'Sukurti naują užduotį '}
                        {t(stageTitle)}
                    </DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                >
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">{t('title')}</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <Label htmlFor="description">{t('description')}</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {/* Due Date */}
                    <div>
                        <Label htmlFor="dueDate">{t('dueDate')}</Label>
                        <Input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    {/* Tags */}
                    <div>
                        <Label htmlFor="tags">
                            {t('tags')} ({t('comma_separated')})
                        </Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. bug, frontend, urgent"
                        />
                    </div>
                    {/* Assignees */}
                    <div className="border-t pt-4">
                        <Label>{t('assignees')}</Label>
                        {assignee.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {assignee.map((user) => (
                                    <span
                                        key={user._id}
                                        className="flex items-center gap-1 bg-slate-300 dark:bg-black rounded px-2 py-1 text-sm"
                                    >
                                        {user.name} ({user.email})
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() =>
                                                removeAssignee(user._id)
                                            }
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="relative">
                            <Input
                                placeholder="Search and select assignees..."
                                value={assigneeQuery}
                                onChange={(e) =>
                                    setAssigneeQuery(e.target.value)
                                }
                                onFocus={() => setIsAssigneeDropdownOpen(true)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setIsAssigneeDropdownOpen(false),
                                        150
                                    )
                                } // Delay to allow click
                            />

                            {isAssigneeDropdownOpen && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-50 rounded shadow-lg mt-1 max-h-60 overflow-auto">
                                    <Command shouldFilter={false}>
                                        <CommandList>
                                            {filteredUsers.length > 0 ? (
                                                <CommandGroup heading="Users">
                                                    {filteredUsers.map(
                                                        (user) => (
                                                            <CommandItem
                                                                key={user._id}
                                                                onSelect={() =>
                                                                    handleAssigneeSelect(
                                                                        user
                                                                    )
                                                                }
                                                            >
                                                                {user.name} (
                                                                {user.email})
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            ) : (
                                                <CommandEmpty>
                                                    {t('no_users_found')}
                                                </CommandEmpty>
                                            )}
                                        </CommandList>
                                    </Command>
                                </div>
                            )}
                        </div>
                        {errorUsers && (
                            <p className="text-red-500 text-sm">{errorUsers}</p>
                        )}
                    </div>
                    {/* Actions */}
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>
                            {t('cancel')}
                        </Button>
                        <Button type="submit">{t('create_task')}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
