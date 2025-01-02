import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
type DateColors =
    | 'success'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'error'
    | 'default'
    | 'warning'
    | null
    | undefined

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
    console.log(args.defaultColor)
    return args.defaultColor ?? 'success'
}
export const getDateColorAsHex = (date: string) => {
    const givenDate = dayjs(date)
    const today = dayjs()
    if (givenDate.isBefore(today)) {
        return '#d6293e'
    }
    if (givenDate.isBefore(today.add(3, 'day'))) {
        return '#f7c32e'
    }
    return '#0cbc87'
}

export const getRandomColorFromString = (
    text: string
): { backgroundColor: string; textColor: string } => {
    const colors = [
        '#d6293e', // Red
        '#4f9ef8', // Blue
        '#0cbc87', // Green
        '#f7c32e', // Yellow
    ]

    // Generate a consistent hash based on the input text
    let hash = 0
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
    }
    const index = ((hash % colors.length) + colors.length) % colors.length
    const baseColor = colors[index]

    // Helper function to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number): string => {
        const bigint = parseInt(hex.slice(1), 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    // Set background color with 0.1 opacity and text color with full opacity
    const backgroundColor = hexToRgba(baseColor, 0.1)
    const textColor = baseColor

    return { backgroundColor, textColor }
}

export const getNameInitials = (name: string, count = 2) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
    const filtered = initials.replace(/[^a-zA-Z]/g, '')
    return filtered.slice(0, count).toUpperCase()
}
