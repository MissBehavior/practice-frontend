import React from 'react'
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
} from 'react-icons/fa'
import { CiMail } from 'react-icons/ci'
import { AiOutlineFacebook } from 'react-icons/ai'
import { AiOutlineLinkedin } from 'react-icons/ai'

import logo from '/logo.png'

type SocialLink = {
    icon: JSX.Element
    link: string
}

const socialLinks: SocialLink[] = [
    { icon: <CiMail />, link: 'mailto:info@winbas.eu' },
    { icon: <AiOutlineLinkedin />, link: 'https://www.linkedin.com/' },
    { icon: <AiOutlineFacebook />, link: 'https://www.instagram.com/' },
]

const Footer: React.FC = () => {
    return (
        <div className="pt-8 pb-8 bg-[#191919]">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between">
                    {/* Logo */}
                    <div className="w-full sm:w-auto mb-4 sm:mb-0">
                        <div className="flex justify-center sm:justify-start">
                            <a href="/home-one">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-24 bg-slate-200 p-2 rounded"
                                />
                            </a>
                        </div>
                    </div>
                    {/* Social Links */}
                    <div className="w-full sm:w-auto mb-4 sm:mb-0">
                        <ul className="flex justify-center space-x-4 text-white">
                            {socialLinks.map((val, i) => (
                                <li
                                    key={i}
                                    className="rounded border-gray-500 border-2 rounded-full p-4"
                                >
                                    <a
                                        href={val.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="text-3xl hover:text-blue-500 transition duration-300">
                                            {val.icon}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Copyright */}
                    <div className="w-full sm:w-auto">
                        <div className="text-center sm:text-right text-gray-400">
                            <p>
                                © 2022, UAB "WinBas" Žalgirio g. 90c, LT-09303
                                Vilnius info@winbas.eu +370 52051212
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
