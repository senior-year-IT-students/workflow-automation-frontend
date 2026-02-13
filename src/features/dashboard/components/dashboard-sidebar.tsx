import {  useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

import ThemeDialog from "./theme-dialog";
import { useThemeStore } from "@/stores/use-theme-store";
import { useUiPreferencesStore } from "@/stores/use-ui-preferences-store";
import { colorOptions } from "../types/color-options-type";
import { toRgba } from "../utilites/to-rgba";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  width: number;
}



const mainMenuItems = [
  { label: "Dashboard", icon: Grid2x2, path: "/dashboard" },
  { label: "Workflow", icon: Link2, path: "/dashboard/workflow" },
  { label: "Cases", icon: Folder, path: "/dashboard/cases" },
  { label: "Team", icon: UserRound, path: "/dashboard/team" },
  {
    label: "Knowledge Base",
    icon: BookOpen,
    path: "/dashboard/knowledge-base",
  },
  { label: "AI Agents", icon: Sparkles, path: "/dashboard/ai-agents" },
  { label: "Analytics", icon: ChartLine, path: "/dashboard/analytics" },
  { label: "Notifications", icon: Bell, path: "/dashboard/notifications" },
];

const footerMenuItems = [
  { label: "Theme", icon: Moon },
  { label: "Settings", icon: Cog },
];


export default function Sidebar({
  collapsed,
  setCollapsed,
  width,
}: SidebarProps) {
  const location = useLocation();
  const { theme, resolvedTheme, setTheme } = useThemeStore();

  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
const { primaryColor, setPrimaryColor } = useUiPreferencesStore();


  const activeBg = useMemo(
    () => toRgba(primaryColor, resolvedTheme === "dark" ? 0.35 : 0.22),
    [primaryColor, resolvedTheme],
  );

  const hoverBg = useMemo(
    () => toRgba(primaryColor, resolvedTheme === "dark" ? 0.18 : 0.1),
    [primaryColor, resolvedTheme],
  );

  return (
    <>
      <aside
        className="fixed left-0 top-0 z-50 mt-3 h-[97vh] rounded-r-[24px] bg-[#f3f3f3] p-4 transition-all duration-300 dark:bg-[#2D3340]"
        style={{ width }}
      >
        {/* Logo + Collapse Button */}
        <div
          className={`mb-8 flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <h1 className="ml-6 text-3xl font-semibold tracking-tight text-[#5a5d67] dark:text-[#ececf1]">
              Logo
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#575757] hover:bg-[#e8e8e8] dark:text-[#d2d4df] dark:hover:bg-[#3A4152]"
          >
            <SquareDashedBottomCode className="h-4 w-4" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav
          className={`flex-1 overflow-y-auto ${
            !collapsed ? "border-r border-[#d6d6d6] dark:border-[#3F4656]" : ""
          }`}
        >
          <ul className="space-y-2 p-2">
            {mainMenuItems.map((item) => {
              const isActive =
                item.path === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.path);

              return (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={`flex w-full items-center rounded-md py-2 text-sm font-light transition ${
                      collapsed ? "justify-center" : "gap-3 px-3"
                    }`}
                    style={{
                      backgroundColor: isActive ? activeBg : undefined,
                      color: isActive
                        ? resolvedTheme === "dark"
                          ? "#ffd5e9"
                          : "#6c3f57"
                        : resolvedTheme === "dark"
                          ? "#ebedf5"
                          : "#2e323f",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor = hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="mt-4 border-t border-[#bcbcbc] pt-4 dark:border-[#4b5060]">
          <ul className="space-y-2">
            {footerMenuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setThemeDialogOpen(true)}
                  className={`flex w-full items-center rounded-md py-2 text-sm font-medium text-[#2e323f] transition hover:bg-[#ebebeb] dark:text-[#ebedf5] dark:hover:bg-[#3A4152] ${
                    collapsed ? "justify-center" : "gap-3 px-3"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Section */}
        <div className="mt-4 border-t border-[#bcbcbc] pt-5 dark:border-[#4b5060]">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3 px-2"
            }`}
          >
            <div
              className="grid h-9 w-9 place-items-center rounded-full text-sm text-white"
              style={{ backgroundColor: primaryColor }}
            >
              HD
            </div>

            {!collapsed && (
              <p className="text-sm font-medium text-[#2e323f] dark:text-[#ebedf5]">
                Hanin Duwwah
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Theme Dialog */}
      <ThemeDialog
        isOpen={themeDialogOpen}
        onClose={() => setThemeDialogOpen(false)}
        theme={theme}
        resolvedTheme={resolvedTheme}
        onThemeChange={setTheme}
        primaryColor={primaryColor}
        colors={colorOptions}
        onPrimaryColorChange={setPrimaryColor}
      />
    </>
  );
}
