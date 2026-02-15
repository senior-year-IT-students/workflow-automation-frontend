import { Button, type ButtonProps } from "./button";
import { useUiPreferencesStore } from "../../../stores/use-ui-preferences-store";

export function ThemedButton({ variant, ...props }: ButtonProps) {
  const { globalButtonVariant } = useUiPreferencesStore();

  return <Button {...props} variant={variant ?? globalButtonVariant} />;
}

