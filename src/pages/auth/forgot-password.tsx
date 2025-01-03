import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, TForgotPasswordSchema } from '@/types'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'

interface EmailSubmitProps {
    onEmailSubmit: (email: string) => void
}

const ForgotPassword: React.FC<EmailSubmitProps> = ({ onEmailSubmit }) => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const { t } = useTranslation()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmitE = async (data: TForgotPasswordSchema) => {
        if (email) {
            try {
                const response = await axios.post(
                    'http://localhost:3000/auth/forgot-password/',
                    { email: email },
                    { headers: { 'Content-Type': 'application/json' } }
                )

                if (response.status === 200) {
                    onEmailSubmit(email)
                } else {
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
                        setError(
                            'Failed to send email.(Security Error Account doesn"t exist)'
                        )
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

    useEffect(() => {}, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-200 dark:bg-[#101010]">
            <div className="max-w-md w-full bg-slate-300 dark:bg-[#191919] rounded-lg shadow-lg p-6">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {i18n.language === 'en'
                            ? 'Enter your email'
                            : 'Įveskite savo el. paštą'}
                    </h2>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500">{`${errors.email.message}`}</p>
                            )}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </div>
                    <div>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="inline-flex items-center border font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base bg-black text-white hover:bg-gray-800 border-black focus:ring-black w-full justify-center"
                        >
                            {t('send_email')}
                        </Button>
                        <NavLink to="/login" className="text-blue-500">
                            {i18n.language === 'en'
                                ? 'Return to login'
                                : 'Grįžti į prisijungimą'}
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
