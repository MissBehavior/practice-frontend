import * as React from 'react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './admin/custom/button'
import { Search } from 'lucide-react'
import { HiMiniXMark } from 'react-icons/hi2'
import i18n from '@/i18n/config'
import { useTranslation } from 'react-i18next'

interface BreadcrumbProps {
    title: string
    parent: string
    search?: boolean
    onSearch?: (query: string) => void
    currentQuery?: string
}

const Breadcrumb: FC<BreadcrumbProps> = ({
    title,
    parent,
    search = false,
    onSearch,
    currentQuery,
}) => {
    const [searchQuery, setSearchQuery] = React.useState(currentQuery || '')
    const { t } = useTranslation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle the search logic here
        console.log('Search Query:', searchQuery)
        if (onSearch) {
            console.log('Search Query ONSEARCH TRUE:', searchQuery)
            onSearch(searchQuery)
        }
    }

    const handleClear = () => {
        setSearchQuery('')
        if (onSearch) onSearch('')
    }
    React.useEffect(() => {
        setSearchQuery(currentQuery || '')
    }, [currentQuery])
    if (search) {
        return (
            <div
                className="relative bg-gray-800 py-24 text-center text-white"
                style={{
                    backgroundImage: `url('/imagebg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative container mx-auto px-4">
                    <div className="pt-10">
                        {/* Title */}
                        <h2 className="text-5xl font-bold mb-4">{title}</h2>

                        {/* Search Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="relative w-1/2 md:w-1/4 mx-auto mt-6"
                        >
                            {/* Search Icon as a button */}
                            <button
                                type="submit"
                                aria-label="Search"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white focus:outline-none"
                            >
                                <Search className="h-5 w-5" />
                            </button>

                            {/* Input Field */}
                            <Input
                                type="text"
                                placeholder={
                                    i18n.language === 'en'
                                        ? 'Search...'
                                        : 'Paieška...'
                                }
                                className="pl-10 pr-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {/* Clear Search Icon */}
                            {searchQuery && (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={handleClear}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white focus:outline-none"
                                >
                                    <HiMiniXMark className="h-5 w-5" />
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={'relative bg-gray-800 py-24 text-center text-white'}
            style={{
                backgroundImage: `url('/imagebg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative container mx-auto px-4">
                <div className="pt-10">
                    {/* Title */}
                    <h2 className="text-5xl font-bold mb-4">{title}</h2>
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center space-x-2 text-base">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    {i18n.language === 'en'
                                        ? 'Home'
                                        : 'Pagrindinis'}
                                </Link>
                            </li>

                            <li className="text-gray-400">
                                <span className="mx-2 text-white">/</span>
                                <span className="text-red-600">{parent}</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb
