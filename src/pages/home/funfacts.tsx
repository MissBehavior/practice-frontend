import React, { useState } from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

type CounterData = {
    countNum: number
    countTitle: string
}

const FunFacts: React.FC = () => {
    const [didViewCountUp, setDidViewCountUp] = useState(false)

    const onVisibilityChange = (isVisible: boolean) => {
        if (isVisible) {
            setDidViewCountUp(true)
        }
    }

    const Data: CounterData[] = [
        {
            countNum: 199,
            countTitle:
                'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.',
        },
        {
            countNum: 575,
            countTitle:
                'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.',
        },
        {
            countNum: 69,
            countTitle:
                'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those.',
        },
    ]

    return (
        <div className="flex flex-wrap -mx-4">
            {Data.map((value, index) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8" key={index}>
                    <div className="text-center">
                        <h5 className="text-5xl font-medium text-white after:content-['+']">
                            <VisibilitySensor
                                onChange={onVisibilityChange}
                                offset={{ top: 10 }}
                                delayedCall
                            >
                                <CountUp
                                    end={didViewCountUp ? value.countNum : 0}
                                    duration={2}
                                />
                            </VisibilitySensor>
                        </h5>
                        <p className="mt-4 text-gray-400">{value.countTitle}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FunFacts
