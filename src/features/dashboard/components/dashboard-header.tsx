import { ThemedButton } from "@/shared/components/ui/themed-button";

export default function DashboardHeader() {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h1 className="text-4xl font-semibold">Welcome Back</h1>

      <ThemedButton>+ New Workflow</ThemedButton>
    </div>
  );
}
