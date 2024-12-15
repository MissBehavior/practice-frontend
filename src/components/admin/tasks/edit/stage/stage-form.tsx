import React, { useState, useEffect } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { Task } from '@/types'
import axios from 'axios'
import Select from 'react-select'
import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'

type Props = {
    isLoading?: boolean
    task: Task
    taskId: string
}

export const StageForm = ({ isLoading, task, taskId }: Props) => {
    const [stages, setStages] = useState<{ value: string; label: string }[]>([])
    const [selectedStage, setSelectedStage] = useState<{
        value: string
        label: string
    } | null>(null)

    const stagesArr = {
        data: [
            { id: '1', title: 'Backlog' },
            { id: '2', title: 'In Progress' },
            { id: '3', title: 'DONE' },
            { id: '4', title: 'Unassigned' },
        ],
    }

    useEffect(() => {
        const options = stagesArr.data.map((stage) => ({
            value: stage.title,
            label: stage.title,
        }))
        setStages(options)
        const currentStage =
            options.find((option) => option.value === task.stage) || null
        setSelectedStage(currentStage)
        return () => {
            setSelectedStage(null)
        }
    }, [task.stage])

    const handleStageChange = async (
        option: { value: string; label: string } | null
    ) => {
        if (option) {
            setSelectedStage(option)
            try {
                await axios.put(`http://localhost:3000/tasks/${taskId}`, {
                    stage: option.value,
                })
            } catch (error) {
                console.error('Error updating task:', error)
            }
        }
    }

    if (isLoading) {
        return <Skeleton className="h-8 w-full mb-2 rounded" />
    }

    return (
        <div className="flex items-center justify-between p-4  shadow-sm">
            <div className="flex items-center w-full">
                <AiOutlineFlag className="mr-3 text-gray-600" size={24} />

                <Select
                    value={selectedStage}
                    onChange={handleStageChange}
                    options={stages}
                    placeholder="Select Stage"
                    className="w-full"
                    classNamePrefix="react-select"
                    classNames={{
                        // Control (the outer container)
                        control: ({ isFocused }) =>
                            clsx(
                                'relative flex items-center bg-white dark:bg-[#191919] border rounded-md shadow-sm',
                                'min-h-[2.5rem] h-10', // minHeight and height
                                'px-2', // horizontal padding
                                isFocused
                                    ? 'border-blue-500 ring-2 ring-blue-500'
                                    : 'border-gray-300 dark:border-gray-600',
                                'hover:border-blue-500'
                            ),

                        // Dropdown Indicator (the arrow)
                        dropdownIndicator: () =>
                            clsx(
                                'flex items-center pr-2', // padding right
                                'text-gray-500 dark:text-gray-400'
                            ),

                        // Value Container (where the selected value appears)
                        valueContainer: () =>
                            clsx(
                                'flex flex-1 flex-wrap items-center gap-1',
                                'px-2' // horizontal padding
                            ),

                        // Input (the text input inside the select)
                        input: () =>
                            clsx('text-gray-900 dark:text-gray-200', 'm-0 p-0'),

                        // Menu (the dropdown menu)
                        menu: () =>
                            clsx(
                                'absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg',
                                'max-h-60 overflow-auto'
                            ),

                        // Option (each item in the dropdown)
                        option: ({ isFocused, isSelected }) =>
                            clsx(
                                'cursor-pointer select-none relative py-3 px-4',
                                isSelected
                                    ? 'bg-blue-500 text-white'
                                    : isFocused
                                    ? 'bg-blue-100 dark:bg-[#101010]'
                                    : 'bg-white dark:bg-[#191919] text-gray-900 dark:text-gray-200'
                            ),

                        // Single Value (the selected value displayed)
                        singleValue: () =>
                            clsx('text-gray-900 dark:text-gray-200'),

                        // Placeholder (the placeholder text)
                        placeholder: () =>
                            clsx('text-gray-500 dark:text-gray-400'),

                        // Indicators Container (holds dropdown and clear indicators)
                        indicatorsContainer: () => clsx('flex items-center'),

                        // Indicator Separator (the divider between value and indicators)
                        indicatorSeparator: () =>
                            clsx('bg-gray-300 dark:bg-white h-5 mx-1'),
                    }}
                />
            </div>
        </div>
    )
}
