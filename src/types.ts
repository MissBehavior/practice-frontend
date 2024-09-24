export type UserTokens = {
    accessToken: string
    refreshToken: string
}
export interface AuthContextType {
    isLoggedIn: boolean
    loginFunc: (token: AuthToken) => void
    logoutFunc: () => void
    setUserFunc: (token: AuthToken) => void
    setUserToken: (token: AuthToken) => void
    userToken: AuthToken | null
    user: User
}
export interface JwtPayload {
    isAdmin: boolean
    isEmployee: boolean
    name: string
    iat: number
    exp: number
    aud: string
    iss: string
}
export interface AuthToken {
    accessToken: string
    refreshToken: string
}
export interface User {
    id: string
    name: string
    isAdmin: boolean
    isEmployee: boolean
    mail?: string
}
export interface UserAdminData {
    _id: string
    name: string
    email: string
    isAdmin: boolean
    isEmployee: boolean
    createdAt: string
    updatedAt: string
}
export interface SolutionsData {
    _id: string
    cardImgUrl: string
    cardImgPath: string
    titleCard: string
    contentCard: string
    contentMain?: string
    contentMainImg?: string
    contantMainImgPath?: string
}
export interface GalleryData {
    _id: string
    cardImgUrl: string
    cardImgPath: string
    title: string
    galleryImages?: galleryImages[]
}
export interface galleryImages {
    imgPath: string
    imgUrl: string
}
export interface PostData {
    _id: string
    title: string
    content: string
    userId: string
    createdAt: string
    userName: string
    postPicture: string
}
import { z } from 'zod'

export const signUpSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type TSignInSchema = z.infer<typeof signInSchema>
export type TSignUpSchema = z.infer<typeof signUpSchema>
