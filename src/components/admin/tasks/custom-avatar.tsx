import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getNameInitials, getRandomColorFromString } from '@/lib/utils'
import { FaUser } from 'react-icons/fa'
import { cn } from '@/lib/utils' // Utility function for combining class names

type Props = {
    name?: string
    src?: string
    alt?: string
    size?: 'small' | 'medium' | 'large'
    className?: string
    style?: React.CSSProperties
}

const sizeClasses = {
    small: 'h-8 w-8 text-sm',
    medium: 'h-10 w-10 text-base',
    large: 'h-12 w-12 text-lg',
}

const CustomAvatarComponent = (
    { name = '', src, alt, size = 'medium', className, style }: Props,
    ref: React.Ref<HTMLSpanElement>
) => {
    const initials = getNameInitials(name)
    const backgroundColor = src ? 'transparent' : getRandomColorFromString(name)
    const sizeClass = sizeClasses[size]

    return (
        <Avatar
            ref={ref}
            className={cn(
                'flex items-center justify-center',
                sizeClass,
                className
            )}
            style={{ backgroundColor, ...style }}
        >
            {src ? (
                <AvatarImage src={src} alt={alt || name} />
            ) : (
                <AvatarFallback>
                    {initials || <FaUser className="h-4 w-4 text-gray-500" />}
                </AvatarFallback>
            )}
        </Avatar>
    )
}

export const CustomAvatar = React.memo(
    React.forwardRef<HTMLSpanElement, Props>(CustomAvatarComponent),
    (prevProps, nextProps) => {
        return (
            prevProps.name === nextProps.name &&
            prevProps.src === nextProps.src &&
            prevProps.size === nextProps.size &&
            prevProps.className === nextProps.className
        )
    }
)
