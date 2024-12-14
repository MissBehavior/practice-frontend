import React from 'react'
import aboutImg from '/traehus-vinduer-og-doere6.jpg'

const About = () => {
    const title = 'About'
    const description =
        'Winbas is the first and only official representative trading Danish manufacturer – Outline windows and doors in Lithuania. High-quality wooden or wood-clad aluminum windows from Denmark are an excellent investment for your home. With over 30 years of manufacturing experience, accumulated experience allows us to offer customers the most suitable architectural and design solutions that ensure the highest energy efficiency. Outline offers a wide range of designs. Windows opening to the outside or inside, a variety of colors, the possibility to match window and door accessories to your interior.'

    return (
        <div className=" dark:text-white text-gray-800 py-16 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center lg:gap-10 gap-6">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative lg:-mt-52">
                        <div className="rounded-lg overflow-hidden shadow-lg max-w-sm lg:max-w-md mx-auto filter brightness-75">
                            <img
                                className="w-full object-cover"
                                src={aboutImg}
                                alt="About"
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{title}</h2>
                            <p className="dark:text-gray-400 text-gray-800 mb-6">
                                {description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* First Info Box */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Who we are
                                </h3>
                                <p className="dark:text-gray-400 text-gray-800">
                                    We are a growing team of dedicated talents
                                    providing engineering assistance & solutions
                                    for business: we calculate project’s
                                    estimates, process orders, prepare CAD
                                    drawings, as well as plan production and
                                    offer IT services specifically tailored to
                                    your business needs.
                                </p>
                            </div>

                            {/* Second Info Box */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Story
                                </h3>
                                <p className="dark:text-gray-400 text-gray-800">
                                    Founded in 2002 by the Scandinavian window
                                    and door market leader, we continuously
                                    improve our processes and expand areas of
                                    our services. New ideas and their
                                    implementation is an exciting part of the
                                    way our business operates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About
