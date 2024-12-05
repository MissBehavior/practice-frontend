import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const mockdata = [
    {
        id: 1,
        name: 'Andrius',
        role: "Group's manager",
        text: 'I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.',
        roleLt: 'Grupės vadovas',
        textLt: 'Su „WinBAS“ esu beveik nuo pirmųjų įmonės žingsnių. Mane įkvepia darbas su žmonėmis – sukaupta patirtis ir žinios suteikia galimybę padėti jaunesniems kolegoms, kurie savo pirmuosius žingsnius tarptautinėje kompanijoje pradeda žengti tik dabar. Be to, tai puiki proga pažinti skandinavų kultūrą.',
        imgUrl: '/people/Andrius-1.png',
    },
    {
        id: 2,
        name: 'Marius',
        role: 'Estimator, CAD designer',
        text: 'I have never experienced such kindness and attention when it comes to solving everyday issues as it is here, at WinBas. These qualities and attitude come both from team members and from the managers, which motivates me to do my best at every task. Moreover, the business trips, refresher trainings and company’s events & surprises, as well as the smiles of team members make you enjoy and appreciate time spent here.',
        roleLt: 'Sąmatininkas, CAD dizaineris',
        textLt: 'Niekur kitur neteko susidurti su tokiu geranoriškumu ir dėmesiu sprendžiant iškilusias problemas: tiek iš komandos narių, tiek iš vadovų. Tai mane motyvuoja atlikti savo darbą dar geriau. O komandiruotės, tobulinimosi kursai, įmonės šventės, staigmenos ir žmonių šypsenos verčia džiaugtis ir vertinti čia praleistą laiką.',

        imgUrl: '/people/Marius-1.png',
    },
    {
        id: 3,
        name: 'Povilas',
        role: 'Estimator',
        text: 'Strong values that WinBas represents act as one of the main advantages to work here. We have high-level professionals, therefore I feel great knowing I can trust people I work with every day.',
        roleLt: 'Sąmatininkas',
        textLt: 'Stiprios vertybės, kurioms atstovauja „WinBAS“ yra tai, kas daro mūsų biurą puikia darbo vieta. Čia dirba profesionalai, todėl jaučiuosi puikiai ir galiu pasitikėti žmonėmis, su kuriais dirbu kiekvieną dieną.',

        imgUrl: '/people/povilas-1.png',
    },
    {
        id: 4,
        name: 'Julia',
        role: 'Traffic Administrator, Marketing Specialist',
        text: 'I enjoy working in the company where I can boldly express my opinion and implement new ideas. Working with a team here at WinBas is special in the way that each of us have the opportunity to share our experiences: we are being listened to; we can advise each other and solve problems together. Therefore, we strive for the best results and successfully cooperate and grow as a team.',
        roleLt: 'Srauto administratorė, marketingo specialistė',
        textLt: 'Džiaugiuosi dirbdama įmonėje, kurioje galiu drąsiai reikšti savo nuomonę ir įgyvendinti idėjas. Darbas su komanda ypatingas tuo, kad kiekvienas turime galimybę dalintis savo patirtimi, esame išklausyti, galime patarti, sprendžiame problemas bei siekiame geriausių rezultatų. Čia sėkmingai bendradarbiaujame ir tobulėjame kartu.',
        imgUrl: '/people/IMG_9677-1.png',
    },
    {
        id: 5,
        name: 'Mingaudas',
        role: 'Senior financial cost estimator, constructor',
        text: 'The most motivating activity for me is the processes & their optimization. I enjoy that here I make a significant contribution to improving efficiency and helping the team to move forward.',
        roleLt: 'Vyresnysis sąmatininkas, konstruktorius',
        textLt: 'Mane labiausiai motyvuojanti veikla – procesai ir jų optimizavimas. Čia aš reikšmingai prisidedu prie efektyvumo tobulinimo ir padedu komandai žengti pirmyn.',
        imgUrl: '/people/IMG_9748-1.png',
    },
]

const Team: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full">
                <Tabs>
                    {mockdata.map((person) => (
                        <TabPanel key={person.id}>
                            <div className="text-center">
                                <div className="max-w-5xl mx-auto">
                                    <p className="text-2xl text-white font-bold">
                                        {person.text}
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <h6 className="text-xl font-sans text-white uppercase">
                                        <span>{person.name} </span>-{' '}
                                        <span className="text-gray-400">
                                            {person.role}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </TabPanel>
                    ))}

                    <TabList className="flex justify-center flex-wrap mt-12">
                        {mockdata.map((person) => (
                            <Tab
                                key={person.id}
                                className="mx-2 cursor-pointer"
                            >
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition duration-300">
                                    <img
                                        src={person.imgUrl}
                                        alt={`${person.name} Profile`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>
            </div>
        </div>
    )
}

export default Team
