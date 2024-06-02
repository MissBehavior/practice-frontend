import { useEffect, useState } from 'react'
import MyEditor from '../editor'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'
interface Data {
    _id: string
    title: string
    content: string
    userId: string
}
export default function PostExternal() {
    const [data, setData] = useState<Data[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Data[]>(
                    'http://localhost:3000/post/'
                )
                console.log('response:', response)
                console.log('-----------------')
                console.log(data)
                setData(response.data)
                console.log(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false)
            }
        }
        // timeout for 2 seconds
        setTimeout(() => {
            fetchData()
        }, 1000)
    }, [])

    if (loading) {
        return (
            <div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className="flex items-center space-x-4 justify-center m-5">
                        <Skeleton className="h-24 w-24" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[400px]" />
                            <Skeleton className="h-4 w-[350px]" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <>
            {data.map((item) => (
                <div
                    key={item._id}
                    style={{ marginBottom: 20 }}
                    className="flex items-center space-x-4 justify-center m-5"
                >
                    <h1>ID:{item._id}</h1>
                    <h1>Title:{item.title}</h1>
                    <p>Content:{item.content}</p>
                    <p>By User:{item.userId}</p>
                </div>
            ))}
            <MyEditor />
        </>
    )
}
