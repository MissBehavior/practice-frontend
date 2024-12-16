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
    const { t } = useTranslation()
    const textTranslations = {
        lt1: `Esame auganti atsidavusių talentų komanda, teikianti inžinerinę pagalbą ir sprendimus verslui: apskaičiuojame projekto sąmatas, apdorojame užsakymus, ruošiame CAD brėžinius,  planuojame gamybą ir siūlome IT paslaugas, pritaikytas Jūsų verslo poreikiams. Įkurta  2002 m. Skandinavijos langų ir durų rinkos lyderio, nuolat tobuliname savo procesus ir plečiame paslaugų sritis. Naujos idėjos ir jų įgyvendinimas yra įdomi mūsų verslo veiklos dalis. Darbas tarptautinėje aplinkoje leidžia mums surinkti vertingų žinių iš skirtingų verslo ir kultūrinių kontekstų. Nesvarbu, ar esate klientas, ar darbuotojas – leiskite mums tapti Jūsų sėkmės istorijos dalimi.`,
        lt2: `Winbas yra pirmas ir vienintelis oficialus atstovas prekiaujantis danų gamintojo – Outline langais ir durimis Lietuvoje. Kokybiški mediniai ar mediniai kaustyti aliuminiu langai iš Danijos – puiki investicija Jūsų namams. Per daugiau nei 30 metų gamybos sukaupta patirtis leidžia klientams pasiūlyti tinkamiausius architektūrinius ir dizaino sprendinius, kurie užtikrina aukščiausią energetinį efektyvumą.

        Outline siūlo didelę konstrukcinę įvairovę. Į išorę ar į vidų atsidarantys langai, skirtinga spalvinė paletė, galimybė derinti langų ir durų aksesuarus prie jūsų intrerjero.
        
        Outline – Langai ir durys sukurti Jūsų namams!
        
        Daugiau informacijos apie produktus rasite paspaudę nuorodą:`,
        en1: `We are a growing team of dedicated talents providing
        engineering assistance & solutions for business: we
        calculate project’s estimates, process orders, prepare CAD
        drawings, as well as plan production and offer IT services
        specifically tailored to your business needs. Founded in
        2002 by the Scandinavian window and door market leader, we
        continuously improve our processes and expand areas of our
        services. New ideas and their implementation is an exciting
        part of the way our business operates. Working in the
        international environment allows us to collect valuable know
        - how from the different business and cultural contexts.
        Whether you are a customer or employee – let us be a part of
        your success story.`,
        en2: `Winbas is the first and only official representative trading
        Danish manufacturer – Outline windows and doors in
        Lithuania. High-quality wooden or wood-clad aluminum windows
        from Denmark are an excellent investment for your home. With
        over 30 years of manufacturing experience, accumulated
        experience allows us to offer customers the most suitable
        architectural and design solutions that ensure the highest
        energy efficiency. Outline offers a wide range of designs.
        Windows opening to the outside or inside, a variety of
        colors, the possibility to match window and door accessories
        to your interior. Outline – Windows and doors designed for
        your home! You can find more information about the products
        by clicking on the link.:`,
        sendRequest: `Send request`,
        tel: `Tel. +37060658526`,
        sendRequestlt: `Siųsti užklausą`,
    }

    return (
        <>
            <div className="dark:bg-[#191919] bg-slate-300">
                <SliderOne />
            </div>
            <div className="dark:bg-[#191919] bg-slate-300">
                <About />
            </div>
            <div
                className="pt-32 pb-32 dark:bg-[#101010] bg-slate-500"
                id="servicesid"
            >
                <div className="container">
                    <Service />
                </div>
            </div>
            <div className="py-28 dark:bg-[#191919] bg-slate-300">
                <div className="mb-14">
                    <Solutions />
                </div>
            </div>

            <div className="pt-32 pb-32 dark:bg-[#101010] bg-slate-500">
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
            <div className="pt-28 pb-28 dark:bg-[#191919] bg-slate-300">
                <div className="container mx-auto">
                    <Team />
                </div>
            </div>

            <div className="pb-28 dark:bg-[#101010] bg-slate-500">
                <div className="mb-14">
                    <NewsHome />
                </div>
            </div>

            <div className="pb-28 dark:bg-[#101010] bg-slate-300">
                <div className="container mx-auto">
                    <Clients />
                </div>
            </div>
        </>
    )
}
