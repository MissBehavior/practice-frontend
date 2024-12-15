import React, { useState } from 'react'
import axios from 'axios'
import { DataPoint } from '@/types'
import UserCard from './users-card'
import { useTheme } from '../../theme-provider'
import RegisterCountChart from './register-count-chart'
import KanbanPieChart from './kanban-pie-chart'
import MostLikedPostCard from './most-liked-post-card'
import MostCommentedPostCard from './most-commented-post'

function AdminDashboard() {
    const [chartData, setChartData] = useState<DataPoint[]>([])
    const [userCount, setUserCount] = useState<number>()
    const [galleryCount, setGalleryCount] = useState<number>()
    const { theme } = useTheme()
    const fetchData = async (year: string) => {
        try {
            const response = await axios.get(
                'http://localhost:3000/admin/users/year/' + year
            )
            const usersData = response.data
            const monthCounts: { [key: string]: number } = {
                Jan: 0,
                Feb: 0,
                Mar: 0,
                Apr: 0,
                May: 0,
                Jun: 0,
                Jul: 0,
                Aug: 0,
                Sep: 0,
                Oct: 0,
                Nov: 0,
                Dec: 0,
            }
            usersData.forEach((user: any) => {
                const date = new Date(user.createdAt)
                const month = date.toLocaleString('en', { month: 'short' })
                monthCounts[month]++
            })
            const formattedData = Object.keys(monthCounts).map((month) => ({
                name: month,
                registered: monthCounts[month],
            }))
            setChartData(formattedData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchUserCount = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/admin/users/count/all/'
            )
            setUserCount(response.data.total)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    const fetchGalleryCount = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/admin/gallery/count/all/'
            )
            setGalleryCount(response.data.total)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    React.useEffect(() => {
        const currentYear = new Date().getFullYear().toString()
        fetchData(currentYear)
        fetchUserCount()
        fetchGalleryCount()
    }, [])
    return (
        <>
            {/* <div className="w-full p-6 h-2 bg-slate-500"> HEADER</div> */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8 p-4 mx-auto">
                <div className="flex  gap-4 justify-between flex-wrap w-full">
                    <UserCard
                        count={userCount ? userCount : 0}
                        date="Today"
                        type="Users"
                    />
                    <UserCard
                        count={galleryCount ? galleryCount : 0}
                        date="Today"
                        type="Gallery"
                    />
                    <UserCard count={15} date="Today" type="Clients" />
                    <UserCard count={45} date="TODO" type="TeamUpdates" />
                    <UserCard count={45} date="TODO" type="TasksInKanban" />
                    <UserCard count={45} date="TODO" type="NrOnGoingInKanban" />
                </div>
                <div className="flex flex-row gap-2 max-md:flex-col">
                    <MostLikedPostCard />
                    <MostCommentedPostCard />
                </div>
                <UserCard
                    count={11111111111111}
                    date="DIFFERENT"
                    type="UserMstTaskKanban"
                />

                <RegisterCountChart
                    chartData={chartData}
                    theme={theme}
                    fetchData={fetchData}
                />
                <KanbanPieChart />
            </div>
        </>
    )
}

export default AdminDashboard
