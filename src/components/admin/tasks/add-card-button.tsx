import React from 'react'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { Button } from '@/components/ui/button' // Adjust the import path based on your project structure
import { useTranslation } from 'react-i18next'

interface Props {
    onClick: () => void
}

export const KanbanAddCardButton = ({
    children,
    onClick,
}: React.PropsWithChildren<Props>) => {
    const { t } = useTranslation()

    return (
        <Button
            size="lg"
            className="m-4 dark:bg-white bg-slate-300 flex items-center"
            onClick={onClick}
        >
            <AiOutlinePlusSquare className="mr-2 text-md" />
            {children ?? (
                <span className="text-md text-gray-500">
                    {t('add_new_card')}
                </span>
            )}
        </Button>
    )
}
