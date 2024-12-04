// import React, { useEffect, useRef, useState } from 'react'
// import { useAuth } from '@/services/auth-service'
// import axios from 'axios'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import io from 'socket.io-client'

// export declare type UniqueIdentifier = string | number
// export interface Column {
//     id: UniqueIdentifier
//     title: string
// }

// export interface Task {
//     _id: string
//     title: string
//     description: string
//     stage: string
//     assignee: string
//     createdAt: string
//     createdBy: string
//     tags: string[]
// }

// function Kanban() {
//     const { user, userToken } = useAuth()
//     const [tasks, setTasks] = useState<Task[]>([])
//     const [loading, setLoading] = useState<boolean>(true)
//     const socketRef = useRef<null | ReturnType<typeof io>>(null)

//     const fetchData = async () => {
//         setLoading(true)
//         try {
//             const response = await axios.get('http://localhost:3000/tasks')
//             setLoading(false)
//             setTasks(response.data)
//             console.log(response.data)
//         } catch (error) {
//             console.error('Error fetching data:', error)
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         console.log('UseEffect')
//         socketRef.current = io('http://localhost:3000', {
//             transports: ['websocket'],
//             upgrade: false,
//             reconnection: true,
//             reconnectionDelay: 1000,
//             reconnectionDelayMax: 5000,
//             reconnectionAttempts: 3,
//         })

//         const socket = socketRef.current
//         const handleConnect = () => {
//             console.log('connected!')
//             socket.emit('greet', { message: 'Hello Mr.Server!' })
//         }

//         const handleRespond = (data: string) => {
//             console.log(data)
//         }

//         const handleDisconnect = () => {
//             console.log('Disconnected from server')
//         }

//         const handleTaskCreated = (newTask: Task) => {
//             console.log('taskCreated:', newTask)
//             setTasks((prevTasks) => [...prevTasks, newTask])
//         }

//         const handleTaskUpdated = (updatedTask: Task) => {
//             console.log('taskUpdated:', updatedTask)
//             setTasks((prevTasks) =>
//                 prevTasks.map((task) =>
//                     task._id === updatedTask._id ? updatedTask : task
//                 )
//             )
//         }

//         const handleTaskDeleted = (deletedTaskId: string) => {
//             console.log('taskDeleted:', deletedTaskId)
//             setTasks((prevTasks) =>
//                 prevTasks.filter((task) => task._id !== deletedTaskId)
//             )
//         }
//         socket.on('connect', handleConnect)
//         socket.on('respond', handleRespond)
//         socket.on('disconnect', handleDisconnect)
//         socket.on('taskCreated', handleTaskCreated)
//         socket.on('taskUpdated', handleTaskUpdated)
//         socket.on('taskDeleted', handleTaskDeleted)
//         fetchData()
//         return () => {
//             console.log('Cleaning up')
//             socket.off('connect', handleConnect)
//             socket.off('respond', handleRespond)
//             socket.off('disconnect', handleDisconnect)
//             socket.off('taskCreated', handleTaskCreated)
//             socket.off('taskUpdated', handleTaskUpdated)
//             socket.off('taskDeleted', handleTaskDeleted)
//             socket.disconnect()
//         }
//     }, [])

//     const stages = ['TODO', 'IN_PROGRESS', 'DONE']

//     const tasksByStage = stages.reduce((acc, stage) => {
//         acc[stage] = tasks.filter((task) => task.stage === stage)
//         return acc
//     }, {} as { [key: string]: Task[] })

//     const onDragEnd = (result: any) => {
//         const { source, destination, draggableId } = result
//         if (!destination) return
//         if (
//             source.droppableId === destination.droppableId &&
//             source.index === destination.index
//         )
//             return
//         const movedTask = tasks.find((task) => task._id === draggableId)
//         if (!movedTask) return
//         const updatedTask = { ...movedTask, stage: destination.droppableId }
//         setTasks((prevTasks) =>
//             prevTasks.map((task) =>
//                 task._id === draggableId ? updatedTask : task
//             )
//         )
//         axios.put(`http://localhost:3000/tasks/${draggableId}`, {
//             updatedTask,
//         })
//     }

//     return (
//         <div className="flex overflow-x-auto h-screen bg-slate-600 p-4">
//             <DragDropContext onDragEnd={onDragEnd}>
//                 {stages.map((stage) => (
//                     <Droppable droppableId={stage} key={stage}>
//                         {(provided, snapshot) => (
//                             <div
//                                 className="flex-shrink-0 w-80 bg-slate-500 rounded-md p-4 mr-4"
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                             >
//                                 <h2 className="text-xl font-semibold text-center mb-4">
//                                     {stage.replace('_', ' ')}
//                                 </h2>
//                                 {tasksByStage[stage]?.map((task, index) => (
//                                     <Draggable
//                                         draggableId={task._id}
//                                         index={index}
//                                         key={task._id}
//                                     >
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 className={`bg-slate-800 rounded-md p-4 mb-4 shadow ${
//                                                     snapshot.isDragging
//                                                         ? 'bg-blue-100'
//                                                         : ''
//                                                 }`}
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                             >
//                                                 <h3 className="text-lg font-medium">
//                                                     {task.title}
//                                                 </h3>
//                                                 <p className="text-sm text-gray-600 mt-2">
//                                                     {task.description}
//                                                 </p>
//                                                 <h1>Stage:{task.stage}</h1>
//                                                 <h3>Title:{task.title}</h3>
//                                                 <p>Desc:{task.description}</p>
//                                                 <p>ID:{task._id}</p>
//                                                 <p>Assignee:{task.assignee}</p>
//                                                 <p>
//                                                     CreatedAt:{task.createdAt}
//                                                 </p>
//                                                 <p>
//                                                     createdBy:{task.createdBy}
//                                                 </p>
//                                                 <p>tags:{task.tags}</p>
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                 ))}
//             </DragDropContext>
//         </div>
//     )
// }

// export default Kanban
