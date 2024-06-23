import './App.css'
import 'swiper/css'
import Header from './components/pages/header/header'
import Footer from './components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Toaster } from './components/ui/toaster'
import postExternalImg from '/cropped-Featured-picture-1.jpg'

// ACTS AS ROOT LAYOUT
function App() {
    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <Header />
                <Toaster />
                <div className="min-h-screen">
                    <img
                        className="m-auto h-full max-h-96 object-cover w-full"
                        src={postExternalImg}
                        alt=""
                    />
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
