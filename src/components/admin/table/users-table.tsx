import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import axios from 'axios'
import { UserAdminData } from '@/types'
import { useAuth, useAxios } from '@/services/auth-service'
import { Button } from '@/components/ui/button'
import { EditUserDialog } from './edit-user-dialog'
import { CreateUserDialog } from './create-user-dialog'

function UsersTable() {
    const { userToken } = useAuth()
    const api = useAxios()

    const [users, setUsers] = useState<UserAdminData[]>([])
    const [editingUser, setEditingUser] = useState<UserAdminData | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/admin/users'
            )
            console.log('#################')
            console.log(response)
            setUsers(response.data.allUsers)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const deleteUser = async (id: string) => {
        try {
            await api.delete('/admin/users/' + id, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))
        } catch (error) {
            console.error('Error deleting :', error)
        }
    }

    const editUser = (user: UserAdminData) => {
        setEditingUser(user)
        setIsEditDialogOpen(true)
    }

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false)
        setEditingUser(null)
    }

    const handleUpdateUser = async (updatedData: Partial<UserAdminData>) => {
        if (!editingUser) return
        try {
            const response = await api.put(
                '/admin/users/' + editingUser._id,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )

            // Update local state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === editingUser._id ? response.data : user
                )
            )

            // Close dialog after saving
            handleCloseEditDialog()
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    const handleCreateUser = async (newUserData: Partial<UserAdminData>) => {
        try {
            const response = await api.post('/admin/users', newUserData, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })

            // Add the new user to the state
            setUsers((prevUsers) => [...prevUsers, response.data])
            setIsCreateDialogOpen(false)
        } catch (error) {
            console.error('Error creating user:', error)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="py-24 px-4 flex flex-col h-screen w-full">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3x1 font-bold">Users</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Create User
                </Button>
            </div>
            <DataTable columns={columns(deleteUser, editUser)} data={users} />
            <EditUserDialog
                isOpen={isEditDialogOpen}
                onClose={handleCloseEditDialog}
                userData={editingUser}
                onSubmit={handleUpdateUser}
            />
            <CreateUserDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateUser}
            />
        </section>
    )
}

export default UsersTable
