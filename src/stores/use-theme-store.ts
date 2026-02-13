import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {

  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  syncSystemTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveTheme = (theme: ThemeMode): "light" | "dark" =>
  theme === "system" ? getSystemTheme() : theme;

const applyTheme = (theme: ThemeMode) => {
  const nextResolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", nextResolved === "dark");
  return nextResolved;
};

export const useThemeStore = create<ThemeState>()(
  persist(
  
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",
      toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        const resolvedTheme = applyTheme(nextTheme);
        set({ theme: nextTheme, resolvedTheme });
      },
      setTheme: (theme) => {
        const resolvedTheme = applyTheme(theme);
        set({ theme, resolvedTheme });
      },
      syncSystemTheme: () => {
        if (get().theme !== "system") return;

        const resolvedTheme = applyTheme("system");
        set({ resolvedTheme });
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const resolvedTheme = applyTheme(state.theme);
        state.resolvedTheme = resolvedTheme;
      },
    }
  )
);