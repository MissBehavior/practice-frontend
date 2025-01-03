import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { AiOutlineFileSearch } from 'react-icons/ai' // Import an icon from react-icons
import { useTranslation } from 'react-i18next'
import { useAxios } from '@/services/auth-service'

interface TaskStageStat {
    stage: string
    count: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const KanbanPieChart: React.FC = () => {
    const [data, setData] = useState<TaskStageStat[]>([])
    const { t } = useTranslation()
    const api = useAxios()

    const getStatisticsKanban = async () => {
        await api
            .get('http://localhost:3000/tasks/tasks/stats')
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.error('Error fetching task stats:', error)
            })
    }
    const stageTranslationMap: Record<string, string> = {
        'In Progress': t('inProgress'),
        Unassigned: t('unassigned'),
        Backlog: t('backlog'),
        DONE: t('done'),
    }
    useEffect(() => {
        getStatisticsKanban()
    }, [])

    const totalTasks = data.reduce((acc, curr) => acc + curr.count, 0)

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { value } = payload[0]
            return (
                <div
                    className="custom-tooltip bg-[#f2f2f2] dark:bg-gray-800 p-2 rounded shadow"
                    style={{ border: '1px solid #ddd' }}
                >
                    <p className="label text-black dark:text-white">
                        <strong>{t('stage')}:</strong>{' '}
                        {payload[0].payload.stage}
                    </p>
                    <p className="intro text-black dark:text-white">
                        <strong>{t('count')}:</strong> {value}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke dark:bg-[#191919] bg-[#f2f2f2] px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        {t('kanbanTaskStats')}
                    </h5>
                </div>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <AiOutlineFileSearch className="text-gray-400 text-6xl mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {t('noDataFound')}
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-2">
                        <div
                            id="chartThree"
                            className="mx-auto flex justify-center"
                        >
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    innerRadius={60}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    paddingAngle={2}
                                    dataKey="count"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </div>
                    </div>

                    <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                        {data.map((stageData, index) => {
                            const percentage =
                                totalTasks > 0
                                    ? (
                                          (stageData.count / totalTasks) *
                                          100
                                      ).toFixed(2)
                                    : '0.00'
                            return (
                                <div
                                    className="sm:w-1/2 w-full px-8"
                                    key={stageData.stage}
                                >
                                    <div className="flex w-full items-center">
                                        <span
                                            className="mr-2 block h-3 w-full max-w-3 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    COLORS[
                                                        index % COLORS.length
                                                    ],
                                            }}
                                        ></span>
                                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                            <span>
                                                {' '}
                                                {
                                                    stageTranslationMap[
                                                        stageData.stage
                                                    ]
                                                }
                                            </span>
                                            <span>{percentage}%</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default KanbanPieChart
