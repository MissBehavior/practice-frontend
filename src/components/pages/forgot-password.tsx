import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, TForgotPasswordSchema } from '@/types'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

interface EmailSubmitProps {
    onEmailSubmit: (email: string) => void
}

const ForgotPassword: React.FC<EmailSubmitProps> = ({ onEmailSubmit }) => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmitE = async (data: TForgotPasswordSchema) => {
        // ...
        if (email) {
            console.log('---- if Email in Request -----')
            try {
                // Use axios to send the email to the forgot-password endpoint
                const response = await axios.post(
                    'http://localhost:3000/auth/forgot-password/',
                    { email: email },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                console.log('--------response at ForgotPassword--------')
                console.log(response)

                if (response.status === 200) {
                    onEmailSubmit(email) // Pass the email to parent to switch to OTP verification
                } else {
                    console.log('Failed to send email.')
                    console.log(response)
                    setError('Failed to send email.')
                }
            } catch (error: any) {
                console.error(typeof error, error)
                if (error.response) {
                    if (error.response.status === 400) {
                        console.log('Bad request.')
                    } else if (error.response.status === 404) {
                        console.log('Email not found.')
                    } else if (error.response.status === 429) {
                        console.log('Too many requests.')
                        setError('Too many requests. Please try again later.')
                    } else if (error.response.status === 500) {
                        console.log('Server error.')
                    } else {
                        console.log(
                            'Failed to send email with status:',
                            error.response.status
                        )
                        setError(
                            `Failed to send email: ${error.response.status}`
                        )
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request)
                    setError('No response from the server. Please try again.')
                } else {
                    console.error('Error:', error.message)
                    setError('Error sending email. Please try again.')
                }
            }
        }
    }

    useEffect(() => {
        // if (userRef.current === null) return
        // userRef.current.focus()
    }, [])

    return (
        <div className="flex flex-wrap justify-center items-start bg-white dark:bg-background">
            <div className="mt-16 mb-12 min-h-64 w-full bg-white dark:bg-background flex justify-center items-center flex-col">
                <form
                    onSubmit={handleSubmit(onSubmitE)}
                    className={`flex flex-col gap-10 p-16 xs:w-full md:w-11/12 lg:w-9/12 xl:w-7/12 2xl:w-2/6 w-full bg-white dark:bg-slate-700 shadow-xl hover:shadow-2xl transition-all transform duration-300 text-center items-center justify-center`}
                >
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-2 py-2 rounded border-solid border-slate-700 dark:border-slate-300 border-2  dark:bg-slate-700"
                    />
                    {errors.email && (
                        <p className="text-red-500">{`${errors.email.message}`}</p>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Button
                        variant={'secondary'}
                        disabled={isSubmitting}
                        type="submit"
                        className="disabled:bg-red-500 py-2 rounded"
                        onClick={() => {
                            handleSubmit(onSubmitE)
                        }}
                    >
                        Send Email
                    </Button>
                    <NavLink to="/login" className="text-blue-500">
                        Return to login
                    </NavLink>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
