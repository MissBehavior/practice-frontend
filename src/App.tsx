import './App.css'
import 'swiper/css'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Admin from './components/admin/admin'
import Header from './components/header/header'
import Footer from './pages/home/footer'
import ScrollButton from './pages/home/scroll-to-top'

function App() {
    const { pathname } = useLocation()
    const [currentPath, setCurrentPath] = useState('')
    const [currentCategory, setCurrentCategory] = useState('')

    const routeMappings = [
        { path: '/', title: 'Home', category: 'Main' },
        { path: '/home', title: 'Home', category: 'Main' },
        { path: '/post-external', title: 'News', category: 'Main' },
        { path: '/post-internal', title: 'Team Updates', category: 'Main' },
        { path: '/solutions', title: 'Solutions', category: 'Main' },
        { path: '/profile', title: 'Profile', category: 'Profile' },
        { path: '/login', title: 'Login', category: 'Public' },
        { path: '/register', title: 'Register', category: 'Public' },
        {
            path: '/forgot-password',
            title: 'Reset Password',
            category: 'Public',
        },
        { path: '/team-updates', title: 'Team Updates', category: 'Main' },
        { path: '/clients', title: 'Clients', category: 'Main' },
        { path: '/gallery', title: 'Gallery', category: 'Main' },
        { path: '/people', title: 'People', category: 'Main' },
    ]

    const adminRoutePatterns = [
        /^\/admin/,
        /^\/dashboard/,
        /^\/users/,
        /^\/kanban(\/.*)?$/,
    ]

    const isAdminRoute = (pathname: string) => {
        return adminRoutePatterns.some((pattern) => pattern.test(pathname))
    }

    const getRouteDetails = (pathname: string) => {
        if (isAdminRoute(pathname)) {
            return { title: 'Admin', category: 'Admin' }
        }
        const route = routeMappings.find((route) => route.path === pathname)
        if (route) {
            return { title: route.title, category: route.category }
        }
        if (pathname.startsWith('/kanban')) {
            return { title: 'Kanban', category: 'Admin' }
        }
        return { title: 'Not Found', category: 'Public' }
    }

    useEffect(() => {
        const { title, category } = getRouteDetails(pathname)
        setCurrentPath(title)
        setCurrentCategory(category)
    }, [pathname])

    return (
        <>
            {currentCategory === 'Admin' ? (
                <Admin />
            ) : (
                <>
                    <Header />

                    {/* {currentCategory !== 'Profile' && (
                        <div className="min-h-screen">
                            <div className="relative">
                                <img
                                    className="m-auto h-full max-h-96 object-cover w-full select-none"
                                    src={postExternalImg}
                                    alt=""
                                    draggable="false"
                                />
                                <div className="select-none drop-shadow text-slate-400 dark:text-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:text-7xl font-bold bg-slate-500/[.15] rounded-2xl shadow backdrop-blur-md border border-white/50 sm:p-10 p-4">
                                    {currentPath}
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    )} */}
                    <Outlet />
                    {/* <Footer /> */}
                    <div className="backto-top">
                        <ScrollButton />
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}

export default App
