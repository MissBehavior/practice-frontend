import { useEffect } from 'react'
import MyEditor from '../editor'
import axios from 'axios'

export default function PostExternal() {
    useEffect(() => {
        const posts = axios.get('http://localhost:3000/post/')
        console.log(posts)
    }, [])
    return <MyEditor />
}
