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

interface CreateUserDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (newUserData: Partial<UserAdminData>) => Promise<void>
}

export function CreateUserDialog({
    isOpen,
    onClose,
    onSubmit,
}: CreateUserDialogProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telefon, setTelefon] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEmployee, setIsEmployee] = useState(false)
    const { t } = useTranslation()

    const handleSubmit = async () => {
        await onSubmit({ name, email, telefon, isAdmin, isEmployee })
    }

    if (!isOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('create_new_user')}</DialogTitle>
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
                    <Button onClick={handleSubmit}>{t('create')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
