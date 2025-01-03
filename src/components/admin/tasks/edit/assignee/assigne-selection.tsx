import React, { useEffect, useState } from 'react'
import { useAuth, useAxios } from '@/services/auth-service'
import { Task, TaskToSend, UserObjectPopulated } from '@/types'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import i18n from '@/i18n/config'
import { useTranslation } from 'react-i18next'

type Props = {
    task: Task
    taskId: string
}

const AssigneeSelection: React.FC<Props> = ({ task, taskId }) => {
    const { userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()
    const [allUsers, setAllUsers] = useState<UserObjectPopulated[]>([])
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false)
    const [errorUsers, setErrorUsers] = useState<string | null>(null)

    const initialAssignees: UserObjectPopulated[] = Array.isArray(task.assignee)
        ? task.assignee
        : []
    const [currentAssignees, setCurrentAssignees] =
        useState<UserObjectPopulated[]>(initialAssignees)
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const [assigneeQuery, setAssigneeQuery] = useState<string>('')
    const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] =
        useState<boolean>(false)

    useEffect(() => {
        const updatedAssignees: UserObjectPopulated[] = Array.isArray(
            task.assignee
        )
            ? task.assignee
            : []
        setCurrentAssignees(updatedAssignees)
        setHasChanges(false)
    }, [task.assignee])

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadingUsers(true)
            try {
                const response = await api.get('http://localhost:3000/user/', {
                    headers: {
                        Authorization: `Bearer ${userToken?.accessToken}`,
                    },
                })
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
        if (!currentAssignees.find((assignee) => assignee._id === user._id)) {
            setCurrentAssignees((prev) => [...prev, user])
            setHasChanges(true)
        }
        setAssigneeQuery('')
        setIsAssigneeDropdownOpen(false)
    }

    const removeAssignee = (userId: string) => {
        setCurrentAssignees((prev) =>
            prev.filter((assignee) => assignee._id !== userId)
        )
        setHasChanges(true)
    }

    const filteredUsers = allUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(assigneeQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(assigneeQuery.toLowerCase())
    )

    const handleSave = async () => {
        const selectedAssigneeIds = currentAssignees.map((user) => user._id)
        const updatedTaskData: Partial<TaskToSend> = {
            assignee: selectedAssigneeIds,
        }

        try {
            const response = await api.put(
                `http://localhost:3000/tasks/${taskId}`,
                updatedTaskData
            )
            setHasChanges(false)
        } catch (error) {
            console.error('Error updating assignees:', error)
        }
    }

    const handleCancel = () => {
        setCurrentAssignees(initialAssignees)
        setHasChanges(false)
    }

    return (
        <div className="">
            <Label>{t('assignees')}</Label>
            {currentAssignees.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                    {currentAssignees.map((user) => (
                        <span
                            key={user._id}
                            className="flex items-center gap-1 dark:bg-black bg-slate-300 rounded px-2 py-1 text-sm hover:filter hover:brightness-125"
                        >
                            {user.name} ({user.email})
                            <button
                                type="button"
                                className="text-red-500"
                                onClick={() => removeAssignee(user._id)}
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="relative">
                <Input
                    placeholder={
                        i18n.language === 'en'
                            ? 'Search and select assignees'
                            : 'Ieškokite ir pasirinkite perėmėjus'
                    }
                    value={assigneeQuery}
                    onChange={(e) => setAssigneeQuery(e.target.value)}
                    onFocus={() => setIsAssigneeDropdownOpen(true)}
                    onBlur={() =>
                        setTimeout(() => setIsAssigneeDropdownOpen(false), 150)
                    }
                />

                {isAssigneeDropdownOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-50 rounded shadow-lg mt-1 max-h-60 overflow-auto">
                        {loadingUsers ? (
                            <div className="p-4">Loading users...</div>
                        ) : errorUsers ? (
                            <div className="p-4 text-red-500">{errorUsers}</div>
                        ) : (
                            <Command shouldFilter={false}>
                                <CommandList>
                                    {filteredUsers.length > 0 ? (
                                        <CommandGroup heading="Users">
                                            {filteredUsers.map((user) => (
                                                <CommandItem
                                                    key={user._id}
                                                    onSelect={() =>
                                                        handleAssigneeSelect(
                                                            user
                                                        )
                                                    }
                                                >
                                                    {user.name} ({user.email})
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    ) : (
                                        <CommandEmpty>
                                            {t('no_users_found')}
                                        </CommandEmpty>
                                    )}
                                </CommandList>
                            </Command>
                        )}
                    </div>
                )}
            </div>
            {errorUsers && <p className="text-red-500 text-sm">{errorUsers}</p>}

            {hasChanges && (
                <div className="mt-2 flex gap-2">
                    <Button
                        onClick={handleSave}
                        className="bg-blue-500 text-white"
                    >
                        {t('save')}
                    </Button>
                    <Button onClick={handleCancel} variant="ghost">
                        {t('cancel')}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default AssigneeSelection
