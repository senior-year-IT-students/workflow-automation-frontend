import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GlobalButtonVariant = "default" | "outline" | "ghost";

interface UiPreferencesState {
  globalButtonVariant: GlobalButtonVariant;
  primaryColor: string; // HSL VALUE ONLY (example: "340 82% 66%")

  setGlobalButtonVariant: (variant: GlobalButtonVariant) => void;
  setPrimaryColor: (color: string) => void;
}

function applyPrimaryColor(color: string) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  const parts = color.trim().split(" ");
  if (parts.length !== 3) return;

  const lightness = parseFloat(parts[2]);
  if (isNaN(lightness)) return;

  // 🔥 غير البراند وليس primary
  root.style.setProperty("--brand", color);
  root.style.setProperty("--ring", color);

  const foreground =
    lightness > 60
      ? "240 10% 4%"
      : "0 0% 100%";

  root.style.setProperty("--brand-foreground", foreground);
}


export const useUiPreferencesStore = create<UiPreferencesState>()(
  persist(
    (set) => ({
      globalButtonVariant: "default",
      primaryColor: "340 82% 66%",

      setGlobalButtonVariant: (variant) =>
        set({ globalButtonVariant: variant }),

      setPrimaryColor: (color) => {
        applyPrimaryColor(color);
        set({ primaryColor: color });
      },
    }),
    {
      name: "ui-preferences-storage",

      onRehydrateStorage: () => (state) => {
        if (state?.primaryColor) {
          applyPrimaryColor(state.primaryColor);
        }
      },
    }
  )
);
