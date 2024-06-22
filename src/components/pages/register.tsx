import React, { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema, AuthToken } from '@/types'
import { useAuth } from '@/services/auth-service'

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
            <div
                className={
                    'flex flex-wrap justify-center items-start bg-white dark:bg-background'
                }
            >
                <div className="mt-16 mb-12 min-h-64 w-full bg-white dark:bg-background flex justify-center items-center flex-col">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`flex flex-col gap-10 p-16 xs:w-full md:w-11/12 lg:w-9/12 xl:w-7/12 2xl:w-2/6 w-full bg-white dark:bg-slate-700 shadow-xl hover:shadow-2xl transition-all transform duration-300 text-center items-center justify-center`}
                    >
                        <input
                            {...register('name')}
                            type="name"
                            placeholder="Name"
                            className="w-full px-2 py-2 rounded border-solid border-slate-700 dark:border-slate-300 border-2  dark:bg-slate-700"
                        />
                        {errors.name && (
                            <p className="text-red-500">
                                {`${errors.name.message}`} eba
                            </p>
                        )}
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
                            onClick={handleSubmit(onSubmit)}
                        >
                            {t('register')}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
