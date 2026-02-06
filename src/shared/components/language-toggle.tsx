import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../../stores/use-language-store";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguageStore();
  const { i18n } = useTranslation();

  const handleToggle = () => {
    toggleLanguage();
    i18n.changeLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button onClick={handleToggle} className="h-9 w-9">
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        {language === "en" ? "Switch to Arabic" : "Switch to English"}
      </span>
    </Button>
  );
};
