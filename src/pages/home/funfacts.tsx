import React, { useState } from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import i18n from '@/i18n/config'
import { useTranslation } from 'react-i18next'

type CounterData = {
    countNum: number
    countTitle: string
    countTitleLT: string
}

const FunFacts: React.FC = () => {
    const [didViewCountUp, setDidViewCountUp] = useState(false)
    const { t } = useTranslation()

    const onVisibilityChange = (isVisible: boolean) => {
        if (isVisible) {
            setDidViewCountUp(true)
        }
    }

    const Data: CounterData[] = [
        {
            countNum: 15,
            countTitle:
                'Trusted clients across Europe rely on us to deliver exceptional solutions and services for their businesses.',
            countTitleLT:
                'Patikimi klientai visoje Europoje pasitiki mumis, kad suteiktume išskirtinius sprendimus ir paslaugas jų verslui.',
        },
        {
            countNum: 1000,
            countTitle:
                'Projects successfully completed every year, showcasing our commitment to quality and efficiency.',
            countTitleLT:
                'Kasmet sėkmingai įgyvendinami projektai atspindi mūsų įsipareigojimą kokybei ir efektyvumui.',
        },
        {
            countNum: 50,
            countTitle:
                'Skilled team members dedicated to ensuring every project meets the highest standards of excellence.',
            countTitleLT:
                'Kvalifikuoti komandos nariai, pasiryžę užtikrinti, kad kiekvienas projektas atitiktų aukščiausius standartus.',
        },
    ]

    return (
        <div className="flex flex-wrap -mx-4">
            {Data.map((value, index) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8" key={index}>
                    <div className="text-center">
                        <h5 className="text-5xl font-medium dark:text-white text-gray-700 after:content-['+']">
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
                        <p className="mt-4 dark:text-gray-400 text-gray-700">
                            {i18n.language === 'en'
                                ? value.countTitle
                                : value.countTitleLT}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FunFacts
