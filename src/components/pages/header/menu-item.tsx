import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

interface MenuItemProps {
    handleClick: () => void
    text: string
    link: string
}
export const MenuItem = ({ link, text, handleClick }: MenuItemProps) => {
    const { t } = useTranslation()
    return (
        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
            <NavLink
                to={link}
                onClick={handleClick}
                className={({ isActive, isPending }) =>
                    isPending
                        ? 'pending'
                        : isActive
                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                }
            >
                {t(text)}
            </NavLink>
        </li>
    )
}
