import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import AdminSidenav from './sidenav'
import AppSidebar from './app-sidebar'
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from '@/components/ui/sidebar'
import Header from '../header/header'
import Sidebar from './app-sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'

function Admin() {
    const [defaultOpen, setDefaultOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useIsCollapsed()

    useEffect(() => {
        const sidebarState = Cookies.get('sidebar:state') === 'true'
        setDefaultOpen(sidebarState)
    }, [])
    return (
        // <SidebarProvider defaultOpen={defaultOpen}>
        //     <AppSidebar />
        //     <SidebarInset>
        //         {/* page main content */}
        //         <Outlet />
        //         {/* page main content ends */}
        //     </SidebarInset>
        // </SidebarProvider>
        <div className="relative h-full overflow-hidden dark:bg-[#101010] bg-slate-300">
            {/* <AdminSidenav /> */}
            <Header />
            {/* <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            /> */}
            <main
                id="content"
                // className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
                //     isCollapsed ? 'md:ml-14' : 'md:ml-64'
                // } h-full`}
            >
                <Outlet />
            </main>
        </div>
    )
}

export default Admin

//  <>
//     {/* <Header />
//     <div className="w-full h-full flex flex-row">
//         <AdminSidenav />
//         <Outlet />
//     </div> */}
//     {/* <div className="w-full p-6 h-2 bg-slate-500"> HEADER</div> */}
//     {/* <Header /> */}
//     <div className="w-full h-full flex flex-row">
//         {/* <AdminSidenav /> */}
//         <Layout>
//             <AppSidebar></AppSidebar>
//             <Outlet />
//         </Layout>
//     </div>
// </>
