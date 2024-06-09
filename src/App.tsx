import './App.css'
import 'swiper/css'
import Header from './components/header'
import Footer from './components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { Toaster } from './components/ui/toaster'
// ACTS AS ROOT LAYOUT
function App() {
    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <Header />
                <Toaster />
                <Outlet />
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default App
