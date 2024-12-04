import React, { useState, useEffect, useContext } from 'react'
import {
    AiOutlineAlignLeft,
    AiOutlineFieldTime,
    AiOutlineUsergroupAdd,
} from 'react-icons/ai'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Task } from '@/types'
import { SocketContext } from '@/SocketContext'
import { TitleForm } from './titleform/title-form'
import { StageForm } from './stage/stage-form'
import { DueDateForm } from './duedate/duedate-form'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion'
import { DueDateHeader } from './duedate/duedate-header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const TasksEditPage = () => {
    const { taskId } = useParams<{ taskId: string }>()
    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    if (!taskId) {
        return <div>Task ID is missing</div>
    }
    const [task, setTask] = useState<Task | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [activeAccordion, setActiveAccordion] = useState<string | undefined>(
        undefined
    )

    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `http://localhost:3000/tasks/${taskId}`
                )
                setTask(response.data)
            } catch (error) {
                console.error('Error fetching task:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTask()
        const handleTaskUpdated = (updatedTask: Task) => {
            if (updatedTask._id === taskId) {
                setTask(updatedTask)
            }
        }
        socket.on('taskUpdated', handleTaskUpdated)
        return () => {
            socket.off('taskUpdated', handleTaskUpdated)
        }
    }, [taskId, socket])

    const closeModal = () => {
        navigate('/kanban')
    }

    const handleDelete = () => {
        socket.emit('deleteTask', { id: taskId })
        closeModal()
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!task) {
        return <div>Task not found</div>
    }
    return (
        <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent
                className="kanban-update-modal"
                style={{ width: '586px' }}
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <TitleForm
                        initialValues={{ title: task?.title || '' }}
                        taskId={taskId}
                    />
                    <StageForm task={task} taskId={taskId} />
                    <Accordion
                        type="single"
                        collapsible
                        value={activeAccordion}
                        onValueChange={(value) => setActiveAccordion(value)}
                    >
                        <AccordionItem value="due-date">
                            <AccordionTrigger>
                                <span className="flex items-center justify-between w-full">
                                    <span className="flex items-center">
                                        <AiOutlineFieldTime className="mr-2" />
                                        <span>Due date</span>
                                    </span>
                                    <DueDateHeader dueDate={task?.dueDate} />
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <DueDateForm
                                    initialValues={{
                                        dueDate: task?.dueDate,
                                    }}
                                    taskId={taskId}
                                    cancelForm={() =>
                                        setActiveAccordion(undefined)
                                    }
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="mt-4">
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete card
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
