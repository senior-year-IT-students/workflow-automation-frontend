import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../stores/use-theme-store";
import { useLanguageStore } from "../../stores/use-language-store";

export const InitializeApp = ({ children }: { children: React.ReactNode }) => {const { theme, syncSystemTheme } = useThemeStore();
  const { language } = useLanguageStore();
  const { i18n } = useTranslation();

 useEffect(() => {  syncSystemTheme();

    // Initialize language
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      syncSystemTheme();
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [syncSystemTheme, theme]);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    i18n.changeLanguage(language); }, [language, i18n]);

  return <>{children}</>;
};