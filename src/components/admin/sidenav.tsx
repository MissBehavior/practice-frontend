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
        // <aside className="flex flex-col h-screen items-center align-middle justify-start self-center gap-10 bg-white dark:bg-slate-500">
        //     <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        //         <div className="p-4 pb-2 flex justify-between items-center">
        //             <img src="/logo.png" alt="logo" className="w-16 h-14" />
        //             <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
        //                 <FaChevronLeft className="fill-black" />
        //             </button>
        //         </div>
        //     </nav>
        //     <NavLink to="/">
        //         <img src="/logo.png" alt="logo" className="w-16 h-14" />
        //     </NavLink>
        //     <MenuItem
        //         handleClick={() => console.log('clicked')}
        //         text="Dashboard"
        //         link="admin"
        //     />
        //     <MenuItem
        //         handleClick={() => console.log('clicked')}
        //         text="Users"
        //         link="users"
        //     />
        //     <MenuItem
        //         handleClick={() => console.log('clicked')}
        //         text="Statistics"
        //         link="statistics"
        //     />
        // </aside>

        <>
            <div className="flex">
                <div
                    className={` ${
                        open ? 'w-72' : 'w-20 '
                    } bg-black h-full p-5  pt-8 relative duration-300`}
                >
                    <FaChevronLeft
                        className={`absolute cursor-pointer -right-3 top-9 w-8 h-8 border-dark-purple bg-white
           border-2 rounded-full  ${!open && 'rotate-180'}`}
                        onClick={() => setOpen(!open)}
                    />
                    <div className="flex gap-x-4 items-center">
                        <img
                            src="/logo.png"
                            className={`cursor-pointer w-40 duration-500 ${
                                open && 'rotate-[360deg]'
                            }`}
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
