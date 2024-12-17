import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import {
    Container,
    ISourceOptions,
    MoveDirection,
    OutMode,
} from '@tsparticles/engine'
import i18n from '@/i18n/config'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SliderOne() {
    const [init, setInit] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine)
            //await loadBasic(engine);
        }).then(() => {
            setInit(true)
        })
    }, [])
    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container)
    }

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push',
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse',
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: '#ffffff',
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            fullScreen: false,
            detectRetina: true,
        }),
        []
    )

    if (init) {
        return (
            <>
                <div className="relative h-1/2 xs:p-10 lg:p-36">
                    <div className="absolute inset-0 bg-[url('/imagebg.jpg')] bg-cover filter brightness-50 scale-105">
                        <Particles
                            className="relative h-full w-full"
                            id="tsparticles"
                            particlesLoaded={particlesLoaded}
                            options={options}
                        />
                    </div>
                    <section className="relative mx-auto max-w-screen-xl pb-12 px-4 items-center flex md:px-8 h-full">
                        <div className="space-y-4 flex-1 sm:text-center ">
                            <h1 className="text-white font-extrabold text-4xl xl:text-7xl uppercase">
                                {i18n.language === 'en'
                                    ? 'Company that redefines'
                                    : 'Įmonė, iš naujo apibrėžianti'}

                                <span className="text-indigo-400">
                                    {' '}
                                    {i18n.language === 'en'
                                        ? 'Creating windows'
                                        : 'langų kūrimą'}
                                </span>
                            </h1>
                            <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto">
                                {i18n.language === 'en'
                                    ? 'High-quality engineering services for windows and doors, including project estimates, CAD drawings, order processing, and production planning.'
                                    : 'Aukštos kokybės langų ir durų inžinerijos paslaugos, įskaitant projektų sąmatas, CAD brėžinius, užsakymų tvarkymą ir gamybos planavimą.'}
                            </p>
                            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex ">
                                <a
                                    href="#"
                                    className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
                                >
                                    {t('contanctUs')}
                                </a>
                                <Link
                                    to="/solutions"
                                    className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
                                >
                                    {t('services')}
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
    return <></>
}

export default SliderOne
