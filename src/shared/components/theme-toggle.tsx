import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../stores/use-theme-store";
import { Button } from "./ui/button";


export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button onClick={toggleTheme} className="h-9 w-9">
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
