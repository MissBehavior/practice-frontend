import React from 'react'
import { useDraggable, DragOverlay, UseDraggableArguments } from '@dnd-kit/core'

interface Props {
    id: string
    data?: UseDraggableArguments['data']
}

export const KanbanItem = ({
    children,
    id,
    data,
}: React.PropsWithChildren<Props>) => {
    const { attributes, listeners, setNodeRef, active } = useDraggable({
        id,
        data,
    })

    return (
        <div className="relative">
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                className={`relative ${active ? 'opacity-50' : 'opacity-100'}`}
            >
                {children}
            </div>
            {active?.id === id && (
                <DragOverlay>
                    <div className="rounded-lg shadow-lg cursor-grabbing">
                        {children}
                    </div>
                </DragOverlay>
            )}
        </div>
    )
}
