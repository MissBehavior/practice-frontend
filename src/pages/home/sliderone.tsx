import React from 'react'
import ServiceOne from './serviceone'
import postExternalImg from '/cropped-Featured-picture-1.jpg'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import {
    Container,
    ISourceOptions,
    MoveDirection,
    OutMode,
} from '@tsparticles/engine'

function SliderOne() {
    const [init, setInit] = useState(false)
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
                                Company that redefines
                                <h1 className="text-indigo-400">
                                    {' '}
                                    Creating windows
                                </h1>
                            </h1>
                            <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex ">
                                <a
                                    href="#"
                                    className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
                                >
                                    Contact Us
                                </a>
                                <a
                                    href="#servicesid"
                                    className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
                                >
                                    Check Our Services
                                </a>
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
