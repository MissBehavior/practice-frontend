import './App.css'
import 'swiper/css'
import Header from './components/pages/header/header'
import Footer from './components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet, useLocation } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Toaster } from './components/ui/toaster'
import postExternalImg from '/cropped-Featured-picture-1.jpg'
import { useEffect, useState } from 'react'

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
            case '/team-updates':
                setCurrentPath('Team Updates')
                break
            case '/' || '/home':
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
            default:
                console.log('Default')
                break
        }
    }, [pathname])
    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <Header />
                <Toaster />
                <div className="min-h-screen">
                    <div className="relative">
                        <img
                            className="m-auto h-full max-h-96 object-cover w-full"
                            src={postExternalImg}
                            alt=""
                        />
                        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-xl font-bold">
                            {currentPath}
                        </div>
                    </div>
                    <Outlet />
                </div>
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default App
// - > Long text problem
// -> Image additiongalery needs to be sent
// TODO: Validate type of file that is uploaded!
