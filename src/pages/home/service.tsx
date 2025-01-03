import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCast, FiLayers, FiUsers, FiMonitor } from 'react-icons/fi'
import i18n from '@/i18n/config'
import { Link } from 'react-router-dom'

type ServiceItem = {
    icon: JSX.Element
    title: string
    titleLT: string
    description: string
    descriptionLT: string
}

const ServiceList: ServiceItem[] = [
    {
        icon: <FiCast className="text-4xl text-blue-600" />,
        title: 'The client always comes first',
        titleLT: 'Pirmiausia – Klientas',
        description:
            'Our goal is to understand the expectations of our clients and meet their needs on a highest level. As a company, we achieve these results by investing our energy and time, and taking each business case with respect, honesty and clarity.',
        descriptionLT:
            'Mūsų tikslas – suprasti kliento lūkesčius bei patenkinti jo poreikius. Tai darome investuodami savo energiją ir laiką, elgdamiesi pagarbiai ir sąžiningai.',
    },
    {
        icon: <FiLayers className="text-4xl text-blue-600" />,
        title: 'Courage to improve',
        titleLT: 'Drąsa tobulėti',
        description:
            'We are initiative and proactive – with an innovative mindset and openness to innovation, we aim to find and offer our clients the best solutions.',
        descriptionLT:
            'Mes esame iniciatyvūs – pasitelkdami pažangią mąstyseną bei atvirumą naujovėms siekiame rasti ir pasiūlyti klientams geriausius sprendimus.',
    },
    {
        icon: <FiUsers className="text-4xl text-blue-600" />,
        title: 'Competence and teamwork',
        titleLT: 'Kompetentingi žmonės visada šalia',
        description:
            'Having competent people in our company, we strive to inspire by encouraging our employees to share their knowledge with each other and work in teams. This way we create a motivating and trust – based working environment for everybody. We also cherish honest feedback, which is an essential part of company’s success.',
        descriptionLT:
            'Turėdami tinkamas kompetencijas turinčių žmonių siekiame įkvėpti tobulėti. Skatiname darbuotojus dalintis žiniomis ir dirbti komandose – tokiu būdu kuriame motyvuojančią ir pasitikėjimu vieni kitais grįstą darbinę aplinką. Teikiame sąžiningą ir atvirą grįžtamąjį ryšį.',
    },
]

const Service: React.FC = () => {
    const { t } = useTranslation()
    const title = 'Vision'
    const titleLT = 'Vizija'
    const description =
        'To be the strongest link in a business chain through smart engineering assistance & solutions.'
    const descriptionLT =
        'Būti stipriausia jungtimi verslo grandinėje teikiant klientams išmanias inžinerines paslaugas ir sprendimus.'
    const title2 = 'Mission'
    const title2LT = 'Misija'
    const description2 = 'To back your way up to success'
    const description2LT = 'Užtikrinti jūsų sėkmę.'

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/3">
                    <div className="mt-8 lg:mt-0">
                        <h2 className="text-3xl font-bold dark:text-white text-[#2A2A2A]">
                            {i18n.language === 'en' ? title : titleLT}
                        </h2>
                        <p className="mt-4 dark:text-gray-400 text-[#2A2A2A]">
                            {i18n.language === 'en'
                                ? description
                                : descriptionLT}
                        </p>
                        <h2 className="mt-8 text-3xl font-bold dark:text-white text-[#2A2A2A]">
                            {i18n.language === 'en' ? title2 : title2LT}
                        </h2>
                        <p className="mt-4 dark:text-gray-400 text-[#2A2A2A]">
                            {i18n.language === 'en'
                                ? description2
                                : description2LT}
                        </p>
                        <div className="mt-6">
                            <a
                                className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                href="mailto:info@winbas.eu"
                            >
                                {t('request_custom_service')}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
                    <div className="flex flex-wrap">
                        {ServiceList.map((val, i) => (
                            <div className="w-full sm:w-1/2 p-4" key={i}>
                                <Link to="/solutions">
                                    <div className="flex items-start  dark:hover:bg-gray-700 hover:bg-slate-300 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg p-4">
                                        <div className="mr-4">{val.icon}</div>
                                        <div>
                                            <h3 className="text-xl font-semibold dark:text-white text-[#2A2A2A]">
                                                {i18n.language === 'en'
                                                    ? val.title
                                                    : val.titleLT}
                                            </h3>
                                            <p className="mt-2 dark:text-gray-400 text-[#2A2A2A]">
                                                {i18n.language === 'en'
                                                    ? val.description
                                                    : val.descriptionLT}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service
