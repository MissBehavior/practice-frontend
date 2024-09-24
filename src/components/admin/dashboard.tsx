import React from 'react'
import UsersTable from './users-table'
import AdminSidenav from './sidenav'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
    return (
        <>
            <div className="w-full p-6 h-2 bg-slate-500"> HEADER</div>
            <div className="h-full w-full flex flex-row">
                <AdminSidenav />
                <Outlet />
            </div>
        </>
    )
}

export default AdminDashboard
