import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GlobalButtonVariant = "default" | "outline" | "ghost";

interface UiPreferencesState {
  globalButtonVariant: GlobalButtonVariant;
  primaryColor: string;

  setGlobalButtonVariant: (variant: GlobalButtonVariant) => void;
  setPrimaryColor: (color: string) => void;
}

export const useUiPreferencesStore = create<UiPreferencesState>()(
  persist(
    (set) => ({
      globalButtonVariant: "default",
      primaryColor: "#EC4899",

      setGlobalButtonVariant: (variant) =>
        set({ globalButtonVariant: variant }),

      setPrimaryColor: (color) => {
        // update CSS variable globally
        document.documentElement.style.setProperty("--primary", color);
        set({ primaryColor: color });
      },
    }),
    {
      name: "ui-preferences-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.primaryColor) {
          document.documentElement.style.setProperty(
            "--primary",
            state.primaryColor
          );
        }
      },
    }
  )
);
