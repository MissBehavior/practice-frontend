import React, { useState, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { Task } from '@/types'
import { SocketContext } from '@/SocketContext'
import axios from 'axios'

type Props = {
    initialValues: {
        dueDate?: Task['dueDate']
    }
    cancelForm: () => void
    taskId: string
}
export const DueDateForm = ({ initialValues, cancelForm, taskId }: Props) => {
    const socket = useContext(SocketContext)
    const formattedDueDate = initialValues.dueDate
        ? format(new Date(initialValues.dueDate), "yyyy-MM-dd'T'HH:mm")
        : ''
    const [dueDate, setDueDate] = useState(formattedDueDate)

    const handleSave = async () => {
        try {
            const isoDueDate = dueDate ? new Date(dueDate).toISOString() : null
            await axios.put(`http://localhost:3000/tasks/${taskId}`, {
                dueDate: isoDueDate,
            })
        } catch (error) {
            console.error('Error updating due date:', error)
        }
        cancelForm()
    }

    return (
        <div className="flex items-center justify-between">
            <Input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
            />
            <div className="flex space-x-2">
                <Button variant="secondary" onClick={cancelForm}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}
