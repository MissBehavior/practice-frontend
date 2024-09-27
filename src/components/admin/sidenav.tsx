import React, { useState } from 'react'
import { MenuItem } from '../pages/header/menu-item'
import { NavLink } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlinePeopleAlt } from 'react-icons/md'

function AdminSidenav() {
    const [open, setOpen] = useState(true)
    const Menus = [
        {
            title: 'Dashboard',
            src: <RxDashboard />,
            to: '/dashboard',
            gap: false,
        },
        {
            title: 'Users',
            src: <MdOutlinePeopleAlt />,
            to: '/users',
            gap: false,
        },
        // { title: 'Loyalty Cards', src: <FaChevronLeft />, gap: true to: },
    ]
    return (
        <>
            <div className="flex h-screen">
                <div
                    className={` ${
                        open ? 'w-72' : 'w-20 '
                    } bg-black h-full p-5  pt-8 relative duration-300`}
                >
                    <div
                        className={`absolute cursor-pointer -right-3 top-9 w-9 h-9 border-dark-purple bg-white
                            border-2 rounded-full flex flex-col justify-center items-center ${
                                !open && 'rotate-180'
                            } `}
                        onClick={() => setOpen(!open)}
                    >
                        <FaChevronLeft className="dark:text-slate-700 text-slate-700" />
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <img
                            src="/logo.png"
                            className={`cursor-pointer w-40 duration-500 ${
                                open && 'rotate-[360deg]'
                            }`}
                            draggable="false"
                        />
                    </div>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <NavLink
                                to={Menu.to}
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 items-center gap-x-4 
                                ${Menu.gap ? 'mt-9' : 'mt-2'} ${
                                    index === 0 && 'bg-light-white'
                                } `}
                            >
                                <div className="scale-150">{Menu.src}</div>
                                <span
                                    className={`${
                                        !open && 'hidden'
                                    } origin-left duration-200`}
                                >
                                    <div className="text-xl">{Menu.title}</div>
                                </span>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminSidenav
