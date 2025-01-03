import { useEffect } from 'react'

export default function EditDialogOverflowEffect({ open }: { open: boolean }) {
    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'auto'
        } else {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [open])

    return null
}
