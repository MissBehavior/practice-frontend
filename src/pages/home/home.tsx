import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'
import SliderOne from './sliderone'
import About from './about'
import Service from './service'
import FunFacts from './funfacts'
import Team from './team'
import Clients from './clients'
import Solutions from './solutions'
import NewsHome from './news'

export default function Home() {
    return (
        <>
            <div className="dark:bg-[#191919] bg-[#f2f2f2]">
                <SliderOne />
            </div>
            <div className="dark:bg-[#101010] bg-[#f2f2f2]">
                <About />
            </div>
            <div
                className="pt-32 pb-32 dark:bg-[#191919] bg-[#ffffff]"
                id="servicesid"
            >
                <div className="container">
                    <Service />
                </div>
            </div>
            <div className="py-28 dark:bg-[#101010] bg-[#f2f2f2]">
                <div className="mb-14">
                    <Solutions />
                </div>
            </div>

            <div className="pt-32 pb-32 dark:bg-[#191919] bg-[#ffffff]">
                <div className="container mx-auto">
                    <div className="flex justify-center mb-8">
                        <div className="w-full text-center">
                            <h3 className="text-5xl font-extrabold dark:text-white text-gray-800">
                                {i18n.language === 'en'
                                    ? 'Our Fun Facts'
                                    : 'Mūsų įdomūs faktai'}
                            </h3>
                        </div>
                    </div>
                    <FunFacts />
                </div>
            </div>
            <div className="pt-28 pb-28 dark:bg-[#101010] bg-[#f2f2f2]">
                <div className="container mx-auto">
                    <Team />
                </div>
            </div>

            <div className="pb-28 dark:bg-[#191919] bg-[#ffffff]">
                <NewsHome />
            </div>

            <div className="pb-28 dark:bg-[#101010] bg-[#f2f2f2]">
                <div className="container mx-auto">
                    <Clients />
                </div>
            </div>
        </>
    )
}
