import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type DateColors = 'success' | 'processing' | 'error' | 'default' | 'warning'

export const getDateColor = (args: {
    date: string
    defaultColor?: DateColors
}): DateColors => {
    const date = dayjs(args.date)
    const today = dayjs()

    if (date.isBefore(today)) {
        return 'error'
    }

    if (date.isBefore(today.add(3, 'day'))) {
        return 'warning'
    }

    return args.defaultColor ?? 'default'
}

export const getRandomColorFromString = (text: string) => {
    const colors = [
        '#ff9c6e',
        '#ff7875',
        '#ffc069',
        '#ffd666',
        '#fadb14',
        '#95de64',
        '#5cdbd3',
        '#69c0ff',
        '#85a5ff',
        '#b37feb',
        '#ff85c0',
    ]

    let hash = 0
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
    }
    hash = ((hash % colors.length) + colors.length) % colors.length

    return colors[hash]
}

export const getNameInitials = (name: string, count = 2) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
    const filtered = initials.replace(/[^a-zA-Z]/g, '')
    return filtered.slice(0, count).toUpperCase()
}
