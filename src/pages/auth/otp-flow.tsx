import React, { useState } from 'react'
import OtpVerification from './otp-verification'
import ForgotPassword from './forgot-password'

const OtpFlow: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null)

    const handleEmailSubmit = (submittedEmail: string) => {
        setEmail(submittedEmail) // Store email and switch to OTP verification
    }

    const handleResetEmail = () => {
        setEmail(null) // Clear email and go back to EmailSubmit component
    }

    return (
        <div>
            {email ? (
                <OtpVerification
                    email={email}
                    onResetEmail={handleResetEmail}
                />
            ) : (
                <ForgotPassword onEmailSubmit={handleEmailSubmit} />
            )}
        </div>
    )
}

export default OtpFlow
