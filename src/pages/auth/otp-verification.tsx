import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import i18n from '@/i18n/config'
import { useTranslation } from 'react-i18next'

interface OtpVerificationProps {
    email: string
    onResetEmail: () => void // Function to clear the email and return to EmailSubmit
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
    email,
    onResetEmail,
}) => {
    const [otp, setOtp] = useState<string>('')
    const [timer, setTimer] = useState<number>(60) // 3 minutes timer (180 seconds)
    const [canResend, setCanResend] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { t } = useTranslation()

    // Start the countdown timer on component mount
    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalId)
                        setCanResend(true)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(intervalId) // Cleanup the interval on unmount
        }
    }, [timer])

    const handleSubmitOtp = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                'http://localhost:3000/auth/verify-otp',
                {
                    email,
                    otp,
                }
            )

            if (response.status === 200) {
                console.log('OTP verified successfully')
                // Navigate to ResetPassword component, passing email as state
                navigate('/reset-password', { state: { email } })
            } else {
                setError('Invalid OTP')
            }
        } catch (error: any) {
            // Handle specific error messages from backend if available
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message)
            } else {
                setError('Error verifying OTP. Please try again.')
            }
        }
    }

    const handleResendOtp = async () => {
        if (canResend) {
            try {
                const response = await axios.post(
                    'http://localhost:3000/auth/forgot-password',
                    { email }
                )

                if (response.status === 200) {
                    console.log('OTP resent successfully')
                    setTimer(180) // Reset timer to 3 minutes
                    setCanResend(false)
                    setError(null) // Clear any previous errors
                } else {
                    setError('Failed to resend OTP.')
                }
            } catch (error: any) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    setError(error.response.data.message)
                } else {
                    setError('Error resending OTP. Please try again.')
                }
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-200 dark:bg-[#101010]">
            <div className="max-w-md w-full bg-slate-300 dark:bg-[#191919] rounded-lg shadow-lg p-6">
                <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-16">
                    <form onSubmit={handleSubmitOtp}>
                        <div className="flex flex-col space-y-2 text-center mb-4">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                {i18n.language === 'en'
                                    ? 'Confirm code'
                                    : 'Įveskite slaptažodį'}
                            </h2>
                            <p className="text-md md:text-xl">
                                {i18n.language === 'en'
                                    ? 'Enter the code we just sent you.'
                                    : 'Įveskite kodą, kurį mes jums išsiuntėme.'}
                            </p>
                        </div>
                        <div className="flex flex-col max-w-md space-y-5">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder={
                                    i18n.language === 'en'
                                        ? 'Enter Code'
                                        : 'Įveskite kodą'
                                }
                                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal bg-slate-200 dark:bg-[#101010]"
                                required
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="flex flex-row justify-between">
                                <button
                                    type="submit"
                                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                                >
                                    {t('confirm')}
                                </button>
                                <div className="flex items-center justify-center">
                                    {canResend ? (
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                                            onClick={handleResendOtp}
                                        >
                                            {i18n.language === 'en'
                                                ? 'Resend Code'
                                                : 'Išsiųsti kodą iš naujo'}
                                        </button>
                                    ) : (
                                        <p className="font-medium text-indigo-600 dark:text-indigo-300">
                                            {i18n.language === 'en'
                                                ? 'Time remaining:'
                                                : 'Liko laiko:'}{' '}
                                            {Math.floor(timer / 60)}:
                                            {(timer % 60)
                                                .toString()
                                                .padStart(2, '0')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center"></div>
                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                                onClick={onResetEmail}
                            >
                                {i18n.language === 'en'
                                    ? 'Return to Email Input'
                                    : 'Grįžti į el. pašto įvedimą'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerification
