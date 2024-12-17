// src/components/ResetPassword.tsx
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button' // Ensure this path is correct
import { useTranslation } from 'react-i18next'
import { toast } from '../../components/ui/use-toast' // Ensure this path is correct
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema, TResetPasswordSchema } from '@/types'
import i18n from '@/i18n/config'

const ResetPassword: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state as { email: string } | undefined
    const { t } = useTranslation()

    const [status, setStatus] = useState<
        'idle' | 'pending' | 'success' | 'error'
    >('idle')
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
    })

    useEffect(() => {
        if (!state || !state.email) {
            // If no email is provided, redirect to forgot-password
            navigate('/forgot-password')
        }
    }, [state, navigate])

    const resetPasswordRequest = async (email: string, password: string) => {
        try {
            const res = await axios.post(
                'http://localhost:3000/auth/reset-password',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            )
            return res.data
        } catch (error: any) {
            throw error
        }
    }

    const onSubmit = async (data: TResetPasswordSchema) => {
        if (!state || !state.email) {
            setError('Invalid request. Please try again.')
            return
        }

        setStatus('pending')
        setError(null)

        try {
            await resetPasswordRequest(state.email, data.password)
            setStatus('success')
            toast({
                variant: 'success',
                title: 'Password Reset Successful',
                description:
                    'Your password has been reset successfully. You can now log in.',
            })
            reset()
            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (e: any) {
            console.error('Error resetting password:', e)
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message)
            } else {
                setError('Error resetting password. Please try again.')
            }
            setStatus('error')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                {status === 'error' && error && (
                    <div
                        style={{
                            backgroundColor: '#e57373',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '15px',
                        }}
                        className="Auth-form"
                    >
                        {error}
                    </div>
                )}

                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t('Reset Password')}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {i18n.language === 'en'
                            ? 'Enter your new password below'
                            : 'Įveskite naują slaptažodį'}
                    </p>
                </div>

                <form
                    className="space-y-6 mt-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="password"
                        >
                            {i18n.language === 'en'
                                ? 'New Password'
                                : 'Naujas slaptažodis'}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register('password')}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500`}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="confirmPassword"
                        >
                            {i18n.language === 'en'
                                ? 'Confirm New Password'
                                : 'Patvirtinkite naują slaptažodį'}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                id="confirmPassword"
                                placeholder="••••••••"
                                className={`appearance-none block w-full px-3 py-2 border ${
                                    errors.confirmPassword
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500`}
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className={`inline-flex items-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base ${
                                isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-800 border-black'
                            } w-full justify-center`}
                        >
                            {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm">
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                        >
                            {i18n.language === 'en'
                                ? ' Back to Login'
                                : 'Grįžti į prisijungimą'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
