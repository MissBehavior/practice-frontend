import { memo, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AiOutlineClockCircle,
    AiOutlineDelete,
    AiOutlineEye,
    AiOutlineMore,
} from 'react-icons/ai'
import dayjs from 'dayjs'

import { getDateColor } from '@/lib/utils'
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
import { t } from 'i18next'
import { Label } from '@/components/ui/label'

type ProjectCardProps = {
    task: Task
}

export const ProjectCard = ({ task }: ProjectCardProps) => {
    const navigate = useNavigate()
    const api = useAxios()

    const socket = useContext(SocketContext)
    const { _id, title, assignee, createdAt, tags, dueDate } = task

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${_id}`)
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }
    const dropdownItems = useMemo(() => {
        const items = [
            {
                label: 'View card',
                key: '1',
                icon: <AiOutlineEye />,
                onClick: () => {
                    navigate(`/kanban/${task._id}`)
                },
            },
            {
                danger: true,
                label: 'Delete card',
                key: '2',
                icon: <AiOutlineDelete />,
                onClick: () => {
                    handleDelete()
                },
            },
        ]

        return items
    }, [navigate, _id, socket])

    const createDateOptions = useMemo(() => {
        if (!createdAt) return null

        const date = dayjs(createdAt)

        return {
            color: getDateColor({ date: createdAt }),
            text: date.format('MMM D'),
        }
    }, [createdAt])
    const dueDateOptions = useMemo(() => {
        if (!dueDate) return null

        const date = dayjs(dueDate)

        return {
            color: getDateColor({ date: dueDate }),
            text: date.format('MMM D'),
        }
    }, [dueDate])
    return (
        <Card className="p-4 bg-[#191919]">
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AiOutlineMore className="w-5 h-5 rotate-90" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {dropdownItems.map((item) => (
                            <DropdownMenuItem
                                key={item.key}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    item.onClick()
                                }}
                                className={item.danger ? 'text-red-600' : ''}
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardContent>
                <div className="flex items-center flex-wrap gap-2 mt-2 border-t">
                    <div className="w-full flex flex-col">
                        {createDateOptions && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1 mt-2 w-1/2"
                            >
                                <AiOutlineClockCircle className="w-4 h-4" />
                                {t('createdOn')} {createDateOptions.text}
                            </Badge>
                        )}
                        {dueDateOptions && (
                            <Badge
                                variant={dueDateOptions.color}
                                className="flex items-center gap-1 mt-2 w-1/2"
                            >
                                <AiOutlineClockCircle className="w-4 h-4" />
                                {t('duedateAt')} {dueDateOptions.text}
                            </Badge>
                        )}
                    </div>
                    {!!assignee?.length && (
                        <TooltipProvider>
                            <div className="flex items-center flex-wrap gap-2 mt-2 w-full">
                                <Label>{t('assignees')}</Label>
                                {assignee.map((user) => (
                                    <Tooltip key={user._id}>
                                        <TooltipTrigger asChild>
                                            <div className="flex flex-row">
                                                <CustomAvatar
                                                    name={user.name}
                                                    src={user.profileImgUrl}
                                                    size="small"
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user.email}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </TooltipProvider>
                    )}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1  border-t w-full pt-4">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

// Skeleton Component
export const ProjectCardSkeleton = () => {
    return (
        <Card className="p-4">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-8 rounded-full" />
        </Card>
    )
}

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
    return (
        prev.task._id === next.task._id &&
        prev.task.updatedAt === next.task.updatedAt
    )
})
