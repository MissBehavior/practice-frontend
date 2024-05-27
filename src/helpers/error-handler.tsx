import axios from 'axios'

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        let err = error.message
        if (Array.isArray(error.response?.data)) {
            for (let val of error.response.data) {
                err += val + '\n'
            }
        }
    }
}
