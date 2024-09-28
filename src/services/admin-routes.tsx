import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/services/auth-service' // Adjust the path as necessary

const AdminRoutes = () => {
    const { user, isAuthLoading } = useAuth()

    console.log('EmployeeRoutes user:', user)
    console.log('EmployeeRoutes user.isAdmin:', user.isAdmin)
    if (isAuthLoading) {
        return <div>Loading...</div> // Or a spinner/loading component
    }
    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default AdminRoutes
