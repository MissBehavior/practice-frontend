import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n/config.ts'
import PostExternal from './components/pages/posts-external'
import About from './components/pages/about/about.tsx'
import Career from './components/pages/career.tsx'
import Clients from './components/pages/clients.tsx'
import Gallery from './components/pages/gallery.tsx'
import Home from './components/pages/home.tsx'
import Solutions from './components/pages/solutions/solutions.tsx'
import People from './components/pages/people/people.tsx'
import Login from './components/pages/login.tsx'
import Register from './components/pages/register.tsx'
import ProtectedRoutes from './services/protected-routes.tsx'
import { AuthProvider } from './services/auth-service.tsx'
import SolutionsDetail from './components/pages/solutions/solutions-detail.tsx'

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
            // {
            //     path: '/people',
            //     element: <People />,
            // },
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
                        path: '/people',
                        element: <People />,
                    },
                ],
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
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
    <React.StrictMode>
        {/* <BrowserRouter> */}
        {/* <Header /> */}
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        {/* <App /> */}
        {/* </BrowserRouter> */}
        {/* <Footer /> */}
    </React.StrictMode>
)
