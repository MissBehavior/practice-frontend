import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../custom/button'
import { RxDotsHorizontal } from 'react-icons/rx'
import { UserAdminData } from '@/types'
import { MdDeleteForever } from 'react-icons/md'
import { Row } from '@tanstack/react-table'

interface DataTableRowActionsProps {
    row: Row<UserAdminData>
    deleteUser: (id: string) => void
    editUser: (user: UserAdminData) => void
}

export function DataTableRowActions({
    row,
    deleteUser,
    editUser,
}: DataTableRowActionsProps) {
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
                <DropdownMenuItem
                    onClick={() => editUser(row.original)}
                    className="cursor-pointer"
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => deleteUser(row.original._id)}
                    className="cursor-pointer"
                >
                    Delete
                    <MdDeleteForever />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
