import * as React from 'react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
// If using shadcn/ui utilities:
// import { cn } from "@/lib/utils";

interface BreadcrumbProps {
    title: string
    parent: string
}

export default function Breadcrumb({ title, parent }: BreadcrumbProps) {
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
                                    Home
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
