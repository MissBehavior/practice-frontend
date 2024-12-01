import i18n from '@/i18n/config'
import classNamees from './people.module.css'
import { useEffect } from 'react'
import { useTranslation, I18nContext } from 'react-i18next'
const mockdata = [
    {
        name: 'Andrius',
        role: "Group's manager",
        text: 'I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.',
        roleLt: 'Grupės vadovas',
        textLt: 'Su „WinBAS“ esu beveik nuo pirmųjų įmonės žingsnių. Mane įkvepia darbas su žmonėmis – sukaupta patirtis ir žinios suteikia galimybę padėti jaunesniems kolegoms, kurie savo pirmuosius žingsnius tarptautinėje kompanijoje pradeda žengti tik dabar. Be to, tai puiki proga pažinti skandinavų kultūrą.',
        imgUrl: '/people/Andrius-1.png',
    },
    {
        name: 'Marius',
        role: 'Estimator, CAD designer',
        text: 'I have never experienced such kindness and attention when it comes to solving everyday issues as it is here, at WinBas. These qualities and attitude come both from team members and from the managers, which motivates me to do my best at every task. Moreover, the business trips, refresher trainings and company’s events & surprises, as well as the smiles of team members make you enjoy and appreciate time spent here.',
        roleLt: 'Sąmatininkas, CAD dizaineris',
        textLt: 'Niekur kitur neteko susidurti su tokiu geranoriškumu ir dėmesiu sprendžiant iškilusias problemas: tiek iš komandos narių, tiek iš vadovų. Tai mane motyvuoja atlikti savo darbą dar geriau. O komandiruotės, tobulinimosi kursai, įmonės šventės, staigmenos ir žmonių šypsenos verčia džiaugtis ir vertinti čia praleistą laiką.',

        imgUrl: '/people/Marius-1.png',
    },
    {
        name: 'Povilas',
        role: 'Estimator',
        text: 'Strong values that WinBas represents act as one of the main advantages to work here. We have high-level professionals, therefore I feel great knowing I can trust people I work with every day.',
        roleLt: 'Sąmatininkas',
        textLt: 'Stiprios vertybės, kurioms atstovauja „WinBAS“ yra tai, kas daro mūsų biurą puikia darbo vieta. Čia dirba profesionalai, todėl jaučiuosi puikiai ir galiu pasitikėti žmonėmis, su kuriais dirbu kiekvieną dieną.',

        imgUrl: '/people/povilas-1.png',
    },
    {
        name: 'Julia',
        role: 'Traffic Administrator, Marketing Specialist',
        text: 'I enjoy working in the company where I can boldly express my opinion and implement new ideas. Working with a team here at WinBas is special in the way that each of us have the opportunity to share our experiences: we are being listened to; we can advise each other and solve problems together. Therefore, we strive for the best results and successfully cooperate and grow as a team.',
        roleLt: 'Srauto administratorė, marketingo specialistė',
        textLt: 'Džiaugiuosi dirbdama įmonėje, kurioje galiu drąsiai reikšti savo nuomonę ir įgyvendinti idėjas. Darbas su komanda ypatingas tuo, kad kiekvienas turime galimybę dalintis savo patirtimi, esame išklausyti, galime patarti, sprendžiame problemas bei siekiame geriausių rezultatų. Čia sėkmingai bendradarbiaujame ir tobulėjame kartu.',
        imgUrl: '/people/IMG_9677-1.png',
    },
    {
        name: 'Mingaudas',
        role: 'Senior financial cost estimator, constructor',
        text: 'The most motivating activity for me is the processes & their optimization. I enjoy that here I make a significant contribution to improving efficiency and helping the team to move forward.',
        roleLt: 'Vyresnysis sąmatininkas, konstruktorius',
        textLt: 'Mane labiausiai motyvuojanti veikla – procesai ir jų optimizavimas. Čia aš reikšmingai prisidedu prie efektyvumo tobulinimo ir padedu komandai žengti pirmyn.',
        imgUrl: '/people/IMG_9748-1.png',
    },
]
export default function People() {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex flex-wrap justify-center gap-4 items-start bg-white dark:bg-background">
                {mockdata.map((person, index) => (
                    <div
                        key={index}
                        className="mt-16 mb-12  flex justify-center items-center lg:w-1/3 sm:w-full  xl:w-1/3 2xl:w-1/4"
                    >
                        <div className="flex flex-col justify-start min-h-[750px] sm:w-full md:w-96 p-6 bg-white dark:bg-slate-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500 text-center items-center">
                            <img
                                className="w-64 object-cover rounded-t-md select-none"
                                src={person.imgUrl}
                                alt=""
                                draggable="false"
                            />
                            <div className="mt-4">
                                <h1 className="text-[20px] font-bold text-gray-700 dark:text-white">
                                    {person.name}
                                </h1>
                                <p className="text-base mt-2 text-[#007bff] dark:text-[#007bff]">
                                    {i18n.language === 'lt'
                                        ? person.roleLt
                                        : person.role || i18n.language === 'en'
                                        ? person.role
                                        : person.roleLt}
                                </p>
                                <p className="text-lg mt-2 text-gray-700 w-full text-justify dark:text-white">
                                    {i18n.language === 'lt'
                                        ? person.textLt
                                        : person.text}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className={classNamees.maindiv}>
                    <div className="">
                        <img
                            className=""
                            src="https://images.unsplash.com/photo-1509223197845-458d87318791"
                            alt=""
                        />
                        <div className="">
                            <h1 className={classNamees.textBold}>TestPerson</h1>
                            <p className={classNamees.textRole}>Test Role</p>
                            <p className={classNamees.text}>Test Text</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}
