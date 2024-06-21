import { useState } from 'react'
import companyLogo from '/logo.png'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Login from './pages/login'
import { useAuth } from '@/services/auth-service'
export default function Header() {
    const { isLoggedIn, logoutFunc } = useAuth()
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const setLanguage = (lang: string) => () => {
        i18n.changeLanguage(lang)
    }
    const navigate = useNavigate()
    const navToLogin = () => {
        navigate('/login')
    }
    const navToRegister = () => {
        navigate('/register')
    }

    return (
        <header className="shadow-md bg-white dark:bg-slate-700 font-sans tracking-wide relative z-50">
            <section className="flex items-center lg:justify-center flex-wrap gap-5 relative py-3 px-10 border-gray-200 border-b dark:border-gray-700 lg:min-h-[80px] max-lg:min-h-[60px]">
                <Link to="/">
                    <img
                        src={companyLogo}
                        alt="logo"
                        className="md:w-[170px] w-36 p-3 bg-white rounded-lg select-none"
                    />
                </Link>
                <div className="space-x-6 md:absolute md:right-10 flex items-center max-md:ml-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer fill-black dark:fill-white"
                        width="20px"
                        height="20px"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M449.643 0H62.357C27.973 0 0 27.973 0 62.357v387.285C0 484.027 27.973 512 62.357 512H260.86c8.349 0 15.118-6.769 15.118-15.118v-183.31c0-8.349-6.769-15.118-15.118-15.118h-54.341v-43.033h54.341c8.349 0 15.118-6.769 15.118-15.118v-61.192c0-33.116 26.942-60.058 60.059-60.058h52.433v43.033h-52.433c-9.387 0-17.025 7.639-17.025 17.026v61.192c0 8.349 6.769 15.118 15.118 15.118h54.341v43.033H334.13c-8.349 0-15.118 6.769-15.118 15.118v183.31c0 8.349 6.769 15.118 15.118 15.118h115.513C484.027 512 512 484.027 512 449.643V62.357C512 27.973 484.027 0 449.643 0zm32.121 449.643c0 17.712-14.409 32.122-32.122 32.122H349.246V328.69h54.341c8.349 0 15.118-6.769 15.118-15.118v-73.268c0-8.349-6.769-15.118-15.118-15.118h-54.341v-32.864h54.341c8.349 0 15.118-6.769 15.118-15.118v-73.268c0-8.349-6.769-15.118-15.118-15.118h-67.551c-49.788 0-90.294 40.506-90.294 90.294v46.074h-54.341c-8.349 0-15.118 6.769-15.118 15.118v73.268c0 8.349 6.769 15.118 15.118 15.118h54.341v153.074H62.357c-17.712 0-32.122-14.409-32.122-32.122V62.357c0-17.712 14.409-32.122 32.122-32.122h387.285c17.712 0 32.122 14.409 32.122 32.122v387.286z"
                            data-original="#000000"
                        />
                    </svg>
                    <ModeToggle />
                    <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-5 h-[40px] flex flex-row items-center justify-center gap-2 select-none">
                        <a
                            onClick={setLanguage('en')}
                            className={
                                i18n.language === 'en'
                                    ? 'p-2 bg-slate-300 dark:bg-slate-800 rounded cursor-pointer'
                                    : 'p-2 cursor-pointer'
                            }
                        >
                            EN
                        </a>
                        |
                        <a
                            onClick={setLanguage('lt')}
                            className={
                                i18n.language === 'lt'
                                    ? 'p-2 bg-slate-300 dark:bg-slate-800 rounded cursor-pointer'
                                    : 'p-2 cursor-pointer'
                            }
                        >
                            LT
                        </a>
                    </div>
                    {!isLoggedIn && (
                        <>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-6 cursor-pointer">
                                <Button onClick={navToLogin}>
                                    {t('login')}
                                </Button>
                                {/* <Login /> */}
                            </div>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-6 cursor-pointer">
                                <Button onClick={navToRegister}>
                                    {t('register')}
                                </Button>
                                {/* <Login /> */}
                            </div>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-6 cursor-pointer">
                                <Button onClick={logoutFunc}>
                                    {t('logout')}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <div className="flex flex-wrap pt-3.5 px-10 overflow-x-auto">
                <div
                    id="collapseMenu"
                    style={{ display: isMenuOpen ? 'block' : 'none' }}
                    className="w-full max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
                >
                    <button
                        id="toggleClose"
                        onClick={handleClick}
                        className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white dark:bg-gray-700 p-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 fill-black dark:fill-white"
                            viewBox="0 0 320.591 320.591"
                        >
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"
                            ></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"
                            ></path>
                        </svg>
                    </button>

                    <ul className="lg:flex lg:justify-center max-lg:space-y-3 max-lg:fixed max-lg:bg-white dark:max-lg:bg-gray-800 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                        <li className="mb-6 hidden max-lg:block">
                            <Link to="/">
                                <img
                                    src={companyLogo}
                                    alt="logo"
                                    className="md:w-[170px] w-36 p-3 bg-white rounded-lg select-none"
                                />
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('home')}
                            </NavLink>
                            {/* <Link
                                to="/"
                                className="hover:text-[#007bff] text-[#007bff] dark:text-[#007bff] font-bold text-[15px] block"
                            >
                                {t('home')}
                            </Link> */}
                        </li>
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/about"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('about_us')}
                            </NavLink>
                            {/* <Link
                                to="/about"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('about_us')}
                            </Link> */}
                        </li>
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/solutions"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('solutions')}
                            </NavLink>

                            {/* <Link
                                to="/solutions"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('solutions')}
                            </Link> */}
                        </li>
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/people"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff]  text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('people')}
                            </NavLink>
                            {/* <Link
                                to="/people"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('people')}
                            </Link> */}
                        </li>
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/gallery"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('gallery')}
                            </NavLink>
                            {/* <Link
                                to="/gallery"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('gallery')}
                            </Link> */}
                        </li>
                        {/* <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/career"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-[#007bff] dark:text-[#007bff] font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[20px] block'
                                }
                            >
                                {t('career')}
                            </NavLink> */}
                        {/* <Link
                                to="/career"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('career')}
                            </Link> */}
                        {/* </li> */}
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/clients"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('clients')}
                            </NavLink>
                            {/* <Link
                                to="/clients"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('clients')}
                            </Link> */}
                        </li>
                        <li className="max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3">
                            <NavLink
                                to="/post-external"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] dark:bg-background p-3 font-bold text-[20px] block'
                                        : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block'
                                }
                            >
                                {t('post_external')}
                            </NavLink>
                            {/* <Link
                                to="/post-external"
                                className="hover:text-[#007bff] text-gray-500 dark:text-gray-300 font-bold text-[15px] block"
                            >
                                {t('post_external')}
                            </Link> */}
                        </li>
                    </ul>
                </div>

                <div className="flex ml-auto lg:hidden">
                    <button id="toggleOpen" onClick={handleClick}>
                        <svg
                            className="w-8 h-8 dark:fill-white "
                            fill="#000"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
