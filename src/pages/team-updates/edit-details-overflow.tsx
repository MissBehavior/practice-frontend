import { useEffect } from 'react'

export default function EditDialogOverflowEffect({ open }: { open: boolean }) {
    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'auto'
            console.log('Body overflow reset to auto.')
        } else {
            document.body.style.overflow = 'hidden'
            console.log('Body overflow set to hidden.')
        }

        return () => {
            document.body.style.overflow = 'auto'
            console.log('Component unmounted. Body overflow reset to auto.')
        }
    }, [open])

    return null
}
