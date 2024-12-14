import { UserAdminData } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../ui/button'
import { ArrowUpDown } from 'lucide-react'
import { MdDeleteForever } from 'react-icons/md'
import { DataTableRowActions } from './data-table-row-actions'

export const columns = (
    deleteUser: (id: string) => void,
    editUser: (user: UserAdminData) => void
): ColumnDef<UserAdminData>[] => [
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                deleteUser={deleteUser}
                editUser={editUser}
                row={row}
            />
        ),
    },
    // {
    //     accessorKey: '_id',
    //     header: ({ column }) => (
    //         <Button
    //             variant="ghost"
    //             onClick={() =>
    //                 column.toggleSorting(column.getIsSorted() === 'asc')
    //             }
    //         >
    //             <ArrowUpDown className="ml-2 h-4 w-4" />
    //             <span>id</span>
    //         </Button>
    //     ),
    // },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <ArrowUpDown className="ml-2 h-4 w-4" />
                <span>Name</span>
            </Button>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <ArrowUpDown className="ml-2 h-4 w-4" />
                <span>Email</span>
            </Button>
        ),
    },
    {
        accessorKey: 'telefon',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <ArrowUpDown className="ml-2 h-4 w-4" />
                <span>Phone</span>
            </Button>
        ),
    },
    {
        accessorKey: 'isAdmin',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <ArrowUpDown className="ml-2 h-4 w-4" />
                <span>Admin</span>
            </Button>
        ),
    },
    {
        accessorKey: 'isEmployee',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <ArrowUpDown className="ml-2 h-4 w-4" />
                <span>Employee</span>
            </Button>
        ),
    },
    // {
    //     accessorKey: 'createdAt',
    //     header: ({ column }) => (
    //         <Button
    //             variant="ghost"
    //             onClick={() =>
    //                 column.toggleSorting(column.getIsSorted() === 'asc')
    //             }
    //         >
    //             <ArrowUpDown className="ml-2 h-4 w-4" />
    //             <span>Created At</span>
    //         </Button>
    //     ),
    // },
    // {
    //     accessorKey: 'updatedAt',
    //     header: ({ column }) => (
    //         <Button
    //             variant="ghost"
    //             onClick={() =>
    //                 column.toggleSorting(column.getIsSorted() === 'asc')
    //             }
    //         >
    //             <ArrowUpDown className="ml-2 h-4 w-4" />
    //             <span>Updated At</span>
    //         </Button>
    //     ),
    // },
]
