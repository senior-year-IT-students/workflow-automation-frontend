import DashboardLayout from "../components/dashboard-layout"

const DashboardPage = () => {
  return (
    <DashboardLayout></DashboardLayout>
  )
}

export default DashboardPage;










// import { useEffect, useMemo, useState } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import {
//   Bell,
//   BookOpen,
//   ChartLine,
//   Cog,
//   Folder,
//   Grid2x2,
//   Link2,
//   Moon,
//   SquareDashedBottomCode,
//   UserRound,
//   Sparkles,
// } from "lucide-react";

// import ThemeDialog from "../components/Theme-dialog";
// import { ThemedButton as Button } from "../../../shared/components/ui/themed-button";
// import { useThemeStore } from "../../../stores/use-theme-store";
// import { useUiPreferencesStore } from "../../../stores/use-ui-preferences-store";

// const colorOptions = [
//   { label: "Hot Pink", value: "#EC4899" },
//   { label: "Ocean Blue", value: "#0EA5E9" },
//   { label: "Royal Purple", value: "#8B5CF6" },
//   { label: "Emerald Green", value: "#10B981" },
//   { label: "Golden Amber", value: "#F59E0B" },
//   { label: "Rose Red", value: "#F43F5E" },
// ];

// const mainMenuItems = [
//   { label: "Dashboard", icon: Grid2x2, path: "/dashboard" },
//   { label: "Workflow", icon: Link2, path: "/dashboard/workflow" },
//   { label: "Cases", icon: Folder, path: "/dashboard/cases" },
//   { label: "Team", icon: UserRound, path: "/dashboard/team" },
//   {
//     label: "Knowledge Base",
//     icon: BookOpen,
//     path: "/dashboard/knowledge-base",
//   },
//   { label: "AI Agents", icon: Sparkles, path: "/dashboard/ai-agents" },
//   { label: "Analytics", icon: ChartLine, path: "/dashboard/analytics" },
//   { label: "Notifications", icon: Bell, path: "/dashboard/notifications" },
// ];

// const footerMenuItems = [
//   { label: "Theme", icon: Moon },
//   { label: "Settings", icon: Cog },
// ];

// const toRgba = (hex: string, alpha: number) => {
//   const normalized = hex.replace("#", "");
//   const bigint = Number.parseInt(normalized, 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// export default function DashboardPage() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [themeDialogOpen, setThemeDialogOpen] = useState(false);
//   const [primaryColor, setPrimaryColor] = useState(
//     localStorage.getItem("primary-color") ?? "#EC4899",
//   );

//   const { theme, resolvedTheme, setTheme } = useThemeStore();
//   const globalButtonVariant = useUiPreferencesStore(
//     (state) => state.globalButtonVariant,
//   );
//   const location = useLocation();

//   const sidebarWidth = collapsed ? 90 : 260;

//   useEffect(() => {
//     document.documentElement.style.setProperty("--primary", primaryColor);
//     localStorage.setItem("primary-color", primaryColor);
//   }, [primaryColor]);

//   const activeBg = useMemo(
//     () => toRgba(primaryColor, resolvedTheme === "dark" ? 0.35 : 0.22),
//     [primaryColor, resolvedTheme],
//   );
//   const hoverBg = useMemo(
//     () => toRgba(primaryColor, resolvedTheme === "dark" ? 0.18 : 0.1),
//     [primaryColor, resolvedTheme],
//   );

//   return (
//     <div className="flex min-h-screen bg-[#f1f1f1] dark:bg-[#262A35]">
//       <aside
//         className="fixed left-0 top-0 z-50 mt-3 h-[97vh] rounded-r-[24px] bg-[#f3f3f3] p-4 transition-all duration-300 dark:bg-[#2D3340]"
//         style={{ width: sidebarWidth }}
//       >
//         <div
//           className={`mb-8 flex items-center ${
//             collapsed ? "justify-center" : "justify-between"
//           }`}
//         >
//           {!collapsed && (
//             <h1 className="ml-8 text-4xl font-semibold tracking-tight text-[#5a5d67] dark:text-[#ececf1]">
//               logo
//             </h1>
//           )}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="flex h-8 w-8 items-center justify-center rounded-md text-[#575757] hover:bg-[#e8e8e8] dark:text-[#d2d4df] dark:hover:bg-[#3A4152]"
//           >
//             <SquareDashedBottomCode className="h-4 w-4" />
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto">
//           <ul className="space-y-2 p-3">
//             {mainMenuItems.map((item) => {
//               const isActive =
//                 item.path === "/dashboard"
//                   ? location.pathname === "/dashboard"
//                   : location.pathname.startsWith(item.path);

//               return (
//                 <li key={item.label}>
//                   <NavLink
//                     to={item.path}
//                     className={`flex w-full items-center rounded-md py-2 text-[14px] font-medium transition ${
//                       collapsed ? "justify-center" : "gap-2 px-3"
//                     }`}
//                     style={{
//                       backgroundColor: isActive ? activeBg : undefined,
//                       color: isActive
//                         ? resolvedTheme === "dark"
//                           ? "#ffd5e9"
//                           : "#6c3f57"
//                         : resolvedTheme === "dark"
//                           ? "#ebedf5"
//                           : "#2e323f",
//                     }}
//                     onMouseEnter={(event) => {
//                       if (!isActive)
//                         event.currentTarget.style.backgroundColor = hoverBg;
//                     }}
//                     onMouseLeave={(event) => {
//                       if (!isActive)
//                         event.currentTarget.style.backgroundColor =
//                           "transparent";
//                     }}
//                   >
//                     <item.icon className="h-4 w-4" />
//                     {!collapsed && <span>{item.label}</span>}
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         <div className="mt-4 border-t border-[#bcbcbc] pt-4 dark:border-[#4b5060]">
//           <ul className="space-y-2">
//             {footerMenuItems.map((item) => (
//               <li key={item.label}>
//                 <button
//                   onClick={() => setThemeDialogOpen(true)}
//                   className={`flex w-full items-center rounded-xl py-2 text-[14px] font-medium text-[#2e323f] transition hover:bg-[#ebebeb] dark:text-[#ebedf5] dark:hover:bg-[#3A4152] ${
//                     collapsed ? "justify-center" : "gap-2 px-3"
//                   }`}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {!collapsed && <span>{item.label}</span>}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mt-4 border-t border-[#bcbcbc] pt-5 dark:border-[#4b5060]">
//           <div
//             className={`flex items-center ${
//               collapsed ? "justify-center" : "gap-3 px-2"
//             }`}
//           >
//             <div
//               className="grid h-9 w-9 place-items-center rounded-full text-sm text-white"
//               style={{ backgroundColor: primaryColor }}
//             >
//               HD
//             </div>
//             {!collapsed && (
//               <p className="text-[14px] font-medium text-[#2e323f] dark:text-[#ebedf5]">
//                 Hanin Duwwah
//               </p>
//             )}
//           </div>
//         </div>
//       </aside>

//       <main
//         className="min-h-screen flex-1 overflow-auto  bg-[#f6f6f6] p-6 dark:bg-[#252A35]"
//         style={{ marginLeft: sidebarWidth }}
//       >
//         {location.pathname === "/dashboard" ? (
//           <div>
//             <div className="mb-5 flex items-center justify-between">
//               <h1 className="text-4xl font-semibold text-[#2d2f37] dark:text-[#f3f5fb]">
//                 Welcome Back to (the name )
//               </h1>
//               <Button
//                 variant={globalButtonVariant}
//                 style={{
//                   ...(globalButtonVariant === "default"
//                     ? {
//                         backgroundColor: primaryColor,
//                         borderColor: primaryColor,
//                         color: "#ffffff",
//                       }
//                     : {}),
//                   ...(globalButtonVariant === "outline"
//                     ? { borderColor: primaryColor, color: primaryColor }
//                     : {}),
//                   ...(globalButtonVariant === "ghost"
//                     ? { color: primaryColor }
//                     : {}),
//                 }}
//               >
//                 + New Workflow
//               </Button>
//             </div>
//             <div className="grid grid-cols-3 gap-4 p-3">
//               <div className="col-span-2 rounded-2xl border border-[#dde0e8] p-5 text-[#7b7e88] dark:border-[#4A5161] dark:text-[#b8bece]">
//                 Recent Workflows
//               </div>
//               <div className="rounded-2xl border border-[#dde0e8] p-5 text-[#7b7e88] dark:border-[#4A5161] dark:text-[#b8bece]">
//                 Your Tasks
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Outlet />
//         )}
//       </main>

//       <ThemeDialog
//         isOpen={themeDialogOpen}
//         onClose={() => setThemeDialogOpen(false)}
//         theme={theme}
//         resolvedTheme={resolvedTheme}
//         onThemeChange={setTheme}
//         primaryColor={primaryColor}
//         colors={colorOptions}
//         onPrimaryColorChange={setPrimaryColor}
//       />
//     </div>
//   );
// }
