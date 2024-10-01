import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/services/auth-service' // Adjust the path as necessary

const ProtectedRoutes = () => {
    const { isLoggedIn, isAuthLoading } = useAuth()
    console.log('isLoggedIn user:', isLoggedIn)
    console.log('EmployeeRoisLoggedInutes isAuthLoading:', isAuthLoading)
    // If still checking authentication, show a loading screen or return null
    if (isAuthLoading) {
        return <div>Loading...</div> // Or a spinner/loading component
    }

    // Only redirect to login if auth is confirmed to be false
    if (!isLoggedIn && !isAuthLoading) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoutes
