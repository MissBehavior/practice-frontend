import React, { useState, useEffect } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { Task } from '@/types'
import axios from 'axios'
import Select from 'react-select'
import { Skeleton } from '@/components/ui/skeleton'

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
        <div className="flex items-center justify-between p-4 border-b  shadow-sm">
            <div className="flex items-center w-full">
                <AiOutlineFlag className="mr-3 text-gray-600" size={24} />

                <Select
                    value={selectedStage}
                    onChange={handleStageChange}
                    options={stages}
                    placeholder="Select Stage"
                    className="w-56"
                    classNamePrefix="react-select"
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            minHeight: '2.5rem',
                            height: '2.5rem',
                            borderColor: state.isFocused
                                ? '#4F46E5'
                                : '#D1D5DB',
                            boxShadow: state.isFocused
                                ? '0 0 0 1px #4F46E5'
                                : provided.boxShadow,
                            '&:hover': {
                                borderColor: '#4F46E5',
                            },
                        }),
                        dropdownIndicator: (provided) => ({
                            ...provided,
                            padding: '0 8px',
                        }),
                        clearIndicator: (provided) => ({
                            ...provided,
                            padding: '0 8px',
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            padding: '0 8px',
                        }),
                        input: (provided) => ({
                            ...provided,
                            margin: '0px',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            borderRadius: '0.5rem',
                            marginTop: '0.25rem',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            padding: '0.75rem 1rem',
                            backgroundColor: state.isSelected
                                ? '#4F46E5'
                                : state.isFocused
                                ? '#EEF2FF'
                                : '#FFFFFF',
                            color: state.isSelected ? '#FFFFFF' : '#374151',
                            cursor: 'pointer',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#374151',
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: '#9CA3AF',
                        }),
                    }}
                />
            </div>
        </div>
    )
}
