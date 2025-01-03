import React from 'react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Task } from '@/types'
import { getDateColor } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type Props = {
    dueDate?: Task['dueDate']
}

export const DueDateHeader = ({ dueDate }: Props) => {
    const { t } = useTranslation()

    if (dueDate) {
        const colorStatus = getDateColor({ date: dueDate })

        // Map colorStatus to Badge variant
        const variant =
            colorStatus === 'error'
                ? 'destructive'
                : colorStatus === 'warning'
                ? 'secondary'
                : 'default'

        // Determine tag text based on colorStatus
        const tagText =
            colorStatus === 'error'
                ? 'Overdue'
                : colorStatus === 'warning'
                ? 'Due soon'
                : 'On track'

        return (
            <div className="flex items-center space-x-2">
                <Badge variant={variant}>{tagText}</Badge>
                <span className="text-sm text-gray-600">
                    {format(new Date(dueDate), 'MMMM d, yyyy - h:mma')}
                </span>
            </div>
        )
    }

    return (
        <span className="text-blue-500 hover:underline" onClick={() => {}}>
            {t('add_due_date')}
        </span>
    )
}
