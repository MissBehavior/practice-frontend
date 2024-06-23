import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useAuth, useAxios } from '@/services/auth-service'
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
interface TeamUpdateDeleteProps {
    fetchData: (currentPage: number) => void
    currentPage: number
    index: string
}
function TeamUpdateDelete({
    fetchData,
    currentPage,
    index,
}: TeamUpdateDeleteProps) {
    const { userToken } = useAuth()
    const api = useAxios()
    const [open, setOpen] = React.useState(false)
    const { t } = useTranslation()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.delete('/postinternal/' + index, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
        } catch (error) {
            toast({
                variant: 'destructive',
                title: t('error'),
                description: t('errorDeleting'),
            })
            console.error('Error deleting :', error)
            return
        }
        setOpen(false)
        toast({
            variant: 'success',
            title: t('success'),
            description: t('changesSaved'),
        })
        fetchData(currentPage)
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-slate-500 hover:bg-red-400 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer">
                        <MdDeleteForever className="relative top-0 right-0 w-[40px] p-1 h-[40px]" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('deletePostConfirmation')}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form
                        className="flex flex-row text-center justify-between items-center align-middle"
                        onSubmit={handleSubmit}
                    >
                        <Button
                            variant={'secondary'}
                            onClick={() => {
                                setOpen(false)
                            }}
                            type="submit"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            variant={'destructive'}
                            onClick={handleSubmit}
                            type="submit"
                        >
                            {t('delete')}
                        </Button>
                    </form>
                    <DialogFooter></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TeamUpdateDelete
