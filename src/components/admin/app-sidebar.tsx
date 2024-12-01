// // import * as React from 'react'
// // import companyLogo from '/logo.png'
// // import { Link } from 'react-router-dom'
// // import {
// //     Sidebar,
// //     SidebarContent,
// //     SidebarGroup,
// //     SidebarGroupContent,
// //     SidebarGroupLabel,
// //     SidebarHeader,
// //     SidebarMenu,
// //     SidebarMenuButton,
// //     SidebarMenuItem,
// //     SidebarRail,
// // } from '@/components/ui/sidebar'
// // import { Button } from '../ui/button'

// // // This is sample data.
// // const data = {
// //     versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
// //     navMain: [
// //         {
// //             title: 'Internal',
// //             url: '/admin',
// //             items: [
// //                 {
// //                     title: 'Tasks',
// //                     url: '/kanban',
// //                 },
// //                 {
// //                     title: 'Project Structure',
// //                     url: '#',
// //                 },
// //             ],
// //         },
// //         {
// //             title: 'Building Your Application',
// //             url: '#',
// //             items: [
// //                 {
// //                     title: 'Routing',
// //                     url: '#',
// //                 },
// //                 {
// //                     title: 'Data Fetching',
// //                     url: '#',
// //                     isActive: true,
// //                 },
// //                 {
// //                     title: 'Examples',
// //                     url: '#',
// //                 },
// //             ],
// //         },
// //         {
// //             title: 'Admin',
// //             url: '#',
// //             items: [
// //                 {
// //                     title: 'Dashboard',
// //                     url: '/dashboard',
// //                 },
// //                 {
// //                     title: 'Users',
// //                     url: '/users',
// //                 },
// //             ],
// //         },
// //     ],
// // }

// // export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
// //     return (
// //         <Sidebar {...props}>
// //             <SidebarHeader>
// //                 <Link to="/">
// //                     <Button variant="secondary">
// //                         <img
// //                             src={companyLogo}
// //                             alt="logo"
// //                             className="h-full rounded-lg select-none"
// //                             draggable="false"
// //                         />
// //                         Return to Homepage
// //                     </Button>
// //                 </Link>
// //             </SidebarHeader>
// //             <SidebarContent>
// //                 {/* We create a SidebarGroup for each parent. */}
// //                 {data.navMain.map((item) => (
// //                     <SidebarGroup key={item.title}>
// //                         <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
// //                         <SidebarGroupContent>
// //                             <SidebarMenu>
// //                                 {item.items.map((item) => (
// //                                     <SidebarMenuItem key={item.title}>
// //                                         <SidebarMenuButton
// //                                             asChild
// //                                             isActive={item.isActive}
// //                                         >
// //                                             <Link to={item.url}>
// //                                                 {item.title}
// //                                             </Link>
// //                                         </SidebarMenuButton>
// //                                     </SidebarMenuItem>
// //                                 ))}
// //                             </SidebarMenu>
// //                         </SidebarGroupContent>
// //                     </SidebarGroup>
// //                 ))}
// //             </SidebarContent>
// //             <SidebarRail />
// //         </Sidebar>
// //     )
// // }
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
// } from '@/components/ui/collapsible'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarGroupLabel,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarMenuSub,
//     SidebarMenuSubButton,
//     SidebarMenuSubItem,
//     SidebarRail,
// } from '@/components/ui/sidebar'
// import {
//     BadgeCheck,
//     Bell,
//     ChevronRight,
//     ChevronsUpDown,
//     CreditCard,
//     GalleryVerticalEnd,
//     LogOut,
// } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import * as React from 'react'
// import { Link } from 'react-router-dom'

// const company = {
//     name: 'Acme Inc',
//     logo: GalleryVerticalEnd,
//     plan: 'Enterprise',
// }
// interface NavItem {
//     title: string
//     url: string
//     disabled?: boolean
//     external?: boolean
//     shortcut?: [string, string]
//     // icon?: keyof typeof Icons;
//     label?: string
//     description?: string
//     isActive?: boolean
//     items?: NavItem[]
// }
// const navItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         url: '/dashboard/overview',
//         //   icon: 'dashboard',
//         isActive: false,
//         shortcut: ['d', 'd'],
//         items: [], // Empty array as there are no child items for Dashboard
//     },
//     {
//         title: 'Employee',
//         url: '/dashboard/employee',
//         //   icon: 'user',
//         shortcut: ['e', 'e'],
//         isActive: false,
//         items: [], // No child items
//     },
//     {
//         title: 'Product',
//         url: '/dashboard/product',
//         //   icon: 'product',
//         shortcut: ['p', 'p'],
//         isActive: false,
//         items: [], // No child items
//     },
//     {
//         title: 'Account',
//         url: '#', // Placeholder as there is no direct link for the parent
//         //   icon: 'billing',
//         isActive: true,

//         items: [
//             {
//                 title: 'Profile',
//                 url: '/dashboard/profile',
//                 //   icon: 'userPen',
//                 shortcut: ['m', 'm'],
//             },
//             {
//                 title: 'Login',
//                 shortcut: ['l', 'l'],
//                 url: '/',
//                 //   icon: 'login'
//             },
//         ],
//     },
//     {
//         title: 'Kanban',
//         url: '/dashboard/kanban',
//         //   icon: 'kanban',
//         shortcut: ['k', 'k'],
//         isActive: false,
//         items: [], // No child items
//     },
// ]
// export default function AppSidebar() {
//     //   const { data: session } = useSession();
//     const pathname = usePathname()

//     return (
//         <Sidebar collapsible="icon">
//             <SidebarHeader>
//                 <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
//                     <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                         <company.logo className="size-4" />
//                     </div>
//                     <div className="grid flex-1 text-left text-sm leading-tight">
//                         <span className="truncate font-semibold">
//                             {company.name}
//                         </span>
//                         <span className="truncate text-xs">{company.plan}</span>
//                     </div>
//                 </div>
//             </SidebarHeader>
//             <SidebarContent className="overflow-x-hidden">
//                 <SidebarGroup>
//                     <SidebarGroupLabel>Overview</SidebarGroupLabel>
//                     <SidebarMenu>
//                         {navItems.map((item) => {
//                             //   const Icon = item.icon ? Icons[item.icon] : Icons.logo;
//                             return item?.items && item?.items?.length > 0 ? (
//                                 <Collapsible
//                                     key={item.title}
//                                     asChild
//                                     defaultOpen={item.isActive}
//                                     className="group/collapsible"
//                                 >
//                                     <SidebarMenuItem>
//                                         <CollapsibleTrigger asChild>
//                                             <SidebarMenuButton
//                                                 tooltip={item.title}
//                                                 isActive={pathname === item.url}
//                                             >
//                                                 {/* {item.icon && <Icon />} */}
//                                                 <span>{item.title}</span>
//                                                 <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                                             </SidebarMenuButton>
//                                         </CollapsibleTrigger>
//                                         <CollapsibleContent>
//                                             <SidebarMenuSub>
//                                                 {item.items?.map((subItem) => (
//                                                     <SidebarMenuSubItem
//                                                         key={subItem.title}
//                                                     >
//                                                         <SidebarMenuSubButton
//                                                             asChild
//                                                             isActive={
//                                                                 pathname ===
//                                                                 subItem.url
//                                                             }
//                                                         >
//                                                             <Link
//                                                                 to={subItem.url}
//                                                             >
//                                                                 <span>
//                                                                     {
//                                                                         subItem.title
//                                                                     }
//                                                                 </span>
//                                                             </Link>
//                                                         </SidebarMenuSubButton>
//                                                     </SidebarMenuSubItem>
//                                                 ))}
//                                             </SidebarMenuSub>
//                                         </CollapsibleContent>
//                                     </SidebarMenuItem>
//                                 </Collapsible>
//                             ) : (
//                                 <SidebarMenuItem key={item.title}>
//                                     <SidebarMenuButton
//                                         asChild
//                                         tooltip={item.title}
//                                         isActive={pathname === item.url}
//                                     >
//                                         <Link to={item.url}>
//                                             {/* <Icon /> */}
//                                             <span>{item.title}</span>
//                                         </Link>
//                                     </SidebarMenuButton>
//                                 </SidebarMenuItem>
//                             )
//                         })}
//                     </SidebarMenu>
//                 </SidebarGroup>
//             </SidebarContent>
//             <SidebarFooter>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <SidebarMenuButton
//                                     size="lg"
//                                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//                                 >
//                                     {/* <Avatar className="h-8 w-8 rounded-lg">
//                     <AvatarImage
//                       src={session?.user?.image || ''}
//                       alt={session?.user?.name || ''}
//                     />
//                     <AvatarFallback className="rounded-lg">
//                       {session?.user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-semibold">
//                       {session?.user?.name || ''}
//                     </span>
//                     <span className="truncate text-xs">
//                       {session?.user?.email || ''}
//                     </span>
//                   </div> */}
//                                     <ChevronsUpDown className="ml-auto size-4" />
//                                 </SidebarMenuButton>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent
//                                 className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//                                 side="bottom"
//                                 align="end"
//                                 sideOffset={4}
//                             >
//                                 <DropdownMenuLabel className="p-0 font-normal">
//                                     <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                                         {/* <Avatar className="h-8 w-8 rounded-lg">
//                       <AvatarImage
//                         src={session?.user?.image || ''}
//                         alt={session?.user?.name || ''}
//                       />
//                       <AvatarFallback className="rounded-lg">
//                         {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
//                           'CN'}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="grid flex-1 text-left text-sm leading-tight">
//                       <span className="truncate font-semibold">
//                         {session?.user?.name || ''}
//                       </span>
//                       <span className="truncate text-xs">
//                         {' '}
//                         {session?.user?.email || ''}
//                       </span>
//                     </div> */}
//                                     </div>
//                                 </DropdownMenuLabel>
//                                 <DropdownMenuSeparator />

//                                 <DropdownMenuGroup>
//                                     <DropdownMenuItem>
//                                         <BadgeCheck />
//                                         Account
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem>
//                                         <CreditCard />
//                                         Billing
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem>
//                                         <Bell />
//                                         Notifications
//                                     </DropdownMenuItem>
//                                 </DropdownMenuGroup>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem>
//                                     <LogOut />
//                                     Log out
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarFooter>
//             <SidebarRail />
//         </Sidebar>
//     )
// }
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GoChevronLeft } from 'react-icons/go'

import { cn } from '@/lib/utils'
import { Button } from './custom/button'
import Nav from './nav'
import { Layout } from './custom/layout'
import { sidelinks } from './sidelinks'
import companyLogo from '/logo.png'
import { useIsMobile } from '@/hooks/use-mobile'
import { Link } from 'react-router-dom'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
    className,
    isCollapsed,
    setIsCollapsed,
}: SidebarProps) {
    const isMobile = useIsMobile()
    const [navOpened, setNavOpened] = useState(false)

    /* Make body not scrollable when navBar is opened */
    useEffect(() => {
        if (navOpened) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [navOpened])

    return (
        <aside
            className={cn(
                `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
                    isCollapsed ? 'md:w-14' : 'md:w-64'
                }`,
                className
            )}
        >
            {/* Overlay in mobile */}
            <div
                onClick={() => setNavOpened(false)}
                className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
                    navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
                } w-full bg-black md:hidden`}
            />

            <Layout fixed className={navOpened ? 'h-svh' : ''}>
                {/* Header */}
                <Layout.Header
                    sticky
                    className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
                >
                    <Link to="/">
                        <div
                            className={`flex items-center justify-center ${
                                !isCollapsed ? '' : ''
                            }`}
                        >
                            <img
                                src={companyLogo}
                                alt="logo"
                                className={`${
                                    isMobile ? 'h-1/5 w-1/5' : 'h-1/2 w-1/2'
                                }  rounded-lg select-none bg-slate-300 p-2`}
                                draggable="false"
                            />
                            <div
                                className={`flex flex-col justify-end truncate ${
                                    isCollapsed
                                        ? 'invisible w-0'
                                        : 'visible w-auto'
                                }`}
                            ></div>
                        </div>
                    </Link>

                    {/* Toggle Button in mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Toggle Navigation"
                        aria-controls="sidebar-menu"
                        aria-expanded={navOpened}
                        onClick={() => setNavOpened((prev) => !prev)}
                    >
                        {navOpened ? <MdClose /> : <RxHamburgerMenu />}
                    </Button>
                </Layout.Header>

                {/* Navigation links */}
                <Nav
                    id="sidebar-menu"
                    className={`z-40 h-full flex-1 overflow-auto ${
                        navOpened
                            ? 'max-h-screen'
                            : 'max-h-0 py-0 md:max-h-screen md:py-2'
                    }`}
                    closeNav={() => setNavOpened(false)}
                    isCollapsed={isCollapsed}
                    links={sidelinks}
                />

                {/* Scrollbar width toggle button */}
                <Button
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    size="icon"
                    variant="outline"
                    className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
                >
                    <GoChevronLeft
                        className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
                    />
                </Button>
            </Layout>
        </aside>
    )
}
