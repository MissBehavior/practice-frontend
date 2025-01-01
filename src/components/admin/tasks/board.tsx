import React from 'react'

import {
    DndContext,
    type DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'

type Props = {
    onDragEnd: (event: DragEndEvent) => void
}

export const KanbanBoard = ({
    onDragEnd,
    children,
}: React.PropsWithChildren<Props>) => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 5,
        },
    })
    const sensors = useSensors(mouseSensor, touchSensor)
    const handleDragEnd = (event: DragEndEvent) => {
        if (event.over === null) {
            return
        }

        onDragEnd(event)
    }

    return (
        <KanbanBoardContainer>
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                {children}
            </DndContext>
        </KanbanBoardContainer>
    )
}

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="min-h-screen w-full dark:bg-[#101010]">
            <div className="flex w-full h-full overflow-auto overflow-x-auto py-4 px-2 sm:px-4 xs:px-0">
                {children}
            </div>
        </div>
    )
}
