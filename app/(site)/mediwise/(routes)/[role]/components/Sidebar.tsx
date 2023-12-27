import React from 'react'
import { Logo } from './Logo'
import { SidebarRoutes } from './SidebarRoutes'

const Sidebar = () => {
  return (
    <nav className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm dark:bg-[#020817] dark:text-white">
      <div className="p-6 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes role={"ADMIN"} />
      </div>
    </nav>
  )
}

export default Sidebar