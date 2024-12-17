import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n/config.ts'
import PostExternal from './pages/posts-external/posts-external.tsx'
import Gallery from './pages/gallery/gallery.tsx'
import Home from './pages/home/home.tsx'
import Solutions from './pages/solutions/solutions.tsx'
import Login from './pages/auth/login.tsx'
import Register from './pages/auth/register.tsx'
import { AuthProvider } from './services/auth-service.tsx'
import SolutionsDetail from './pages/solutions/solutions-detail.tsx'
import GalleryDetail from './pages/gallery/gallery-detail.tsx'
import EmployeeRoutes from './services/employee-routes.tsx'
import AdminDashboard from './components/admin/dashboard/dashboard.tsx'
import UsersTable from './components/admin/table/users-table.tsx'
import Profile from './pages/profile/profile.tsx'
import ProtectedRoutes from './services/protected-routes.tsx'
import AdminRoutes from './services/admin-routes.tsx'
import OtpFlow from './pages/auth/otp-flow.tsx'
import NextTopLoader from 'nextjs-toploader'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import TeamUpdates from './pages/team-updates/team-updates.tsx'
import { TasksListPage } from './components/admin/tasks/index.tsx'
import { TasksEditPage } from './components/admin/tasks/edit/task-edit-page.tsx'
import PostDetail from './pages/posts-external/post-detail.tsx'
import TeamUpdateDetail from './pages/team-updates/team-updates-detail.tsx'
import ResetPassword from './pages/auth/reset-password.tsx'

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
                path: '/post-external',
                element: <PostExternal />,
            },
            {
                path: '/post-external/:id',
                element: <PostDetail />,
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
                    {
                        path: '/team-updates/:id',
                        element: <TeamUpdateDetail />,
                    },
                    {
                        path: '/kanban',
                        // element: <Kanban />,
                        element: <TasksListPage />,
                        children: [
                            {
                                path: ':taskId',
                                element: <TasksEditPage />,
                            },
                        ],
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
            {
                path: '/reset-password',
                element: <ResetPassword />,
            },
            // {
            //     path: '/admin',
            //     element: <AdminDashboard />,
            // },
            // {
            //     path: '/users',
            //     element: <UsersTable />,
            // },

            // {
            //     path: '/dashboard',
            //     element: <AdminDashboard />,
            // },
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
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
            <NextTopLoader />
            <RouterProvider router={router} />
            <Toaster />
        </AuthProvider>
    </ThemeProvider>
)
