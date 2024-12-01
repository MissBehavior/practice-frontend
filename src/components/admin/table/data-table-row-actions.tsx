import { Row } from '@tanstack/react-table'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../custom/button'
import { RxDotsHorizontal } from 'react-icons/rx'
import { UserAdminData } from '@/types'
import { MdDeleteForever } from 'react-icons/md'

interface DataTableRowActionsProps<TData> {
    row: Row<UserAdminData>
    deleteUser: (id: string) => void
}

export function DataTableRowActions<TData>({
    row,
    deleteUser,
}: DataTableRowActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <RxDotsHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        className="capitalize bg-red-400 hover:bg-red-600"
                        onClick={() => {
                            console.log('DeleteUser called')
                            deleteUser(row.original._id)
                        }}
                    >
                        Delete
                        <MdDeleteForever />
                    </Button>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
