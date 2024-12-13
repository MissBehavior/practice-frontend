import { Category, PostsResponse } from '@/types'
import axios from 'axios'

export const fetchPostsByCategory = async (
    categoryId: string,
    page: number = 1,
    limit: number = 10
): Promise<PostsResponse> => {
    const response = await axios.get<PostsResponse>(
        `http://localhost:3000/posts/category${categoryId}`,
        {
            params: { page, limit },
        }
    )
    return response.data
}
export const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(
        `http://localhost:3000/categories`
    )
    return response.data
}
export const fetchPosts = async (
    page: number = 1,
    limit: number = 10
): Promise<PostsResponse> => {
    const response = await axios.get<PostsResponse>(
        `http://localhost:3000/posts`,
        {
            params: { page, limit },
        }
    )
    return response.data
}

export const loadCategories = async () => {
    try {
        const response = await axios.get<Category[]>(
            'http://localhost:3000/categories'
        )
        return response.data
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}
