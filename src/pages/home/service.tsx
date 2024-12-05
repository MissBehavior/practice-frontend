import React from 'react'
import { FiCast, FiLayers, FiUsers, FiMonitor } from 'react-icons/fi'

type ServiceItem = {
    icon: JSX.Element
    title: string
    description: string
}

const ServiceList: ServiceItem[] = [
    {
        icon: <FiCast className="text-4xl text-blue-600" />,
        title: 'Business Strategy',
        description:
            'I throw myself down among the tall grass by the stream as I lie close to the earth.',
    },
    {
        icon: <FiLayers className="text-4xl text-blue-600" />,
        title: 'Website Development',
        description:
            'I throw myself down among the tall grass by the stream as I lie close to the earth.',
    },
    {
        icon: <FiUsers className="text-4xl text-blue-600" />,
        title: 'Marketing & Reporting',
        description:
            'I throw myself down among the tall grass by the stream as I lie close to the earth.',
    },
    {
        icon: <FiMonitor className="text-4xl text-blue-600" />,
        title: 'Mobile App Development',
        description:
            'I throw myself down among the tall grass by the stream as I lie close to the earth.',
    },
]

const Service: React.FC = () => {
    const title = 'Services'
    const description =
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.'

    return (
        <>
            <div className="flex flex-wrap">
                {/* Left Column */}
                <div className="w-full lg:w-1/3">
                    <div className="mt-8 lg:mt-0">
                        <h2 className="text-3xl font-bold text-white">
                            {title}
                        </h2>
                        <p className="mt-4 text-gray-400">{description}</p>
                        <div className="mt-6">
                            <a
                                className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                href="/service"
                            >
                                Request Custom Service
                            </a>
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
                    <div className="flex flex-wrap">
                        {ServiceList.map((val, i) => (
                            <div className="w-full sm:w-1/2 p-4" key={i}>
                                <a href="/service-details">
                                    <div className="flex items-start">
                                        <div className="mr-4">{val.icon}</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                {val.title}
                                            </h3>
                                            <p className="mt-2 text-gray-400">
                                                {val.description}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service
