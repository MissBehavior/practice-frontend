import React, { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthToken, TSignInSchema, signInSchema } from '@/types'
import { useAuth } from '@/services/auth-service'

export default function Login() {
    const { loginFunc, isLoggedIn, setUserFunc } = useAuth()

    const navigate = useNavigate()
    const userRef = useRef<HTMLInputElement>(null)
    // const [name = '', setName] = React.useState<string>()
    // const [email = '', setEmail] = React.useState<string>()
    // const [password = '', setPassword] = React.useState<string>()
    const [status, setStatus] = React.useState<string>('idle')
    const [userToken, setUserToken] = React.useState<AuthToken>()
    const [error, setError] = React.useState<string>()
    const { t } = useTranslation()
    useEffect(() => {
        if (userRef.current === null) return
        userRef.current.focus()
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    })

    const loginRequest = async (email: string, password: string) => {
        console.log('---- logging in Request -----')
        let res = await axios.post(
            'http://localhost:3000/auth/login/',
            { email: email, password: password },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        console.log('--------response at LoginPage--------')
        console.log(res.data)
        return res.data
    }

    if (status === 'pending') {
        return <div className="text-center">Loading...</div>
    }

    if (status === 'success') {
        console.log('-------success data---------')
        console.log(userToken)
        toast({
            variant: 'default',
            title: 'Login Success',
            description: 'You have successfully logged in',
        })
        navigate('/')
    }

    const onSubmitE = async (data: TSignInSchema) => {
        // ...
        console.log('submitting login----------------------------')
        console.log(data)
        try {
            let userToken = await loginRequest(data.email, data.password)
            loginFunc(userToken)
            setUserFunc(userToken)
            setStatus('success')
            reset()
        } catch (e: any) {
            console.log('error', e)
            console.log('error', typeof e)
            if (e.code === 'ERR_NETWORK') {
                console.log('network error')
                setError('Network Error')
            }
            if (e.response?.status === 404) {
                setError('Incorrect username or password')
            } else if (e.response?.status === 403) {
                setError('Incorrect username or password')
            } else if (e.response?.status === 401) {
                setError('Incorrect username or password')
            } else {
                setError(e.message)
            }
            setStatus('error')
        }
    }
    return (
        <>
            {status === 'error' && (
                <div
                    style={{
                        backgroundColor: '#e57373',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                    className="Auth-form"
                >
                    {error}
                </div>
            )}
            <form
                onSubmit={handleSubmit(onSubmitE)}
                className="flex flex-col gap-y-2"
            >
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 rounded"
                />
                {errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
                <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="px-4 py-2 rounded"
                />
                {errors.password && (
                    <p className="text-red-500">{`${errors.password.message}`}</p>
                )}

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="disabled:bg-red-500 py-2 rounded"
                    onClick={() => {
                        handleSubmit(onSubmitE)
                    }}
                >
                    {t('login')}
                </Button>
            </form>
        </>
    )
}
