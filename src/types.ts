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
    setUser: (user: User) => void
    isAuthLoading: boolean
}
export interface JwtPayload {
    isAdmin: boolean
    isEmployee: boolean
    name: string
    iat: number
    exp: number
    aud: string
    iss: string
    telefon: string
    email: string
    profileImgUrl: string
    profileImgPath: string
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
    email: string
    profileImgUrl: string
    profileImgPath: string
    telefon: string
}
export interface UserAdminData {
    _id: string
    name: string
    email: string
    isAdmin: boolean
    isEmployee: boolean
    createdAt: string
    updatedAt: string
    telefon: string
    profileImgUrl: string
    profileImgPath: string
    languages: string[]
}
export interface SolutionsData {
    _id: string
    cardImgUrl: string
    cardImgPath: string
    titleCard: string
    titleCardLT: string
    contentCard: string
    contentCardLT: string
    contentMain: string
    contentMainLT: string
    contentMainImg: string
    contantMainImgPath: string
    createdAt: string
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
    titleLT: string
    content: string
    contentLT: string
    userId: UserObjectPopulated
    createdAt: string
    postPicture: string
    categories: Category[]
}
export interface Category {
    _id: string
    name: string
    count?: number
}
export interface PostsResponse {
    totalPages: number
    currentPage: number
    latestPost: PostData
    categories: Category[]
    posts: PostData[]
}
export interface PostDataInternal {
    _id: string
    title: string
    content: string
    userId: UserObjectPopulated
    createdAt: string
    userName: string
    postPicture: string
    likes: UserObjectPopulated[]
    comments: CommentData[]
}
export interface CommentData {
    _id: string
    text: string
    user: UserObjectPopulated
    likes: UserObjectPopulated[]
    createdAt: string
    updatedAt: string
}

export interface Task {
    _id: string
    title: string
    description: string
    dueDate: string
    tags: string[]
    assignee: UserObjectPopulated[]
    stage: string
    createdAt: string
    updatedAt: string
    createdBy: UserObjectPopulated
}

export interface TaskToSend {
    title: string
    description: string
    dueDate: string
    tags: string[]
    assignee: string[]
    stage: string
    createdBy: string
}
export interface UserObjectPopulated {
    _id: string
    name: string
    email: string
    profileImgUrl: string
}

import exp from 'constants'
import { z } from 'zod'
import { languages } from './pages/profile/languages'

export const signUpSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})
export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
})
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter.',
            })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter.',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain at least one number.',
            })
            .regex(/[^a-zA-Z0-9]/, {
                message:
                    'Password must contain at least one special character.',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    })
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export type TSignInSchema = z.infer<typeof signInSchema>
export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export interface DataPoint {
    name: string
    registered: number
}
