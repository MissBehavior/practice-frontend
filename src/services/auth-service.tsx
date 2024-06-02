import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react'
import { jwtDecode } from 'jwt-decode'

interface AuthContextType {
    isLoggedIn: boolean
    loginFunc: (token: any) => void
    logoutFunc: () => void
    setUserFunc: (token: any) => void
    userToken: any
    user: User
}
interface JwtPayload {
    isAdmin: boolean
    name: string
    iat: number
    exp: number
    aud: string
    iss: string
}
interface User {
    name: string
    isAdmin: boolean
    mail?: string
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userToken, setUserToken] = useState<any>(null)
    const [user, setUser] = useState<User>({ name: '', isAdmin: false })

    useEffect(() => {
        // Check if there's a token in localStorage
        // TODO: HERE WE NEED TO IMPLEMENT A CHECK IF THE TOKEN IS VALID OR NOT (EXPIRED) AND IF IT IS NOT VALID, WE NEED TO LOGOUT THE USER AUTOMATICALLY AND REDIRECT TO LOGIN PAGE.
        // TODO 2: WE NEED TO IMPLEMENT A REFRESH TOKEN FUNCTIONALITY
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
            setUserToken(JSON.parse(token))
        }
    }, [])

    const loginFunc = (token: any) => {
        setIsLoggedIn(true)
        setUserToken(token)
        localStorage.setItem('token', JSON.stringify(token))
    }

    const logoutFunc = () => {
        setIsLoggedIn(false)
        setUserToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    const setUserFunc = (token: any) => {
        if (token) {
            try {
                const decodedToken = jwtDecode<JwtPayload>(token.accessToken)
                setUser({
                    name: decodedToken.name,
                    isAdmin: decodedToken.isAdmin,
                })
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        name: decodedToken.name,
                        isAdmin: decodedToken.isAdmin,
                    })
                )
            } catch (error) {
                console.error('Invalid token:', error)
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                loginFunc,
                logoutFunc,
                userToken,
                setUserFunc,
                user,
            }}
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
