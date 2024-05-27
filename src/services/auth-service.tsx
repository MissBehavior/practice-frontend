import { handleError } from '@/helpers/error-handler'
import axios from 'axios'
const api = 'http://localhost:3001/auth'

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post(`${api}/login`, { email, password })
        return data
    } catch (error) {
        handleError(error)
    }
}
