import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import dayjs from 'dayjs'
import { AuthContextType, AuthToken, JwtPayload, User } from '@/types'

const baseURL = 'http://localhost:3000'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userToken, setUserToken] = useState<any>(null)
    const [user, setUser] = useState<User>({
        id: '',
        name: '',
        isAdmin: false,
        isEmployee: false,
    })

    useEffect(() => {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token')
        if (token) {
            const parsedToken = JSON.parse(token) as AuthToken
            const decodedToken = jwtDecode<JwtPayload>(parsedToken.accessToken)
            if (dayjs.unix(decodedToken.exp).isBefore(dayjs())) {
                // Attempt to refresh the token
                refreshAccessToken(parsedToken)
            } else {
                setIsLoggedIn(true)
                setUserToken(parsedToken)
                setUserFunc(parsedToken)
            }
        }
    }, [])
    const decodeToken = (token: any) => {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token.accessToken)
            console.log('decodedToken:', decodedToken)
            return decodedToken
        } catch (error) {
            console.error('Invalid token:', error)
        }
    }
    const refreshAccessToken = async (token: AuthToken) => {
        console.log('Refreshing token-------------------------')
        try {
            const response = await axios.post(`${baseURL}/auth/refresh_token`, {
                refreshToken: token.refreshToken,
            })
            const newToken: AuthToken = response.data
            setIsLoggedIn(true)
            setUserToken(newToken)
            setUserFunc(newToken)
            localStorage.setItem('token', JSON.stringify(newToken))
        } catch (error) {
            console.error('Refresh token failed', error)
            logoutFunc()
        }
    }
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
        window.location.reload()
    }
    const setUserFunc = (token: any) => {
        if (token) {
            try {
                const decodedToken = jwtDecode<JwtPayload>(token.accessToken)
                setUser({
                    id: decodedToken.aud,
                    name: decodedToken.name,
                    isAdmin: decodedToken.isAdmin,
                    isEmployee: decodedToken.isEmployee,
                })
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        id: decodedToken.aud,
                        name: decodedToken.name,
                        isAdmin: decodedToken.isAdmin,
                        isEmployee: decodedToken.isEmployee,
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
                setUserToken,
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
export const useAxios = () => {
    const { userToken, setUserToken, setUserFunc, logoutFunc } = useAuth()

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${userToken?.accessToken}`,
        },
    })

    axiosInstance.interceptors.request.use(
        async (req) => {
            if (!userToken) return req

            const decodedToken = jwtDecode<JwtPayload>(userToken.accessToken)
            const isExpired = dayjs.unix(decodedToken.exp).isBefore(dayjs())

            if (!isExpired) return req

            try {
                console.log('Refreshing token-------------------------2')
                const response = await axios.post(
                    `${baseURL}/auth/refresh_token`,
                    {
                        refreshToken: userToken.refreshToken,
                    }
                )

                const newToken: AuthToken = response.data
                localStorage.setItem('token', JSON.stringify(newToken))
                setUserToken(newToken)
                setUserFunc(newToken)

                req.headers.Authorization = `Bearer ${newToken.accessToken}`
                return req
            } catch (error) {
                console.error('Refresh token failed', error)
                logoutFunc()
                return Promise.reject(error)
            }
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    return axiosInstance
}
