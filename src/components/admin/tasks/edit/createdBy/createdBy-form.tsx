import React, { useState, useEffect } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { Task } from '@/types'
import axios from 'axios'
import Select from 'react-select'
import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'
import { CustomAvatar } from '../../custom-avatar'

type Props = {
    isLoading?: boolean
    task: Task
    taskId: string
}

export const CreatedByForm = ({ isLoading, task, taskId }: Props) => {
    console.log('task', task)
    useEffect(() => {}, [])

    if (isLoading) {
        return <Skeleton className="h-8 w-full mb-2 rounded" />
    }

    return (
        <div className="px-4 flex align-middle justify-center items-center gap-8 shadow-sm">
            <CustomAvatar
                name={task.createdBy.name}
                src={task.createdBy.profileImgUrl}
                size="xsmall"
                className="h-2 w-2"
            />
            <div className="flex flex-col">
                <div>{task.createdBy.name}</div>
                <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    {task.createdBy.email}
                </span>
            </div>
        </div>
    )
}
