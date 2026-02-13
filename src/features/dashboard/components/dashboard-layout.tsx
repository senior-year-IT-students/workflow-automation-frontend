import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./dashboard-sidebar";
import DashboardHome from "./dashboard-home";


export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const sidebarWidth = collapsed ? 90 : 260;

  return (
    <div className="flex min-h-screen bg-[#f1f1f1] dark:bg-[#262A35]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        width={sidebarWidth}
      />

      <main
        className="flex-1 min-h-screen overflow-auto bg-[#f6f6f6] p-6 dark:bg-[#252A35]"
        style={{ marginLeft: sidebarWidth }}
      >
        {location.pathname === "/dashboard" ? <DashboardHome /> : <Outlet />}
      </main>
    </div>
  );
}
