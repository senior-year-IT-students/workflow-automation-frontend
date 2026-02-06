
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../../shared/components/ui/sidebar";


import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>

      <SidebarInset>
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="flex-1" />
        
        </div>

        <main className="flex-1 flex flex-col gap-4 p-4">
          <div className="rounded-xl p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
