import AutoForm from "@incmix/ui/auto-form"
import { Button, Dialog, ReactiveButton } from "@incmix/ui/base"
import { INTL_API_URL } from "@incmix/ui/constants"
import { useMutation } from "@tanstack/react-query"
import type React from "react"
import { useState } from "react"
import { localeFormSchema } from "./schemas/locale-form-schema"
import type { Locale } from "./types"
interface AddLocaleDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  onSuccess?: () => void
}

type AddLocale = Locale
export const AddLocaleDialog: React.FC<AddLocaleDialogProps> = ({
  onSuccess,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = () => {
    setIsOpen(false)
    onSuccess?.()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
      <Dialog.Trigger>
        <Button>Add Locale</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add Locale</Dialog.Title>
        </Dialog.Header>
        <Dialog.Description className="sr-only">
          Add new Locale
        </Dialog.Description>
        <AddTranlationForm onSuccess={onSubmit} />
        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const AddTranlationForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const {
    mutate: addLocale,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: AddLocale) => {
      const res = await fetch(`${INTL_API_URL}/locales`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(result.message)

      return data
    },
    onSuccess,
  })

  const handleSubmit = (values: { [key: string]: any }) => {
    addLocale({
      code: values.code as string,
      isDefault: values.isDefault as boolean,
    })
  }

  const defaultValues = {
    code: "",
    isDefault: false,
  }

  return (
    <AutoForm
      formSchema={localeFormSchema.formSchema}
      fieldConfig={localeFormSchema.fieldConfig}
      onSubmit={handleSubmit}
      values={defaultValues}
      className="space-y-4"
    >
      <ReactiveButton
        type="submit"
        loading={isPending}
        success={isSuccess}
        className="w-full"
      >
        Add
      </ReactiveButton>
    </AutoForm>
  )
}
