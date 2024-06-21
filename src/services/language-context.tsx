import React, { createContext, useContext, useState } from 'react'

export type Language = 'en' | 'lt' // Define your language types

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

export const LanguageProvider: React.FC = ({ children }: any) => {
    const [language, setLanguage] = useState<Language>('en') // Default language is English

    const changeLanguage = (newLanguage: Language) => {
        setLanguage(newLanguage)
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}
