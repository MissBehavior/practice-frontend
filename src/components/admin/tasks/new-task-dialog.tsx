import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Task, UserObjectPopulated } from '@/types' // Ensure correct path to your types

interface NewTaskDialogProps {
    stageTitle: string
    onClose: () => void
    onCreate: (newTaskData: Partial<Task>) => Promise<void>
}

export const NewTaskDialog: React.FC<NewTaskDialogProps> = ({
    stageTitle,
    onClose,
    onCreate,
}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [tags, setTags] = useState('')

    // For simplicity, we'll ask for a single assignee’s name and email.
    // In production, you'd have a user picker or a more sophisticated UI.
    const [assigneeName, setAssigneeName] = useState('')
    const [assigneeEmail, setAssigneeEmail] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Parse tags
        const parsedTags = tags
            ? tags
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter(Boolean)
            : []

        // If an assignee was provided
        let assignees: UserObjectPopulated[] = []
        if (assigneeName && assigneeEmail) {
            assignees.push({
                _id: '', // This will be assigned by the server. Leave blank or omit.
                name: assigneeName,
                email: assigneeEmail,
                profileImgUrl: '', // If you have a default avatar, you might set that here or leave blank
            })
        }

        const newTaskData: Partial<Task> = {
            title,
            description,
            dueDate, // If your server expects a date, ensure formatting is correct (e.g., ISO string).
            tags: parsedTags,
            assignee: assignees,
            stage: stageTitle,
        }

        await onCreate(newTaskData)
        onClose()
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new task in {stageTitle}</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                >
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. bug, frontend, urgent"
                        />
                    </div>
                    <div className="border-t pt-4">
                        <Label>Assignee</Label>
                        <div className="flex flex-col gap-2 mt-2">
                            <div>
                                <Label htmlFor="assigneeName">Name</Label>
                                <Input
                                    id="assigneeName"
                                    value={assigneeName}
                                    onChange={(e) =>
                                        setAssigneeName(e.target.value)
                                    }
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
