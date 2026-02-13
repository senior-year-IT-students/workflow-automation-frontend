import { useEffect } from "react";
import { Check, Moon, Sun, Palette, X } from "lucide-react";
import { Switch } from "../../../shared/components/ui/switch";
import { type ThemeMode } from "../../../stores/use-theme-store";
import { useUiPreferencesStore } from "../../../stores/use-ui-preferences-store";

type ColorOption = {
  label: string;
  value: string;
};

type ThemeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  onThemeChange: (theme: ThemeMode) => void;
  primaryColor: string;
  colors: ColorOption[];
  onPrimaryColorChange: (value: string) => void;
};

export default function ThemeDialog({
  isOpen,
  onClose,
  resolvedTheme,
  onThemeChange,
  primaryColor,
  colors,
  onPrimaryColorChange,
}: ThemeDialogProps) {
  const { globalButtonVariant, setGlobalButtonVariant } =
    useUiPreferencesStore();

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[520px] rounded-2xl border shadow-xl p-6 ${
          isDark ? "bg-[#0B1220] border-[#1E293B]" : "bg-white border-[#E5E7EB]"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute right-5 top-5 ${
            isDark
              ? "text-slate-400 hover:text-white"
              : "text-gray-400 hover:text-black"
          }`}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Moon className="h-4 w-4 opacity-70" />
            <h2
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Theme
            </h2>
          </div>

          <p
            className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}
          >
            Customize the appearance of your workspace.
          </p>
        </div>

        {/* Appearance */}
        <div className="mb-6">
          <h3
            className={`mb-3 text-sm font-medium ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Appearance
          </h3>

          <div
            className={`flex items-center justify-between rounded-xl px-4 py-2 ${
              isDark ? "bg-[#0F172A]" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => onThemeChange("light")}
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>

            <Switch
              checked={resolvedTheme === "dark"}
              onCheckedChange={(v) => onThemeChange(v ? "dark" : "light")}
            />

            <button
              onClick={() => onThemeChange("dark")}
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Primary Color */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 opacity-70" />
            <h3
              className={`text-sm font-medium ${
                isDark ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Primary Color
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {colors.map((color) => {
              const active = primaryColor === color.value;

              return (
                <button
                  key={color.value}
                  onClick={() => onPrimaryColorChange(color.value)}
                  className={`relative rounded-xl border p-4 text-center transition ${
                    active
                      ? isDark
                        ? "border-white/20 bg-[#111827]"
                        : "border-blue-400 bg-blue-50"
                      : isDark
                        ? "border-[#1E293B] bg-[#0F172A] hover:border-slate-500"
                        : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="relative flex justify-center mb-2">
                    <div
                      className="h-10 w-10 rounded-full shadow-md"
                      style={{ backgroundColor: color.value }}
                    />

                    {active && (
                      <Check className="absolute right-2 top-2 h-4 w-4 text-blue-500" />
                    )}
                  </div>

                  <span
                    className={`text-sm ${
                      isDark ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    {color.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3
            className={`mb-3 text-sm font-medium ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Preview
          </h3>

          <div
            className={`rounded-xl border p-4 ${
              isDark
                ? "border-[#1E293B] bg-[#0F172A]"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            {/* Variant Buttons */}
            <div className="flex gap-3 mb-4">
              {/* Primary */}
              <button
                onClick={() => setGlobalButtonVariant("default")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  globalButtonVariant === "default"
                    ? "ring-2 ring-offset-2"
                    : ""
                }`}
                style={
                  {
                    backgroundColor: primaryColor,
                    color: "white",
                    ...(globalButtonVariant === "default"
                      ? { "--tw-ring-color": primaryColor }
                      : {}),
                  } as React.CSSProperties
                }
              >
                Primary Button
              </button>

              {/* Outline */}
              <button
                onClick={() => setGlobalButtonVariant("outline")}
                className={`px-4 py-2 rounded-full text-sm font-medium border bg-transparent transition ${
                  globalButtonVariant === "outline"
                    ? "ring-2 ring-offset-2"
                    : ""
                }`}
                style={
                  {
                    borderColor: primaryColor,
                    color: primaryColor,
                    backgroundColor: "transparent",
                    ...(globalButtonVariant === "outline"
                      ? { "--tw-ring-color": primaryColor }
                      : {}),
                  } as React.CSSProperties
                }
              >
                Outline
              </button>
              {/* Ghost */}
              <button
                onClick={() => setGlobalButtonVariant("ghost")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  globalButtonVariant === "ghost" ? "ring-2 ring-offset-2" : ""
                }`}
                style={
                  {
                    color: primaryColor,
                    ...(globalButtonVariant === "ghost"
                      ? { "--tw-ring-color": primaryColor }
                      : {}),
                  } as React.CSSProperties
                }
              >
                Ghost
              </button>
            </div>

            <p
              className={`mb-3 text-xs ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Click a preview button to apply it globally across the system.
            </p>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-[140px] rounded-full ${
                  isDark ? "bg-[#1E293B]" : "bg-gray-300"
                }`}
              >
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: "70%",
                    backgroundColor: primaryColor,
                  }}
                />
              </div>
              <span
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Progress indicator
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
