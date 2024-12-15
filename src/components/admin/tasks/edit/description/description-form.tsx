import React, { useState, useContext } from 'react'
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useTheme } from '@/components/theme-provider'

type Props = {
    initialValues: {
        description?: string
    }
    cancelForm: () => void
    taskId: string
}

export const DescriptionForm: React.FC<Props> = ({
    initialValues,
    cancelForm,
    taskId,
}) => {
    const { theme } = useTheme()
    const [description, setDescription] = useState<string>(
        initialValues.description || ''
    )
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await axios.put(`http://localhost:3000/tasks/${taskId}`, {
                description,
            })
            toast({
                variant: 'success',
                title: 'Success',
                description: 'Description updated successfully!',
            })
            cancelForm()
        } catch (error) {
            console.error('Error updating description:', error)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update description.',
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="w-full">
                <MDEditor
                    value={description}
                    onChange={(value) => setDescription(value || '')}
                    height={250}
                    data-color-mode={theme === 'dark' ? 'dark' : 'light'}
                    className="w-full"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={cancelForm}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </div>
    )
}
