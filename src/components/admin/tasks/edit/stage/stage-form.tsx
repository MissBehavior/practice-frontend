import React, { useState, useEffect, useContext, useRef } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { Task } from '@/types'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
type Props = {
    isLoading?: boolean
    task: Task
    taskId: string
}

export const StageForm = ({ isLoading, task, taskId }: Props) => {
    const [stages, setStages] = useState<{ id: string; title: string }[]>([])
    const [selectedStage, setSelectedStage] = useState<string>(task.stage || '')
    const selectRef = useRef<HTMLButtonElement | null>(null) // Reference to the Select
    const [open, setOpen] = useState(false)
    const stagesArr = {
        data: [
            { id: '1', title: 'Backlog' },
            { id: '2', title: 'In Progress' },
            { id: '3', title: 'DONE' },
            { id: '4', title: 'Unassigned' },
        ],
    }
    useEffect(() => {
        setStages(stagesArr.data)
        return () => {
            console.log('Unmounting StageForm')
            setOpen(false)
            setSelectedStage('')
            if (selectRef.current) {
                selectRef.current.blur()
            }
        }
    }, [])

    const handleStageChange = async (stage: string) => {
        setSelectedStage(stage)
        try {
            await axios.put(`http://localhost:3000/tasks/${taskId}`, { stage })
        } catch (error) {
            console.error('Error updating task:', error)
        }
    }

    if (isLoading) {
        return <Skeleton className="h-8 w-full mb-2" />
    }

    return (
        <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center">
                <AiOutlineFlag className="mr-2" />

                <Select
                    open={open}
                    onOpenChange={() => {
                        setOpen(!open)
                    }}
                    value={selectedStage}
                    onValueChange={handleStageChange}
                >
                    <SelectTrigger className="w-[180px]" ref={selectRef}>
                        <SelectValue placeholder="No Stage" />
                    </SelectTrigger>
                    <SelectContent>
                        {stages.map((stage) => (
                            <SelectItem key={stage.id} value={stage.title}>
                                {stage.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
