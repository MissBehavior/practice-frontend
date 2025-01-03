import { Outlet } from 'react-router-dom'

function Admin() {
    return (
        <div className="relative h-full overflow-hidden dark:bg-[#101010] bg-[#f2f2f2]">
            <Outlet />
        </div>
    )
}

export default Admin
