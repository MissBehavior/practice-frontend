import { UserAdminData } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../ui/button'
import { ArrowUpDown } from 'lucide-react'
import { DataTableRowActions } from './data-table-row-actions'

export const columns = (
    deleteUser: (id: string) => void,
    editUser: (user: UserAdminData) => void,
    t: (key: string) => string
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
                <span>{t('name')}</span>
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
                <span>{t('email')}</span>
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
                <span>{t('phone')}</span>
            </Button>
        ),
    },
    {
        accessorKey: 'languages',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <ArrowUpDown className="ml-2 h-4 w-4" />
                <span>{t('languages')}</span>
            </Button>
        ),
        cell: ({ row }) => {
            const languages = row.original.languages ?? []
            return <span>{languages.join(', ')}</span>
        },
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
                <span>{t('admin')}</span>
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
                <span>{t('employee')}</span>
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
]
