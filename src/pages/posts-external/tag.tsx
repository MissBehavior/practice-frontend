// components/Tag.tsx
import React from 'react'
import { getRandomColorFromString } from '../../lib/utils'

interface TagProps {
    name: string
}

const Tag: React.FC<TagProps> = ({ name }) => {
    const { backgroundColor, textColor } = getRandomColorFromString(name)

    return (
        <span
            className="px-2 py-1 rounded text-sm font-semibold hover:contrast-200"
            style={{
                backgroundColor,
                color: textColor,
            }}
        >
            {name}
        </span>
    )
}

export default Tag
