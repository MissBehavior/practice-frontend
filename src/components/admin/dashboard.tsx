import React, { useState } from 'react'
import UsersTable from './users-table'
import AdminSidenav from './sidenav'
import { Outlet } from 'react-router-dom'
import Header from '../pages/header/header'
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    Line,
    Scatter,
} from 'recharts'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import axios from 'axios'
import { DataPoint, UserAdminData } from '@/types'
import UserCard from './users-card'
import RegisterCountChart from './register-count-chart'
import { useTheme } from '../theme-provider'

function AdminDashboard() {
    const [chartData, setChartData] = useState<DataPoint[]>([])
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
                const month = date.toLocaleString('default', { month: 'short' })
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

    React.useEffect(() => {
        const currentYear = new Date().getFullYear().toString()
        fetchData(currentYear)
    }, [])
    return (
        <>
            {/* <div className="w-full p-6 h-2 bg-slate-500"> HEADER</div> */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8 p-4 mx-auto">
                <div className="flex  gap-4 justify-between flex-wrap w-full">
                    <UserCard count={10} date="Today" type="Users" />
                    <UserCard count={120} date="Today" type="Gallery" />
                    <UserCard count={15} date="Today" type="Clients" />
                </div>
                <RegisterCountChart
                    chartData={chartData}
                    theme={theme}
                    fetchData={fetchData}
                />
            </div>
        </>
    )
}

export default AdminDashboard
