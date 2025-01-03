import { memo, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AiOutlineCalendar,
    AiOutlineClockCircle,
    AiOutlineDelete,
    AiOutlineEye,
    AiOutlineMore,
} from 'react-icons/ai'
import dayjs from 'dayjs'

import { getDateColor, getDateColorAsHex } from '@/lib/utils'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { Task, User } from '@/types'
import { CustomAvatar } from './custom-avatar'
import { SocketContext } from '@/SocketContext' // Adjust path as necessary
import { useAxios } from '@/services/auth-service'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

type ProjectCardProps = {
    task: Task
}

export const ProjectCard = ({ task }: ProjectCardProps) => {
    const navigate = useNavigate()
    const api = useAxios()
    const { t } = useTranslation()

    const socket = useContext(SocketContext)
    const { _id, title, assignee, createdAt, tags, dueDate } = task

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${_id}`)
            // Optionally, emit a socket event or update state here
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const dropdownItems = useMemo(() => {
        const items = [
            {
                label: t('view_card'),
                key: '1',
                icon: <AiOutlineEye />,
                onClick: () => {
                    navigate(`/kanban/${task._id}`)
                },
            },
            {
                danger: true,
                label: t('delete_card'),
                key: '2',
                icon: <AiOutlineDelete />,
                onClick: () => {
                    handleDelete()
                },
            },
        ]

        return items
    }, [navigate, task._id, handleDelete, t])

    const createDateOptions = useMemo(() => {
        if (!createdAt) return null

        const date = dayjs(createdAt)

        return {
            color: getDateColor({ date: createdAt }),
            text: date.format('MMM D, YYYY'),
        }
    }, [createdAt])

    const dueDateOptions = useMemo(() => {
        if (!dueDate) return null

        const date = dayjs(dueDate)

        return {
            color: getDateColorAsHex(dueDate),
            text: date.format('MMM D, YYYY'),
        }
    }, [dueDate])

    return (
        <Card
            className="p-4 dark:bg-[#1e1e1e] bg-white h-80 hover:shadow-lg transition-shadow duration-300 rounded-lg cursor-pointer flex flex-col justify-between"
            onClick={() => {
                navigate(`/kanban/${task._id}`)
            }}
        >
            <div>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {title}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                                onClick={(e) => e.stopPropagation()}
                                aria-label="Options"
                            >
                                <AiOutlineMore className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                        >
                            {dropdownItems.map((item) => (
                                <DropdownMenuItem
                                    key={item.key}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        item.onClick()
                                    }}
                                    className={`flex items-center px-4 py-2 text-sm ${
                                        item.danger
                                            ? 'text-red-600 hover:bg-red-100 dark:hover:bg-red-700'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <CardContent className="mt-4 flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <AiOutlineCalendar className="w-4 h-4" />
                        <span>
                            {t('created')}: {createDateOptions?.text}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <AiOutlineClockCircle
                            className="w-4 h-4"
                            style={{ color: dueDateOptions?.color }}
                        />
                        <span>
                            {t('dueDate')}:{' '}
                            {dueDateOptions ? (
                                <span className="font-semibold">
                                    {dueDateOptions.text}
                                </span>
                            ) : (
                                <span className="text-red-500">
                                    {t('notSet')}
                                </span>
                            )}
                        </span>
                    </div>
                    {/* Assignees Section */}
                    {/* {!!assignee?.length && (
                        <TooltipProvider>
                            <div className="flex items-center space-x-2">
                                <Label className="text-sm">
                                    {t('assignees')}:
                                </Label>
                                <div className="flex -space-x-2">
                                    {assignee.map((user) => (
                                        <Tooltip key={user._id}>
                                            <TooltipTrigger asChild>
                                                <CustomAvatar
                                                    name={user.name}
                                                    src={user.profileImgUrl}
                                                    size="small"
                                                    className="border-2 border-white dark:border-gray-800"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-sm">
                                                    {user.email}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        </TooltipProvider>
                    )} */}
                    {/* Tags Section */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs rounded-full border-gray-300 dark:border-gray-600"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </div>
            {/* Created By Section */}
            <div className="flex items-center space-x-3 mt-4">
                <Label className="text-sm text-gray-600 dark:text-gray-300">
                    {t('createdBy')}:
                </Label>
                <CustomAvatar
                    name={task.createdBy.name}
                    src={task.createdBy.profileImgUrl}
                    size="xsmall"
                    className="h-4 w-4"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {task.createdBy.name}
                    </span>
                    <span className="text-xs text-blue-500 dark:text-blue-400 hover:underline cursor-pointer">
                        {task.createdBy.email}
                    </span>
                </div>
            </div>
        </Card>
    )
}

// Skeleton Component
export const ProjectCardSkeleton = () => {
    return (
        <Card className="p-4 flex flex-col justify-between h-80 dark:bg-[#1e1e1e] bg-white rounded-lg shadow animate-pulse">
            <div>
                <Skeleton className="h-6 w-48 mb-4 bg-gray-300 dark:bg-gray-700 rounded" />
                <Skeleton className="h-4 w-32 mb-2 bg-gray-200 dark:bg-gray-600 rounded" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="mt-4">
                    <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-600 rounded" />
                    <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
                <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
        </Card>
    )
}

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
    return (
        prev.task._id === next.task._id &&
        prev.task.updatedAt === next.task.updatedAt
    )
})
