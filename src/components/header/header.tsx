import { useEffect, useState } from 'react'
import companyLogo from '/logo.png'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/services/auth-service'
import { MenuItem } from './menu-item'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaChevronDown } from 'react-icons/fa'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '../ui/navigation-menu'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlinePeopleAlt } from 'react-icons/md'
export default function Header() {
    const { isLoggedIn, logoutFunc } = useAuth()
    const { user } = useAuth()
    const { t } = useTranslation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [adminMenuOpen, setAdminMenuOpen] = useState(false)
    const location = useLocation()
    const closeMenu = () => setOpen(false)

    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen)
        closeMenu()
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

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
    useEffect(() => {
        // Close the dropdown whenever the route changes
        setAdminMenuOpen(false)
    }, [location])
    return (
        <header className="shadow-md bg-white dark:bg-[#191919] font-sans tracking-wide relative z-50">
            <section className="flex items-center lg:justify-center flex-wrap gap-5 relative py-3 px-4 border-gray-200 border-b dark:border-gray-700 lg:min-h-[80px] max-lg:min-h-[60px]">
                <Link to="/">
                    <img
                        src={companyLogo}
                        alt="logo"
                        className="md:w-[170px] w-36 p-3 bg-white rounded-lg select-none"
                        draggable="false"
                    />
                </Link>
                <div className="space-x-4 md:absolute md:right-10 flex items-center max-md:ml-auto">
                    <ModeToggle />
                    <div className=" border-gray-300 border-l-2 dark:border-gray-600 pl-5 h-[40px] flex flex-row items-center justify-center gap-2 select-none">
                        <a
                            onClick={setLanguage('en')}
                            className={
                                i18n.language === 'en'
                                    ? 'p-2 bg-slate-300 dark:bg-background rounded cursor-pointer dark:hover:bg-accent dark:hover:text-accent-foreground'
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
                                    ? 'p-2 bg-slate-300 dark:bg-background rounded cursor-pointer hover:bg-accent hover:text-accent-foreground'
                                    : 'p-2 cursor-pointer'
                            }
                        >
                            LT
                        </a>
                    </div>
                    {!isLoggedIn && (
                        <>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-4 cursor-pointer">
                                <Button onClick={navToLogin}>
                                    SignIn/SignUp
                                </Button>
                            </div>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-4 cursor-pointer">
                                <Button onClick={navToLogin}>
                                    {t('login')}
                                </Button>
                            </div>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-4 cursor-pointer">
                                <Button onClick={navToRegister}>
                                    {t('register')}
                                </Button>
                            </div>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <div className="inline-block border-gray-300 border-l-2 dark:border-gray-600 pl-4 cursor-pointer">
                                <DropdownMenu
                                    open={open}
                                    onOpenChange={setOpen}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 ring-gray-300 dark:ring-gray-500 hover:brightness-110">
                                            {user.profileImgUrl === '' ? (
                                                <svg
                                                    className="w-10 h-10 text-gray-400 -left-1 bg-gray-300 rounded-full border-2 border-white dark:border-slate-500 p-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <img
                                                    src={user.profileImgUrl}
                                                    alt="profile"
                                                    className=" w-10 h-10 -left-1 bg-gray-300 rounded-full border-2 border-white dark:border-slate-500 p-2"
                                                />
                                            )}
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="center"
                                        className="flex flex-col gap-2"
                                    >
                                        <Button onClick={handleClick}>
                                            <NavLink
                                                to={'/profile'}
                                                className={({
                                                    isActive,
                                                    isPending,
                                                }) =>
                                                    isPending
                                                        ? 'pending'
                                                        : isActive
                                                        ? 'hover:text-[#007bff] text-gray-300 dark:text-gray-700 hover:dark:text-[#007bff] p-2 font-bold text-[20px] block'
                                                        : 'hover:text-[#007bff] text-gray-300 dark:text-gray-700 hover:dark:text-[#007bff] p-2 font-bold text-[20px] block'
                                                }
                                            >
                                                {t('profile')}
                                            </NavLink>
                                        </Button>
                                        <Button onClick={logoutFunc}>
                                            {t('logout')}
                                        </Button>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <div className="flex flex-wrap  xl:px-5 overflow-x-auto">
                <div
                    id="collapseMenu"
                    style={{ display: isMenuOpen ? 'block' : 'none' }}
                    className="w-full max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
                >
                    <div
                        className="w-1/2 h-full fixed lg:hidden z-[100]  right-0 top-0"
                        onClick={handleClick}
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
                    </div>

                    <ul className="lg:flex lg:justify-center max-lg:space-y-3 max-lg:fixed max-lg:bg-white dark:max-lg:bg-gray-800 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                        <li className="mb-6 hidden max-lg:block">
                            <Link to="/">
                                <img
                                    src={companyLogo}
                                    alt="logo"
                                    onClick={handleClick}
                                    className="md:w-[170px] w-36 p-3 bg-white rounded-lg select-none"
                                />
                            </Link>
                        </li>
                        <MenuItem
                            handleClick={handleClick}
                            text="home"
                            link=""
                        />
                        {/* <MenuItem
                            handleClick={handleClick}
                            text="about_us"
                            link="about"
                        /> */}
                        <MenuItem
                            handleClick={handleClick}
                            text="solutions"
                            link="solutions"
                        />
                        {/* <MenuItem
                            handleClick={handleClick}
                            text="people"
                            link="people"
                        /> */}
                        <MenuItem
                            handleClick={handleClick}
                            text="gallery"
                            link="gallery"
                        />
                        {/* <MenuItem
                            handleClick={handleClick}
                            text="clients"
                            link="clients"
                        /> */}
                        <MenuItem
                            handleClick={handleClick}
                            text="post_external"
                            link="post-external"
                        />

                        {user.isEmployee && (
                            <MenuItem
                                handleClick={handleClick}
                                text="team_updates"
                                link="team-updates"
                            />
                        )}
                        {user.isEmployee && (
                            <MenuItem
                                handleClick={handleClick}
                                text="kanban"
                                link="kanban"
                            />
                        )}

                        {user.isAdmin && (
                            <div
                                className="relative max-lg:border-b max-lg:border-gray-300 dark:max-lg:border-gray-600 max-lg:py-3"
                                onMouseEnter={() => setAdminMenuOpen(true)}
                                onMouseLeave={() => setAdminMenuOpen(false)}
                            >
                                <DropdownMenu
                                    open={adminMenuOpen}
                                    onOpenChange={setAdminMenuOpen}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={
                                                'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-3 font-bold text-[20px] block w-full text-left flex items-center justify-between'
                                            }
                                        >
                                            <span>{t('admin')}</span>
                                            <FaChevronDown className="ml-2 text-sm" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start"
                                        className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg -mt-1"
                                    >
                                        <NavLink
                                            to="/dashboard"
                                            onClick={handleClick}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-2 font-bold text-[16px] block'
                                                    : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-2 font-bold text-[16px] block'
                                            }
                                        >
                                            {t('Dashboard')}
                                        </NavLink>
                                        <NavLink
                                            to="/users"
                                            onClick={handleClick}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-2 font-bold text-[16px] block'
                                                    : 'hover:text-[#007bff] text-gray-500 dark:text-gray-300 hover:dark:text-[#007bff] p-2 font-bold text-[16px] block'
                                            }
                                        >
                                            {t('Users')}
                                        </NavLink>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}

                        {/*user.isAdmin && (
                            <MenuItem
                                handleClick={handleClick}
                                text="admin"
                                link="dashboard"
                            />
                        )*/}
                    </ul>
                </div>

                <div className="flex ml-auto lg:hidden pr-4">
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
