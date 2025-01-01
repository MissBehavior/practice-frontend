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
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

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
                    <DialogTitle>{t('edit_user')}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">{t('name')}</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="telefon">{t('phone')}</Label>
                        <Input
                            id="telefon"
                            value={telefon}
                            onChange={(e) => setTelefon(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isAdmin">{t('admin')}</Label>
                        <Switch
                            checked={isAdmin}
                            onCheckedChange={setIsAdmin}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="isEmployee">{t('employee')}</Label>
                        <Switch
                            checked={isEmployee}
                            onCheckedChange={setIsEmployee}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleSubmit}>{t('save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
