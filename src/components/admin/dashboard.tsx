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
import { UserAdminData } from '@/types'

interface DataPoint {
    name: string
    registered: number
}

function AdminDashboard() {
    const [chartData, setChartData] = useState<DataPoint[]>([])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/admin/users/year/2024'
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
        fetchData()
    }, [])
    return (
        <>
            {/* <div className="w-full p-6 h-2 bg-slate-500"> HEADER</div> */}
            {/* // TODO: ALIGN ITEMS  */}
            <div className="w-full h-1/3 flex flex-col p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                            Year
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <div>1999</div> <div>2000</div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={300}
                        data={chartData}
                        barSize={20}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            // vertical={false}
                            stroke="#ddd"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tick={{ fill: '#d1d5db' }}
                            tickLine={false}
                        />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '10px',
                                borderColor: 'lightgray',
                            }}
                        />
                        <Legend
                            align="left"
                            verticalAlign="top"
                            wrapperStyle={{
                                paddingTop: '20px',
                                paddingBottom: '40px',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="registered"
                            stroke="#fa004f"
                            fill="#8884d8"
                            dot={{
                                r: 5,
                                stroke: '#ffffff',
                                strokeWidth: 2,
                                fill: '#fff',
                            }}
                            strokeWidth={4}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default AdminDashboard
