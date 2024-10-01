import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface OtpVerificationProps {
    email: string
    onResetEmail: () => void // Function to clear the email and return to EmailSubmit
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
    email,
    onResetEmail,
}) => {
    const [otp, setOtp] = useState<string>('')
    const [timer, setTimer] = useState<number>(180) // 3 minutes timer (180 seconds)
    const [canResend, setCanResend] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Start the countdown timer on component mount
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        if (timer === 0) {
            setCanResend(true) // Enable resend OTP
        }

        return () => clearInterval(intervalId) // Cleanup the interval on unmount
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
                // Proceed to password reset or other logic
            } else {
                setError('Invalid OTP')
            }
        } catch (error) {
            setError('Error verifying OTP. Please try again.')
        }
    }

    const handleResendOtp = async () => {
        if (canResend) {
            try {
                const response = await axios.post('/forgot-password', { email })

                if (response.status === 200) {
                    console.log('OTP resent successfully')
                    setTimer(180) // Reset timer to 3 minutes
                    setCanResend(false)
                } else {
                    setError('Failed to resend OTP.')
                }
            } catch (error) {
                setError('Error resending OTP. Please try again.')
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmitOtp}>
                <div>
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Verify OTP</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <p>
                    Time remaining: {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, '0')}
                </p>
                {canResend ? (
                    <button onClick={handleResendOtp}>Resend OTP</button>
                ) : (
                    <button disabled>Resend OTP</button>
                )}
            </div>

            <button onClick={onResetEmail}>Return to Email Input</button>
        </div>
    )
}

export default OtpVerification
