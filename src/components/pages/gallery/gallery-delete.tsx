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
import { useAuth, useAxios } from '@/services/auth-service'
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
interface GalleryDeleteProps {
    fetchData: () => void
    index: string
}
function GalleryDelete({ fetchData, index }: GalleryDeleteProps) {
    const { userToken } = useAuth()
    const { t } = useTranslation()
    const api = useAxios()
    const [open, setOpen] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('HANDLE SUBMIT')
        console.log(index)
        try {
            const response = await api.delete('/gallery/' + index, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
        } catch (error) {
            console.error('Error deleting :', error)
        }
        setOpen(false)
        fetchData()
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="rounded-md bg-slate-500 hover:bg-red-400 shadow-lg transition-all transform duration-150 hover:scale-105 cursor-pointer">
                        <MdDeleteForever className="relative top-0 right-0 w-[40px] p-1 h-[40px] " />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {t('deleteGalleryConfirmation')}
                        </DialogTitle>
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

export default GalleryDelete
