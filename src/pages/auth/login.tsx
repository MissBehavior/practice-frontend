import React, { useEffect, useRef } from 'react'
import { Button } from '../../components/ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from '../../components/ui/use-toast'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthToken, TSignInSchema, signInSchema } from '@/types'
import { useAuth } from '@/services/auth-service'

export default function Login() {
    const { loginFunc, isLoggedIn, setUserFunc } = useAuth()

    const navigate = useNavigate()
    // const [name = '', setName] = React.useState<string>()
    // const [email = '', setEmail] = React.useState<string>()
    // const [password = '', setPassword] = React.useState<string>()
    const [status, setStatus] = React.useState<string>('idle')
    const [userToken, setUserToken] = React.useState<AuthToken>()
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
        toast({
            variant: 'success',
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
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
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
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                            >
                                Sign Up →
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
                                Email address
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
                                Password
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
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                                >
                                    Forgot your password?
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

            {/* {status === 'error' && (
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
            <div
                className={
                    'flex flex-wrap justify-center items-start bg-white dark:bg-background'
                }
            >
                <div className="mt-16 mb-12 min-h-64 w-full bg-white dark:bg-background flex justify-center items-center flex-col">
                    <form
                        onSubmit={handleSubmit(onSubmitE)}
                        className={`flex flex-col gap-10 p-16 xs:w-full md:w-11/12 lg:w-9/12 xl:w-7/12 2xl:w-2/6 w-full bg-white dark:bg-slate-700 shadow-xl hover:shadow-2xl transition-all transform duration-300 text-center items-center justify-center`}
                    >
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email"
                            className="w-full px-2 py-2 rounded border-solid border-slate-700 dark:border-slate-300 border-2  dark:bg-slate-700"
                        />
                        {errors.email && (
                            <p className="text-red-500">{`${errors.email.message}`}</p>
                        )}
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Password"
                            className="w-full px-2 py-2 rounded border-solid border-slate-700 dark:border-slate-300 border-2  dark:bg-slate-700"
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
                        <NavLink
                            to="/forgot-password"
                            className="text-blue-500"
                        >
                            Forgot Password?
                        </NavLink>
                    </form>
                </div>
            </div> */}
        </>
    )
}
