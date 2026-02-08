import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Bell,
  BookOpen,
  ChartLine,
  Cog,
  Folder,
  Grid2x2,
  Link2,
  Moon,
  SquareDashedBottomCode,
  UserRound,
  Sparkles,
} from "lucide-react";

const mainMenuItems = [
  { label: "Dashboard", icon: Grid2x2 },
  { label: "Workflow", icon: Link2 },
  { label: "Cases", icon: Folder },
  { label: "Team", icon: UserRound },
  { label: "Knowledge Base", icon: BookOpen },
  { label: "AI Agents", icon: Sparkles },
  { label: "Analytics", icon: ChartLine },
  { label: "Notifications", icon: Bell },
];

const footerMenuItems = [
  { label: "Theme", icon: Moon },
  { label: "Settings", icon: Cog },
];

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 90 : 260;

  return (
    <div className=" flex min-h-screen bg-[#f1f1f1] ">
      {/* Sidebar */}
      <aside
        className={`fixed  mt-3 top-0 left-0 h-screen z-50 rounded-r-[24px] bg-[#f3f3f3] p-4 transition-all duration-300`}
        style={{ width: sidebarWidth }}
      >
        {/* Header */}
        <div
          className={`mb-8 flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <h1 className="text-2xl font-semibold tracking-tight  ml-8">Logo</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#575757] hover:bg-[#e8e8e8]"
          >
            <SquareDashedBottomCode className="h-4 w-4" />
          </button>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-3">
            {mainMenuItems.map((item) => {
              const path =
                "/dashboard/" + item.label.toLowerCase().replace(/\s/g, "");
              return (
                <li key={item.label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `flex w-full items-center ${
                        collapsed ? "justify-center" : "gap-2 px-3"
                      } py-2 rounded-md text-[14px] font-medium transition ${
                        isActive
                          ? "bg-[#f4c0d8] text-[#5f4453]"
                          : "hover:bg-[#ebebeb]"
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-4 border-t border-[#bcbcbc] pt-4">
          <ul className="space-y-2">
            {footerMenuItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex w-full items-center ${
                    collapsed ? "justify-center" : "gap-2 px-3"
                  } py-2 rounded-xl text-[14px] font-medium hover:bg-[#ebebeb]`}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User */}
        <div className="mt-4 border-t border-[#bcbcbc] pt-5">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3 px-2"
            }`}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#ef5a9a] text-sm text-white">
              HD
            </div>
            {!collapsed && (
              <p className="text-[14px] font-medium">Hanin Duwwah</p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main
        className=" overflow-auto min-h-screen flex flex-1 items-center justify-center rounded-[24px] bg-[#f6f6f6] p-6"
        style={{ marginLeft: sidebarWidth }}
      >
        <Outlet />
      </main>
    </div>
  );
}
