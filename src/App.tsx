import './App.css'
// import { Button } from "./components/ui/button";
import Header from './components/header'
import Footer from './components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import MyEditor from './components/editor'
import { Toaster } from './components/ui/toaster'
// ACTS AS ROOT LAYOUT
function App() {
    const [value, setValue] = useState('')
    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <Header />
                {/* <Button onClick={() => console.log("clicked")}>Click me</Button> */}
                <Toaster />
                <Outlet />
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default App
