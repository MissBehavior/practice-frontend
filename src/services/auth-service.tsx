import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react'

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

    useEffect(() => {
        // Check if there's a token in localStorage
        // TODO: HERE WE NEED TO IMPLEMENT A CHECK IF THE TOKEN IS VALID OR NOT (EXPIRED) AND IF IT IS NOT VALID, WE NEED TO LOGOUT THE USER AUTOMATICALLY AND REDIRECT TO LOGIN PAGE.
        // TODO 2: WE NEED TO IMPLEMENT A REFRESH TOKEN FUNCTIONALITY
        const token = localStorage.getItem('user')
        if (token) {
            setIsLoggedIn(true)
            setUserToken(JSON.parse(token))
        }
    }, [])

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
