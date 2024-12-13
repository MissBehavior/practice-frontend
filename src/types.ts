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
    content: string
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

export type TSignInSchema = z.infer<typeof signInSchema>
export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export interface DataPoint {
    name: string
    registered: number
}
