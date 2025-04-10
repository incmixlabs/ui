import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Flex,
  FormField,
  ReactiveButton,
} from "@incmix/ui"
import { Button, Select, Text } from "@incmix/ui"
import { INTL_API_URL } from "@incmix/ui/constants"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { I18n } from "i18n"
import type React from "react"
import { useState } from "react"
import { z } from "zod"
import type { TranslationMessage } from "./types"
interface AddTranslationDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  onSuccess?: () => void
}

type AddTranslation = Omit<TranslationMessage, "id">
export const AddTranslationDialog: React.FC<AddTranslationDialogProps> = ({
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
        <Button>Add Translation</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <DialogHeader>
          <Dialog.Title>Add Translation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Add new Translation
          </Dialog.Description>
        </DialogHeader>
        <AddTranlationForm onSuccess={onSubmit} />
        <DialogFooter className="gap-2 sm:space-x-0">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </DialogFooter>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const AddTranlationForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const { data: locales, isLoading: localesLoading } = useQuery<
    { code: string; isDefault: boolean }[]
  >({
    queryKey: ["all-locales"],
    queryFn: async () => {
      const res = await fetch(`${INTL_API_URL}/locales`, {
        method: "GET",
        credentials: "include",
        headers: {
          "accept-language": I18n.language ?? "en",
        },
      })
      return await res.json()
    },
  })

  const {
    mutate: addTranslation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: AddTranslation) => {
      const res = await fetch(`${INTL_API_URL}/messages`, {
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

  const form = useForm<AddTranslation>({
    defaultValues: {
      locale: locales?.find((l) => l.isDefault)?.code ?? "",
      namespace: "",
      key: "",
      value: "",
      type: "label",
    },
    onSubmit: ({ value }) => {
      addTranslation(value)
    },
  })

  if (localesLoading) return "Loading Locales..."
  if (!locales?.length) return "No Locales Found"

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
          name="locale"
          validators={{
            onChange: z.string().min(1, "Locale is required"),
          }}
        >
          {(field) => (
            <Flex direction="column" gap="1">
              <Text as="label" size="2" htmlFor={field.name}>
                Locale
              </Text>
              <Select.Root
                value={field.state.value}
                onValueChange={(v) => field.handleChange(v)}
                name={field.name}
              >
                <Select.Trigger placeholder="Select Locale" />
                <Select.Content>
                  {locales.map((locale) => (
                    <Select.Item key={locale.code} value={locale.code}>
                      {locale.code}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          )}
        </form.Field>
        <form.Field
          name="namespace"
          validators={{
            onChange: z.string().min(1, "Namespace is required"),
          }}
        >
          {(field) => (
            <FormField
              name={field.name}
              label="Namespace"
              type="text"
              field={field}
            />
          )}
        </form.Field>
        <form.Field
          name="key"
          validators={{
            onChange: z.string().min(1, "Key is required"),
          }}
        >
          {(field) => (
            <FormField
              name={field.name}
              label="Key"
              type="text"
              field={field}
            />
          )}
        </form.Field>
        <form.Field
          name="value"
          validators={{
            onChange: z.string().min(1, "Value is required"),
          }}
        >
          {(field) => (
            <FormField
              name={field.name}
              label="Value"
              type="text"
              field={field}
            />
          )}
        </form.Field>
        <form.Field
          name="type"
          validators={{
            onChange: z.enum(["frag", "label"]),
          }}
        >
          {(field) => (
            <Flex direction="column" gap="1">
              <Text as="label" size="2" htmlFor={field.name}>
                Type
              </Text>
              <Select.Root
                value={field.state.value}
                onValueChange={(v) => field.handleChange(v as "frag" | "label")}
                name={field.name}
              >
                <Select.Trigger placeholder="Select Type" />
                <Select.Content>
                  {[
                    { label: "Frag", value: "frag" },
                    { label: "Label", value: "label" },
                  ].map((type) => (
                    <Select.Item key={type.value} value={type.value}>
                      {type.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
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
