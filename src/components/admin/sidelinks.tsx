import {
    TbError404,
    TbExclamationCircle,
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
    TbHexagonNumber4,
    TbHexagonNumber5,
    TbComponents,
    TbChecklist,
    TbChartHistogram,
    TbApps,
    TbLayoutDashboard,
    TbMessages,
    TbRouteAltLeft,
    TbServerOff,
    TbSettings,
    TbTruck,
    TbUserShield,
    TbUsers,
    TbLock,
} from 'react-icons/tb'

export interface NavLink {
    title: string
    label?: string
    href: string
    icon: JSX.Element
}

export interface SideLink extends NavLink {
    sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
    {
        title: 'Dashboard',
        label: '',
        href: '/dashboard',
        icon: <TbLayoutDashboard size={18} />,
    },
    {
        title: 'Tasks -> NotFinished',
        label: '3',
        href: '/tasks',
        icon: <TbChecklist size={18} />,
    },
    // {
    //     title: 'sidebar.chats',
    //     label: '9',
    //     href: '/chats',
    //     icon: <TbMessages size={18} />,
    // },
    {
        title: 'Kanban',
        label: '',
        href: '/kanban',
        icon: <TbApps size={18} />,
    },
    // {
    //     title: 'sidebar.authentication',
    //     label: '',
    //     href: '',
    //     icon: <TbUserShield size={18} />,
    //     sub: [
    //         {
    //             title: 'sidebar.auth_sign_in_email_password',
    //             label: '',
    //             href: '/sign-in',
    //             icon: <TbHexagonNumber1 size={18} />,
    //         },
    //         {
    //             title: 'sidebar.auth_sign_in_box',
    //             label: '',
    //             href: '/sign-in-2',
    //             icon: <TbHexagonNumber2 size={18} />,
    //         },
    //         {
    //             title: 'sidebar.auth_sign_up',
    //             label: '',
    //             href: '/sign-up',
    //             icon: <TbHexagonNumber3 size={18} />,
    //         },
    //         {
    //             title: 'sidebar.auth_forgot_password',
    //             label: '',
    //             href: '/forgot-password',
    //             icon: <TbHexagonNumber4 size={18} />,
    //         },
    //         {
    //             title: 'sidebar.auth_otp',
    //             label: '',
    //             href: '/otp',
    //             icon: <TbHexagonNumber5 size={18} />,
    //         },
    //     ],
    // },
    {
        title: 'Users',
        label: '',
        href: '/users',
        icon: <TbUsers size={18} />,
    },
    // {
    //     title: 'sidebar.requests',
    //     label: '10',
    //     href: '/requests',
    //     icon: <TbRouteAltLeft size={18} />,
    //     sub: [
    //         {
    //             title: 'sidebar.requests_trucks',
    //             label: '9',
    //             href: '/trucks',
    //             icon: <TbTruck size={18} />,
    //         },
    //     ],
    // },
    // {
    //     title: 'sidebar.analytics',
    //     label: '',
    //     href: '/analysis',
    //     icon: <TbChartHistogram size={18} />,
    // },
    // {
    //     title: 'sidebar.extra_components',
    //     label: '',
    //     href: '/extra-components',
    //     icon: <TbComponents size={18} />,
    // },
    // {
    //     title: 'sidebar.error_pages',
    //     label: '',
    //     href: '',
    //     icon: <TbExclamationCircle size={18} />,
    //     sub: [
    //         {
    //             title: 'sidebar.error_not_found',
    //             label: '',
    //             href: '/404',
    //             icon: <TbError404 size={18} />,
    //         },
    //         {
    //             title: 'sidebar.error_internal_server',
    //             label: '',
    //             href: '/500',
    //             icon: <TbServerOff size={18} />,
    //         },
    //         {
    //             title: 'sidebar.error_unauthorised',
    //             label: '',
    //             href: '/401',
    //             icon: <TbLock size={18} />,
    //         },
    //     ],
    // },
    // {
    //     title: 'sidebar.settings',
    //     label: '',
    //     href: '/settings',
    //     icon: <TbSettings size={18} />,
    // },
]
