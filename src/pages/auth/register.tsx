import React, { useEffect, useRef } from 'react'
import { Button } from '../../components/ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from '../../components/ui/use-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema, AuthToken } from '@/types'
import { useAuth } from '@/services/auth-service'
import i18n from '@/i18n/config'

export default function Register() {
    const { loginFunc, setUserFunc } = useAuth()
    const navigate = useNavigate()
    const userRef = useRef<HTMLInputElement>(null)
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
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    })

    const registerRequest = async (
        name: string,
        email: string,
        password: string
    ) => {
        console.log('---- register in Request -----')
        let res = await axios.post(
            'http://localhost:3000/auth/register/',
            { name: name, email: email, password: password },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        console.log('--------response at Register Page--------')
        console.log(res.data)
        return res.data
    }

    if (status === 'pending') {
        return <div className="text-center">Loading...</div>
    }

    if (status === 'success') {
        console.log('-------success data---------')
        console.log(userToken)
        localStorage.setItem('user', JSON.stringify(userToken))
        toast({
            variant: 'default',
            title: 'Register Success',
            description: 'You have successfully registered in',
        })
        navigate('/')
    }

    const onSubmit = async (data: TSignUpSchema) => {
        console.log(data)
        console.log('submitting ----------------------------')
        try {
            let userToken = await registerRequest(
                data.name,
                data.email,
                data.password
            )
            console.log(userToken)
            setUserToken(userToken)
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
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
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
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {i18n.language === 'en'
                                ? 'Sign up for an account'
                                : 'Registruotis'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {i18n.language === 'en'
                                ? 'Have an account?'
                                : 'Turite paskyrą?'}{' '}
                            <Link
                                to="/login"
                                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                            >
                                {t('sign_in')} →
                            </Link>
                        </p>
                    </div>

                    <form
                        className="space-y-6 mt-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="email"
                            >
                                {t('name')}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('name')}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                                    id="name"
                                    type="name"
                                    placeholder="Name"
                                    required
                                    autoFocus
                                />

                                {errors.name && (
                                    <p className="text-red-500">
                                        {`${errors.name.message}`}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="email"
                            >
                                {t('email')}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('email')}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="your@email.com"
                                    required
                                    autoFocus
                                />
                                {errors.email && (
                                    <p className="text-red-500">{`${errors.email.message}`}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="password"
                            >
                                {t('password')}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('password')}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500">{`${errors.password.message}`}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center"></div>
                            <div className="text-sm">
                                {/* <Link
                                    to="/forgot-password"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                                >
                                    Forgot your password?
                                </Link> */}
                            </div>
                        </div>

                        <div>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="inline-flex items-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base bg-black text-white hover:bg-gray-800 border-black focus:ring-black w-full justify-center"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {t('register')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
