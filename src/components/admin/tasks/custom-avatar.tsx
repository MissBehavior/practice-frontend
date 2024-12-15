import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getNameInitials, getRandomColorFromString } from '@/lib/utils'
import { FaUser } from 'react-icons/fa'
import { cn } from '@/lib/utils' // Utility function for combining class names

type Props = {
    name?: string
    src?: string
    alt?: string
    size?: 'xsmall' | 'small' | 'medium' | 'large'
    className?: string
    style?: React.CSSProperties
}

const sizeClasses = {
    xsmall: 'h-4 w-4 text-xs',
    small: 'h-8 w-8 text-sm',
    medium: 'h-10 w-10 text-base',
    large: 'h-12 w-12 text-lg',
}

const CustomAvatarComponent = (
    { name = '', src, alt, size = 'medium', className }: Props,
    ref: React.Ref<HTMLSpanElement>
) => {
    const initials = getNameInitials(name)
    const backgroundColor = src ? 'transparent' : getRandomColorFromString(name)
    const sizeClass = sizeClasses[size]

    return (
        <span
            ref={ref}
            className={cn(
                'flex items-center justify-center',
                sizeClass,
                className
            )}
        >
            <Avatar className="flex items-center justify-center">
                {src ? (
                    <AvatarImage
                        src={src}
                        alt={alt || name}
                        className="bg-muted"
                    />
                ) : (
                    <AvatarFallback>
                        {initials || (
                            <FaUser className="h-4 w-4 text-gray-500" />
                        )}
                    </AvatarFallback>
                )}
            </Avatar>
        </span>
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
