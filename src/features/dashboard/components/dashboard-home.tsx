import DashboardHeader from "./dashboard-header";

export default function DashboardHome() {
  return (
    <div>
      <DashboardHeader />

      <div className="grid grid-cols-3 gap-4 p-3">
        <div className="col-span-2 rounded-2xl border p-5">
          Recent Workflows
        </div>
        <div className="rounded-2xl border p-5">Your Tasks</div>
      </div>
    </div>
  );
}
