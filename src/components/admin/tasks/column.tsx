import React from 'react'
import { useDroppable, UseDroppableArguments } from '@dnd-kit/core'
import { FiPlusCircle } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslation } from 'react-i18next'

type Props = {
    id: string
    title: string
    description?: React.ReactNode
    count: number
    data?: UseDroppableArguments['data']
    onAddClick?: (args: { id: string }) => void
}

export const KanbanColumn = ({
    children,
    id,
    title,
    description,
    count,
    data,
    onAddClick,
}: React.PropsWithChildren<Props>) => {
    const { t } = useTranslation()

    const { isOver, setNodeRef, active } = useDroppable({
        id,
        data,
    })

    const onAddClickHandler = () => {
        onAddClick?.({ id })
    }

    return (
        <div ref={setNodeRef} className="flex flex-col p-4 w-80">
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="uppercase text-xs font-bold mr-2">
                            {t(title)}
                        </div>
                        {!!count && <Badge className="">{count}</Badge>}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onAddClickHandler}
                    >
                        <FiPlusCircle className="w-5 h-5 " />
                    </Button>
                </div>
                {description}
            </div>
            <div
                className={`flex-1 overflow-y-auto border-2 border-dashed ${
                    isOver ? 'border-gray-400' : 'border-transparent'
                } rounded-md`}
            >
                <div className="mt-3 flex flex-col gap-2">{children}</div>
            </div>
        </div>
    )
}

export const KanbanColumnSkeleton = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col p-4 w-80">
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Button variant="ghost" size="icon" disabled>
                        <FiPlusCircle className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            <div className="flex-1 border-2 border-dashed border-transparent rounded-md">
                <div className="mt-3 flex flex-col gap-2">{children}</div>
            </div>
        </div>
    )
}
