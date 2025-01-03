import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineFieldTime } from 'react-icons/ai'
import {
    Dialog,
    DialogContent,
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
import { DescriptionHeader } from './description/description-header'
import { DescriptionForm } from './description/description-form'
import AssigneeSelection from './assignee/assigne-selection'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'
import { CreatedByForm } from './createdBy/createdBy-form'
import { useAxios } from '@/services/auth-service'

export const TasksEditPage: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>()
    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const api = useAxios()

    if (!taskId) {
        return <div>Task ID is missing</div>
    }

    const [task, setTask] = useState<Task | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isDialogOpen, setIsDialogOpen] = useState(true)

    const [activeAccordion, setActiveAccordion] = useState<string | undefined>(
        undefined
    )
    const [isEditingDescription, setIsEditingDescription] =
        useState<boolean>(false)

    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(
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

    useEffect(() => {
        return () => {
            setActiveAccordion(undefined)
            setTask(null)
        }
    }, [])

    const closeModal = () => {
        setActiveAccordion(undefined)
        setIsEditingDescription(false)
        setIsDialogOpen(false)
        navigate('/kanban')
    }

    const handleDelete = () => {
        socket.emit('deleteTask', { id: taskId })
        closeModal()
    }

    const handleCancelDescription = () => {
        setIsEditingDescription(false)
    }

    const handleAddDescription = () => {
        setIsEditingDescription(true)
    }

    const handleEditDescription = () => {
        setIsEditingDescription(true)
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
                className="kanban-update-modal max-h-[90vh] overflow-y-auto max-md:max-w-full bg-[#101010] dark:bg-[#191919]"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                </DialogHeader>
                <div className="p-4 border rounded-md">
                    <Label>{t('title')}:</Label>
                    <TitleForm
                        initialValues={{ title: task?.title || '' }}
                        taskId={taskId}
                    />
                </div>
                <div className="p-4 border rounded-md ">
                    <Label>{t('description')}:</Label>
                    {isEditingDescription ? (
                        <DescriptionForm
                            initialValues={{
                                description: task.description,
                            }}
                            cancelForm={handleCancelDescription}
                            taskId={task._id}
                        />
                    ) : (
                        <DescriptionHeader
                            description={task.description}
                            onAdd={handleAddDescription}
                            onEdit={handleEditDescription}
                        />
                    )}
                </div>
                <div className="p-4 border rounded-md ">
                    <AssigneeSelection task={task} taskId={taskId} />
                </div>
                <div className="p-4 border rounded-md ">
                    <Label>{t('stage')}:</Label>
                    <StageForm task={task} taskId={taskId} />
                </div>
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
                                    <span>{t('dueDate')}</span>
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
                                cancelForm={() => setActiveAccordion(undefined)}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="flex flex-row justify-between p-4 border rounded-md ">
                    <Label>{t('createdBy')}:</Label>
                    <CreatedByForm task={task} taskId={taskId} />
                </div>

                <div className="mt-4">
                    <Button variant="destructive" onClick={handleDelete}>
                        {t('delete_card')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
