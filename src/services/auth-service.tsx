import React, { createContext, useState, useContext, ReactNode } from 'react'

interface AuthContextType {
    isLoggedIn: boolean
    loginFunc: (token: any) => void
    logoutFunc: () => void
    userToken: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userToken, setUserToken] = useState<any>(null)

    const loginFunc = (token: any) => {
        setIsLoggedIn(true)
        setUserToken(token)
        localStorage.setItem('user', JSON.stringify(token))
    }

    const logoutFunc = () => {
        setIsLoggedIn(false)
        setUserToken(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, loginFunc, logoutFunc, userToken }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
