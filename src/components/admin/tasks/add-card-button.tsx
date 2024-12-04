import React from 'react'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { Button } from '@/components/ui/button' // Adjust the import path based on your project structure

interface Props {
    onClick: () => void
}

export const KanbanAddCardButton = ({
    children,
    onClick,
}: React.PropsWithChildren<Props>) => {
    return (
        <Button
            size="lg"
            className="m-4 bg-white flex items-center"
            onClick={onClick}
        >
            <AiOutlinePlusSquare className="mr-2 text-md" />
            {children ?? (
                <span className="text-md text-gray-500">Add new card</span>
            )}
        </Button>
    )
}
