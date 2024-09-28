import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/services/auth-service' // Adjust the path as necessary

const EmployeeRoutes = () => {
    const { user, isAuthLoading } = useAuth()

    console.log('EmployeeRoutes user:', user)
    console.log('EmployeeRoutes user.isEmployee:', user.isEmployee)
    if (isAuthLoading) {
        return <div>Loading...</div> // Or a spinner/loading component
    }
    if (!user.isEmployee) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default EmployeeRoutes
