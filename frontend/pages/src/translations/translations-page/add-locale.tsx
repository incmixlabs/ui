import {
  Button,
  Dialog,
  Flex,
  FormField,
  ReactiveButton,
  Switch,
  Text,
} from "@incmix/ui/base"
import { INTL_API_URL } from "@incmix/ui/constants"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import type React from "react"
import { useState } from "react"
import { z } from "zod"
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
        <Dialog.Footer className="gap-2 sm:space-x-0">
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

  const form = useForm<AddLocale>({
    defaultValues: {
      code: "",
      isDefault: false,
    },
    onSubmit: ({ value }) => {
      addLocale(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Flex direction="column" gap="4">
        <form.Field
          name="code"
          validators={{
            onChange: z.string().min(1, "Code is required"),
          }}
        >
          {(field) => (
            <FormField
              name={field.name}
              label="Code"
              type="text"
              field={field}
            />
          )}
        </form.Field>
        <form.Field name="isDefault">
          {(field) => (
            <Flex align="center" gap="2">
              <Text as="label" size="2" htmlFor={field.name}>
                Is Default?
              </Text>
              <Switch
                checked={field.state.value}
                onCheckedChange={(value) => field.handleChange(value)}
              />
            </Flex>
          )}
        </form.Field>

        <ReactiveButton type="submit" loading={isPending} success={isSuccess}>
          Add
        </ReactiveButton>
      </Flex>
    </form>
  )
}
