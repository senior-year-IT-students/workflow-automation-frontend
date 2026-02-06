import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../stores/use-theme-store";
import { useLanguageStore } from "../../stores/use-language-store";

export const InitializeApp = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize theme
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Initialize language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [theme, language, i18n]);

  return <>{children}</>;
};
