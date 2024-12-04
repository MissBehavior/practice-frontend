// index.tsx
import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios from 'axios'
import { DragEndEvent } from '@dnd-kit/core'
import { Outlet, useNavigate } from 'react-router-dom'
import { SocketContext } from '@/SocketContext'
import { KanbanBoard, KanbanBoardContainer } from './board'
import { KanbanColumn, KanbanColumnSkeleton } from './column'
import { KanbanItem } from './item'
import { ProjectCardMemo, ProjectCardSkeleton } from './card'
import { KanbanAddCardButton } from './add-card-button'
import { Task } from '@/types'
import { TasksEditPage } from './edit/task-edit-page'

export interface Stage {
    id: string
    title: string
}

export const TasksListPage = ({ children }: React.PropsWithChildren) => {
    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const [tasks, setTasks] = useState<Task[]>([])
    const [stages, setStages] = useState<Stage[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const handleViewCard = (task: Task) => {
        setSelectedTask(task)
    }
    useEffect(() => {
        // Fetch initial data
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const [tasksResponse] = await Promise.all([
                    axios.get('http://localhost:3000/tasks'),
                    // axios.get('http://localhost:3000/stages'),
                ])

                setTasks(tasksResponse.data)
                const stages = {
                    data: [
                        { id: '1', title: 'Backlog' },
                        { id: '2', title: 'In Progress' },
                        { id: '3', title: 'DONE' },
                    ],
                }
                setStages(stages.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
            setIsLoading(false)
        }

        fetchData()

        // WebSocket event handlers
        const handleTaskCreated = (newTask: Task) => {
            setTasks((prevTasks) => [...prevTasks, newTask])
        }

        const handleTaskUpdated = (updatedTask: Task) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            )
        }

        const handleTaskDeleted = (deletedTaskId: string) => {
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== deletedTaskId)
            )
        }

        socket.on('taskCreated', handleTaskCreated)
        socket.on('taskUpdated', handleTaskUpdated)
        socket.on('taskDeleted', handleTaskDeleted)

        return () => {
            socket.off('taskCreated', handleTaskCreated)
            socket.off('taskUpdated', handleTaskUpdated)
            socket.off('taskDeleted', handleTaskDeleted)
        }
    }, [socket])

    // Group tasks by stage
    const tasksByStage = useMemo(() => {
        if (!tasks || !stages) {
            return {}
        }

        const groupedTasks: { [key: string]: Task[] } = {}

        stages.forEach((stage) => {
            groupedTasks[stage.title] = tasks.filter(
                (task) => task.stage === stage.title
            )
        })

        // Tasks without a stage
        groupedTasks['Unassigned'] = tasks.filter(
            (task) =>
                !task.stage ||
                !stages.some((stage) => stage.title === task.stage)
        )

        return groupedTasks
    }, [tasks, stages])

    const handleUpdateRequest = async (task: Task) => {
        try {
            await axios.put(`http://localhost:3000/tasks/${task._id}`, task)
        } catch (error) {
            console.error('Error updating task:', error)
        }
    }
    const handleOnDragEnd = (event: DragEndEvent) => {
        const destinationStage = event.over?.id as string | null
        const taskId = event.active.id as string
        const task = tasks.find((t) => t._id === taskId)

        if (!task || task.stage === destinationStage) {
            return
        }
        const updatedTask: Task = { ...task, stage: destinationStage || '' }
        handleUpdateRequest(updatedTask)
        // Optimistically update the task locally
        // setTasks((prevTasks) =>
        //     prevTasks.map((t) => (t._id === taskId ? updatedTask : t))
        // )
        // socket.emit('taskUpdated', updatedTask)
    }

    const handleAddCard = (stageTitle: string) => {
        const path =
            stageTitle === 'Unassigned'
                ? '/tasks/new'
                : `/tasks/new?stage=${stageTitle}`

        navigate(path)
    }
    if (isLoading) return <PageSkeleton />
    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard onDragEnd={handleOnDragEnd}>
                    {Object.entries(tasksByStage).map(
                        ([stageTitle, stageTasks]) => (
                            <KanbanColumn
                                key={stageTitle}
                                id={stageTitle}
                                title={stageTitle}
                                count={stageTasks.length}
                                onAddClick={() => handleAddCard(stageTitle)}
                            >
                                {isLoading && <ProjectCardSkeleton />}
                                {!isLoading &&
                                    stageTasks.map((task) => (
                                        <KanbanItem
                                            key={task._id}
                                            id={task._id}
                                            data={task}
                                        >
                                            <ProjectCardMemo
                                                task={task}
                                                onViewCard={handleViewCard}
                                            />
                                        </KanbanItem>
                                    ))}
                                {!stageTasks.length && (
                                    <KanbanAddCardButton
                                        onClick={() =>
                                            handleAddCard(stageTitle)
                                        }
                                    />
                                )}
                            </KanbanColumn>
                        )
                    )}
                </KanbanBoard>
            </KanbanBoardContainer>
            <Outlet />
            {/* {selectedTask && (
                <TasksEditPage
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
            {children} */}
        </>
    )
}

const PageSkeleton = () => {
    const columnCount = 6
    const itemCount = 4

    return (
        <KanbanBoardContainer>
            {Array.from({ length: columnCount }).map((_, index) => (
                <KanbanColumnSkeleton key={index}>
                    {Array.from({ length: itemCount }).map((_, idx) => (
                        <ProjectCardSkeleton key={idx} />
                    ))}
                </KanbanColumnSkeleton>
            ))}
        </KanbanBoardContainer>
    )
}
