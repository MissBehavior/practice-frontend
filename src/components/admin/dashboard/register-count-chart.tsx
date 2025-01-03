import React from 'react'

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
import { FaChevronDown } from 'react-icons/fa'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

function RegisterCountChart({
    chartData,
    theme,
    fetchData,
}: {
    chartData: DataPoint[]
    theme: string
    fetchData: (year: string) => void
}) {
    const { t } = useTranslation()

    const getYearsArray = (): number[] => {
        const currentYear = new Date().getFullYear()
        const startYear = 2022

        return Array.from(
            { length: currentYear - startYear + 1 },
            (_, i) => startYear + i
        )
    }
    return (
        <div className="dark:bg-[#191919] bg-slate-200 rounded-lg p-4 h-96">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="dark:text-slate-200">
                        {t('year')}: {new Date().getFullYear()}
                        <FaChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="center"
                    className="flex flex-col gap-2"
                >
                    {getYearsArray().map((year) => (
                        <Button
                            key={year}
                            onClick={() => fetchData(year.toString())}
                        >
                            {year}
                        </Button>
                    ))}
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
                        content={() => <div>{t('registered')}</div>}
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
