import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import axios from 'axios'
import { UserAdminData } from '@/types'
import { useTranslation } from 'react-i18next'
import { useAuth, useAxios } from '@/services/auth-service'
function UsersTable() {
    const { userToken } = useAuth()
    const api = useAxios()
    const { t } = useTranslation()

    const [users, setUsers] = useState<UserAdminData[]>([])
    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/admin/users'
            )
            console.log('response:', response)
            console.log('-----------------')
            setUsers(response.data.allUsers)
            console.log(users)
            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    const deleteUser = async (index: string) => {
        try {
            const response = await api.delete('/admin/users/' + index, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            console.log(response.data)
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== index)
            )
        } catch (error) {
            console.error('Error deleting :', error)
        }
        // fetchData()
    }

    React.useEffect(() => {
        fetchData()
    }, [])
    return (
        <section className="py-24">
            <div className="container">
                <h1 className="text-3x1 font-bold">Users</h1>
                <DataTable columns={columns(deleteUser)} data={users} />
            </div>
        </section>
    )
}

export default UsersTable
