import React, { useEffect, useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

const ScrollButton: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        setVisible(scrolled > 300)
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible, { passive: true })
        return () => {
            window.removeEventListener('scroll', toggleVisible)
        }
    }, [])

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed right-0 bottom-10 z-50 p-10 text-5xl transition-opacity duration-300"
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <FaArrowCircleUp />
        </button>
    )
}

export default ScrollButton
