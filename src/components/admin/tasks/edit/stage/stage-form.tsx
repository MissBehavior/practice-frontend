// stage-form.tsx
import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { Task } from '@/types'
import axios from 'axios'
import { SocketContext } from '@/SocketContext'
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
    const socket = useContext(SocketContext)
    const [stages, setStages] = useState<{ id: string; title: string }[]>([])
    const [selectedStage, setSelectedStage] = useState<string>(task.stage || '')
    const stagesArr = {
        data: [
            { id: '1', title: 'Backlog' },
            { id: '2', title: 'In Progress' },
            { id: '3', title: 'DONE' },
        ],
    }
    useEffect(() => {
        // const fetchStages = async () => {
        //   try {
        //     const response = await axios.get('http://localhost:3000/stages');
        //     const stageOptions = response.data.map((stage: any) => ({
        //       label: stage.title,
        //       value: stage.title,
        //     }));
        //     setStages(stageOptions);
        //   } catch (error) {
        //     console.error('Error fetching stages:', error);
        //   }
        // };
        // fetchStages();
        setStages(stagesArr.data)
    }, [])

    const handleStageChange = async (value: string) => {
        setSelectedStage(value)
        task.stage = value
        try {
            await axios.put(`http://localhost:3000/tasks/${task._id}`, task)
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

                <Select value={selectedStage} onValueChange={handleStageChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
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
