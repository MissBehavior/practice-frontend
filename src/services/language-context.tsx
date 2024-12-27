import React, { createContext, ReactNode, useContext, useState } from 'react'
import i18n from 'i18next'
export type Language = 'en' | 'lt'

interface LanguageContextType {
    language: Language
    setLanguage: (language: Language) => void
}
const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
)

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
interface LanguageProviderProps {
    children: ReactNode
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const [language, setLanguage] = useState<Language>(() => {
        const storedLanguage = localStorage.getItem('i18nextLng') as Language
        return storedLanguage || 'en'
    })

    const changeLanguage = (newLanguage: Language) => {
        setLanguage(newLanguage)
        localStorage.setItem('i18nextLng', newLanguage)
        i18n.changeLanguage(newLanguage)
    }

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage: changeLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    )
}
