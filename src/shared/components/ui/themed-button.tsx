import { Button, type ButtonProps } from "./button";
import { useUiPreferencesStore } from "../../../stores/use-ui-preferences-store";

export function ThemedButton(props: ButtonProps) {
  const { globalButtonVariant } = useUiPreferencesStore();
  return <Button {...props} variant={globalButtonVariant} />;
}
