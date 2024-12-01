import './App.css'
import 'swiper/css'
import Footer from './components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet, useLocation } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Toaster } from './components/ui/toaster'
import postExternalImg from '/cropped-Featured-picture-1.jpg'
import { useEffect, useState } from 'react'
import Admin from './components/admin/admin'
import Header from './components/header/header'

// ACTS AS ROOT LAYOUT
function App() {
    const { pathname } = useLocation()
    const [currentPath, setCurrentPath] = useState<string>('')
    useEffect(() => {
        // map all paths to their respective components name and set it as variable
        switch (pathname) {
            case '/post-external':
                setCurrentPath('News')
                break
            case '/post-internal':
                setCurrentPath('Team Updates')
                break
            case '/solutions':
                setCurrentPath('Solutions')
                break
            case '/profile':
                setCurrentPath('Profile')
                break
            case '/login':
                setCurrentPath('Login')
                break
            case '/register':
                setCurrentPath('Register')
                break
            case '/forgot-password':
                setCurrentPath('Reset Password')
                break
            case '/team-updates':
                setCurrentPath('Team Updates')
                break
            case '/':
            case '/home':
                setCurrentPath('Home')
                break
            case '/clients':
                setCurrentPath('Clients')
                break
            case '/gallery':
                setCurrentPath('Gallery')
                break
            case '/people':
                setCurrentPath('People')
                break
            case '/admin':
            case '/dashboard':
            case '/users':
            case '/kanban':
                setCurrentPath('Admin')
                break
            default:
                console.log('Default')
                break
        }
    }, [pathname])
    return (
        <>
            {currentPath === 'Admin' && <Admin />}
            {currentPath !== 'Admin' && (
                <>
                    <Header />

                    {currentPath !== 'Profile' && (
                        <div className="min-h-screen">
                            <div className="relative">
                                <img
                                    className="m-auto h-full max-h-96 object-cover w-full select-none"
                                    src={postExternalImg}
                                    alt=""
                                    draggable="false"
                                />
                                <div className="select-none  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-slate-400 dark:text-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:text-7xl font-bold bg-slate-500/[.15] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md border border-white/50 sm:p-10 p-4">
                                    {currentPath}
                                </div>
                            </div>
                            <Outlet />
                        </div>
                    )}
                    {currentPath === 'Profile' && <Outlet />}
                    <Footer />
                </>
            )}
        </>
    )
}

export default App
// - > Long text problem
// -> Image additiongalery needs to be sent
// TODO: Validate type of file that is uploaded!
