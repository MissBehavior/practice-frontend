import React from 'react'
import { Button } from '../../components/ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from '../../components/ui/use-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TSignInSchema, signInSchema } from '@/types'
import { useAuth } from '@/services/auth-service'
import i18n from '@/i18n/config'

export default function Login() {
    const { loginFunc, isLoggedIn, setUserFunc } = useAuth()

    const navigate = useNavigate()
    const [status, setStatus] = React.useState<string>('idle')
    const [error, setError] = React.useState<string>()
    const { t } = useTranslation()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    })

    const loginRequest = async (email: string, password: string) => {
        let res = await axios.post(
            'http://localhost:3000/auth/login/',
            { email: email, password: password },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        return res.data
    }

    if (status === 'pending') {
        return <div className="text-center">Loading...</div>
    }

    if (status === 'success') {
        toast({
            variant: 'success',
            title: 'Login Success',
            description: 'You have successfully logged in',
        })
        navigate('/')
    }

    const onSubmitE = async (data: TSignInSchema) => {
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
            <div className="flex items-center justify-center min-h-screen bg-slate-200 dark:bg-[#101010]">
                <div className="max-w-md w-full bg-slate-300 dark:bg-[#191919] rounded-lg shadow-lg p-6">
                    <div className="text-center">
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
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {i18n.language === 'en'
                                ? 'Sign in to your account'
                                : 'Prisijungti prie savo paskyros'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {i18n.language === 'en'
                                ? "Don't have an account?"
                                : 'Neturite paskyros?'}{' '}
                            <Link
                                to="/register"
                                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                            >
                                {t('signup')} →
                            </Link>
                        </p>
                    </div>

                    <form
                        className="space-y-6 mt-8"
                        onSubmit={handleSubmit(onSubmitE)}
                    >
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
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 bg-slate-200 dark:bg-[#191919] dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 bg-slate-200 dark:bg-[#191919] dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                                >
                                    {t('forgot_passwordquestion')}
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="inline-flex items-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base bg-black text-white hover:bg-gray-800 border-black focus:ring-black w-full justify-center"
                            >
                                {t('login')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
