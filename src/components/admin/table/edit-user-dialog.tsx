import React, { useState } from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { UserAdminData } from '@/types'

interface EditUserDialogProps {
    isOpen: boolean
    onClose: () => void
    userData: UserAdminData | null
    onSubmit: (updatedData: Partial<UserAdminData>) => Promise<void>
}

export function EditUserDialog({
    isOpen,
    onClose,
    userData,
    onSubmit,
}: EditUserDialogProps) {
    const [name, setName] = useState(userData?.name || '')
    const [email, setEmail] = useState(userData?.email || '')
    const [telefon, setTelefon] = useState(userData?.telefon || '')
    const [isAdmin, setIsAdmin] = useState(userData?.isAdmin || false)
    const [isEmployee, setIsEmployee] = useState(userData?.isEmployee || false)

    React.useEffect(() => {
        // Whenever userData changes (opening the dialog), reset the form fields.
        if (userData) {
            setName(userData.name)
            setEmail(userData.email)
            setTelefon(userData.telefon)
            setIsAdmin(userData.isAdmin)
            setIsEmployee(userData.isEmployee)
        }
    }, [userData])

    const handleSubmit = async () => {
        await onSubmit({ name, email, telefon, isAdmin, isEmployee })
    }

    if (!isOpen || !userData) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Update user details and save changes
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="telefon">Phone</Label>
                        <Input
                            id="telefon"
                            value={telefon}
                            onChange={(e) => setTelefon(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isAdmin">Admin</Label>
                        <Switch
                            checked={isAdmin}
                            onCheckedChange={setIsAdmin}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isEmployee">Employee</Label>
                        <Switch
                            checked={isEmployee}
                            onCheckedChange={setIsEmployee}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
