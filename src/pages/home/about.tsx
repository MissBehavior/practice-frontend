import React from 'react'
import aboutImg from '/traehus-vinduer-og-doere6.jpg'

const About = () => {
    const title = 'About'
    const description =
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum,'

    return (
        <div className=" text-white py-16 relative">
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
                            <p className="text-gray-400 mb-6">{description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* First Info Box */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Who we are
                                </h3>
                                <p className="text-gray-400">
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered.
                                </p>
                            </div>

                            {/* Second Info Box */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Who we are
                                </h3>
                                <p className="text-gray-400">
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered.
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
