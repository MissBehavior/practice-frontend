import { Outlet } from 'react-router-dom'

function Admin() {
    return (
        <div className="relative h-full overflow-hidden dark:bg-[#101010] bg-slate-300">
            <Outlet />
        </div>
    )
}

export default Admin
