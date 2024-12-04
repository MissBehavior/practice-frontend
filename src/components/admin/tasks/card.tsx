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

type ProjectCardProps = {
    task: Task
    onViewCard: (task: Task) => void
}

export const ProjectCard = ({ task, onViewCard }: ProjectCardProps) => {
    const navigate = useNavigate()
    const api = useAxios()

    const socket = useContext(SocketContext)
    const { _id, title, assignee, createdAt, tags } = task

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

    const dueDateOptions = useMemo(() => {
        if (!createdAt) return null

        const date = dayjs(createdAt)

        return {
            color: getDateColor({ date: createdAt }),
            text: date.format('MMM D'),
        }
    }, [createdAt])
    return (
        <Card className="p-4">
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
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
                <div className="flex items-center flex-wrap gap-2 mt-2">
                    {dueDateOptions && (
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                        >
                            <AiOutlineClockCircle className="w-4 h-4" />
                            {dueDateOptions.text}
                        </Badge>
                    )}
                    {!!assignee?.length && (
                        <TooltipProvider>
                            <div className="flex items-center flex-wrap gap-2 mt-2">
                                {assignee.map((user) => (
                                    <Tooltip key={user._id}>
                                        <TooltipTrigger asChild>
                                            <CustomAvatar
                                                name={user.name}
                                                src={user.profileImgUrl}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </TooltipProvider>
                    )}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
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
