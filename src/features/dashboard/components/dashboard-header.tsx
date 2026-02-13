import { ThemedButton as Button } from "@/shared/components/ui/themed-button";
import { useUiPreferencesStore } from "@/stores/use-ui-preferences-store";

export default function DashboardHeader() {
  const globalButtonVariant = useUiPreferencesStore(
    (state) => state.globalButtonVariant,
  );

  return (
    <div className="mb-5 flex items-center justify-between">
      <h1 className="text-4xl font-semibold">Welcome Back</h1>

      <Button variant={globalButtonVariant}>+ New Workflow</Button>
    </div>
  );
}
