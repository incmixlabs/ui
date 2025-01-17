import { Switch } from "@radix-ui/themes"
import { useCallback } from "react"

type EditSwitchProps = {
  defaultEditing?: boolean
  onCheckedChange: (checked: boolean) => void
}

export function EditSwitch({
  defaultEditing = false,
  onCheckedChange,
}: EditSwitchProps) {
  const handleChange = useCallback(
    (checked: boolean) => {
      onCheckedChange(checked)
    },
    [onCheckedChange]
  )

  return (
    <Switch defaultChecked={defaultEditing} onCheckedChange={handleChange} />
  )
}
