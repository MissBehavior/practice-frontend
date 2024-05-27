import React, { useEffect, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'
import { UserTokens } from '@/types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const userRef = useRef<HTMLInputElement>(null)
    const [name = '', setName] = React.useState<string>()
    const [email = '', setEmail] = React.useState<string>()
    const [password = '', setPassword] = React.useState<string>()
    const [status, setStatus] = React.useState<string>('idle')
    const [userToken, setUserToken] = React.useState<UserTokens>()
    const [error, setError] = React.useState<string>()
    const { t } = useTranslation()
    useEffect(() => {
        if (userRef.current === null) return
        userRef.current.focus()
    }, [])

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submitting ----------------------------')
        e.preventDefault()
        console.log('email', email)
        console.log('password', password)
        setStatus('pending')
        try {
            let userToken = await loginRequest(email, password)
            setUserToken(userToken)
            setStatus('success')
        } catch (e: any) {
            console.log('error', e)
            if (e.response?.status === 404) {
                setError('Incorrect username or password')
            } else if (e.response?.status === 403) {
                setError('Incorrect username or password')
            } else {
                setError(e.message)
            }
            setStatus('error')
        }
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
            title: 'Login Success',
            description: 'You have successfully logged in',
        })
        navigate('/')
    }

    // INPUT FIELDS WITH TABS
    return (
        <Tabs defaultValue="signin" className="text-center">
            {/* Login TAB @@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <TabsList className="w-full">
                <TabsTrigger value="signin" className="w-full">
                    Signin
                </TabsTrigger>
                <TabsTrigger value="signup" className="w-full">
                    Password
                </TabsTrigger>
            </TabsList>
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
            <TabsContent value="signin">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <Label>Login</Label>
                        Use your email and password to login.
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                E-Mail
                            </Label>
                            <Input
                                id="email"
                                // defaultValue="example@examplemail.com"
                                placeholder="example@gmail.com"
                                className="col-span-3"
                                type="email"
                                ref={userRef}
                                value={email}
                                onChange={(e) => {
                                    setError('')
                                    setEmail(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                // defaultValue="********"
                                placeholder="*********"
                                className="col-span-3"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                    setError('')

                                    setPassword(e.target.value)
                                }}
                                value={password}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" onClick={() => handleSubmit}>
                        {t('login')} TT
                    </Button>
                </form>
            </TabsContent>

            {/* REGISTER TAB @@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <TabsContent value="signup">
                <DialogHeader>
                    <Label>Register</Label>
                    Provide the details for your account
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            // defaultValue="Stefan Peterson"
                            placeholder="Stefan Peterson"
                            className="col-span-3"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            E-Mail*
                        </Label>
                        <Input
                            id="email"
                            // defaultValue="example@examplemail.com"
                            placeholder="example@gmail.com"
                            className="col-span-3"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password*
                        </Label>
                        <Input
                            id="password"
                            // defaultValue="********"
                            placeholder="*********"
                            className="col-span-3"
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            required
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    onClick={() =>
                        toast({
                            variant: 'destructive',
                            title: 'Scheduled: Register up',
                            description: 'Friday, February 10, 2023 at 5:57 PM',
                        })
                    }
                >
                    {t('register')}
                </Button>
            </TabsContent>
        </Tabs>
    )
}
