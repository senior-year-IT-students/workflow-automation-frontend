import { Plus, Sparkles, UserRound } from "lucide-react";
import React, { useMemo } from "react";
import { ThemedButton } from "@/shared/components/ui/themed-button";
import { useThemeStore } from "@/stores/use-theme-store";
import { useUiPreferencesStore } from "@/stores/use-ui-preferences-store";
import { toRgba } from "../utilites/to-rgba";



export default function TeamPage() {
  const { resolvedTheme } = useThemeStore();
  const { primaryColor } = useUiPreferencesStore();

  const circleBg = useMemo(
    () => toRgba(primaryColor, resolvedTheme === "dark" ? 0.25 : 0.18),
    [primaryColor, resolvedTheme],
  );

  return (
    <main className="flex h-full w-full items-center justify-center">
      <section className="flex max-w-[820px] flex-col items-center text-center">
        <div
          className="relative mb-8 mt-4 h-[140px] w-[140px] rounded-full border border-dashed"
          style={{
            borderColor: primaryColor,
            backgroundColor: circleBg,
          }}
        >
          <button className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-white shadow dark:bg-accent">
            <Plus className="h-4 w-4" />
          </button>

          <div
            className="absolute -left-5 top-1 grid h-8 w-8 place-items-center rounded-full text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <UserRound className="h-4 w-4" />
          </div>

          <div
            className="absolute -bottom-3 -right-5 grid h-8 w-8 place-items-center rounded-full text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-semibold">No Team Yet</h2>
        <p className="max-w-[600px] text-sm text-muted-foreground">
          create your team, invite collaborators, and supercharge your
          workflows.
        </p>

        <ThemedButton className="mt-8 gap-2 rounded-2xl px-6 py-2.5 text-[14px] font-semibold">
          <Plus className="h-4 w-4 " />
          create your team
        </ThemedButton>
      </section>
    </main>
  );
}
