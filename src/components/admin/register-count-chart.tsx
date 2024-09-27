import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { DataPoint } from '@/types'

function RegisterCountChart({
    chartData,
    theme,
    fetchData,
}: {
    chartData: DataPoint[]
    theme: string
    fetchData: (year: string) => void
}) {
    return (
        <div className="dark:bg-slate-700 bg-slate-200 rounded-lg p-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="dark:text-slate-200">
                        Year
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="center"
                    className="flex flex-col gap-2"
                >
                    <Button onClick={() => fetchData('2022')}>2022</Button>{' '}
                    <Button onClick={() => fetchData('2023')}>2023</Button>
                    <Button onClick={() => fetchData('2024')}>2024</Button>
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
                        // stroke="#ddd"
                        stroke={theme == 'dark' ? '#ddd' : '#363636'}
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tick={{ fill: theme == 'dark' ? '#ddd' : '#363636' }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: theme == 'dark' ? '#ddd' : '#363636' }}
                    />
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
    )
}

export default RegisterCountChart
