import React, { useState, useContext, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Task } from '@/types'
import { SocketContext } from '@/SocketContext'
import axios from 'axios'

type Props = {
    initialValues: {
        title?: Task['title']
    }
    isLoading?: boolean
    taskId: string
}

export const TitleForm = ({ initialValues, isLoading, taskId }: Props) => {
    const socket = useContext(SocketContext)
    const [title, setTitle] = useState(initialValues.title || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setTitle(initialValues.title || '')
    }, [initialValues.title])

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleTitleBlur = async () => {
        if (!isSubmitting) {
            setIsSubmitting(true)
            try {
                await axios.put(`http://localhost:3000/tasks/${taskId}`, {
                    title,
                })
                setIsSubmitting(false)
            } catch (error) {
                setIsSubmitting(false)
            }
        }
    }
    useEffect(() => {
        const handleTaskUpdated = (updatedTask: Task) => {
            if (updatedTask._id === taskId) {
                setTitle(updatedTask.title)
            }
        }

        socket.on('taskUpdated', handleTaskUpdated)

        return () => {
            socket.off('taskUpdated', handleTaskUpdated)
        }
    }, [socket, taskId])

    if (isLoading) {
        return <Skeleton className="h-6 w-full mb-2" />
    }
    return (
        <div className="w-full">
            <Input
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                disabled={isSubmitting}
                className="w-full bg-[#191919] dark:bg-[#101010] text-white dark:text-white"
            />
        </div>
    )
}
