import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import axios from 'axios'
import { UserAdminData } from '@/types'
function UsersTable() {
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
    React.useEffect(() => {
        fetchData()
    }, [])
    return (
        <section className="py-24">
            <div className="container">
                <h1 className="text-3x1 font-bold">Users</h1>
                <DataTable columns={columns} data={users} />
            </div>
        </section>
    )
}

export default UsersTable
