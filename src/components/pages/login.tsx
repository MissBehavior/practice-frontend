import React from 'react'
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

export default function Login() {
    const { t } = useTranslation()
    return (
        <Dialog>
            <DialogTrigger>
                <Button>{t('login')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {/* Login TAB @@@@@@@@@@@@@@@@@@@@@@@@@ */}
                <Tabs defaultValue="signin" className="text-center">
                    <TabsList className="w-full">
                        <TabsTrigger value="signin" className="w-full">
                            Signin
                        </TabsTrigger>
                        <TabsTrigger value="signup" className="w-full">
                            Password
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <DialogHeader>
                            <DialogTitle>Login</DialogTitle>
                            <DialogDescription>
                                Use your email and password to login.
                            </DialogDescription>
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
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="password"
                                    className="text-right"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    // defaultValue="********"
                                    placeholder="*********"
                                    className="col-span-3"
                                    type="password"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{t('login')}</Button>
                        </DialogFooter>
                    </TabsContent>

                    {/* REGISTER TAB @@@@@@@@@@@@@@@@@@@@@@@@@ */}
                    <TabsContent value="signup">
                        <DialogHeader>
                            <DialogTitle>Register</DialogTitle>
                            <DialogDescription>
                                Provide the details for your account
                            </DialogDescription>
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
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="password"
                                    className="text-right"
                                >
                                    Password*
                                </Label>
                                <Input
                                    id="password"
                                    // defaultValue="********"
                                    placeholder="*********"
                                    className="col-span-3"
                                    type="password"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{t('register')}</Button>
                        </DialogFooter>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
