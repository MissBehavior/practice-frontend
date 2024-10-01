import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n/config.ts'
import PostExternal from './components/pages/posts-external/posts-external.tsx'
import About from './components/pages/about/about.tsx'
import Career from './components/pages/career/career.tsx'
import Clients from './components/pages/clients/clients.tsx'
import Gallery from './components/pages/gallery/gallery.tsx'
import Home from './components/pages/home.tsx'
import Solutions from './components/pages/solutions/solutions.tsx'
import People from './components/pages/people/people.tsx'
import Login from './components/pages/login.tsx'
import Register from './components/pages/register.tsx'
import { AuthProvider } from './services/auth-service.tsx'
import SolutionsDetail from './components/pages/solutions/solutions-detail.tsx'
import GalleryDetail from './components/pages/gallery/gallery-detail.tsx'
import EmployeeRoutes from './services/employee-routes.tsx'
import TeamUpdates from './components/team-updates/team-updates.tsx'
import AdminDashboard from './components/admin/dashboard.tsx'
import UsersTable from './components/admin/table/users-table.tsx'
import Profile from './components/pages/profile/profile.tsx'
import ProtectedRoutes from './services/protected-routes.tsx'
import AdminRoutes from './services/admin-routes.tsx'
import TableExample from './components/admin/table/table-example.tsx'
import OtpFlow from './components/pages/otp-flow.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/career',
                element: <Career />,
            },
            {
                path: '/post-external',
                element: <PostExternal />,
            },
            {
                path: '/clients',
                element: <Clients />,
            },
            {
                path: '/gallery',
                element: <Gallery />,
            },
            {
                path: '/gallery/:id',
                element: <GalleryDetail />,
            },
            {
                path: '/people',
                element: <People />,
            },
            {
                path: '/solutions',
                element: <Solutions />,
            },
            {
                path: '/solutions/:id',
                element: <SolutionsDetail />,
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/profile',
                        element: <Profile />,
                    },
                ],
            },
            {
                element: <EmployeeRoutes />,
                children: [
                    {
                        path: '/team-updates',
                        element: <TeamUpdates />,
                    },
                ],
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/forgot-password',
                element: <OtpFlow />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            // TODO: TESTING ADMIN
            {
                element: <AdminRoutes />,
                children: [
                    {
                        path: '/admin',
                        element: <AdminDashboard />,
                    },
                    {
                        path: '/users',
                        element: <UsersTable />,
                    },
                    {
                        path: '/dashboard',
                        element: <AdminDashboard />,
                    },
                ],
            },
        ],
        errorElement: <div>404</div>,
    },
    {
        path: '/post-external',
        element: <PostExternal />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
