import './App.css'
import 'swiper/css'
import { Outlet } from 'react-router-dom'
import Header from './components/header/header'
import Footer from './pages/home/footer'
import ScrollButton from './pages/home/scroll-to-top'

function App() {
    return (
        <>
            <Header />
            <Outlet />
            {/* <Footer /> */}
            <div className="backto-top">
                <ScrollButton />
            </div>
            <Footer />
        </>
    )
}

export default App
