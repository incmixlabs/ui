// @ts-nocheck
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"

import { I18n } from "@i18n"
import {Button, Dialog, Flex, Form, ReactiveButton, Select, Text} from "@incmix/ui"
import { INTL_API_URL } from "@incmix/ui/constants"
import type { TranslationMessage } from "./types"
interface EditTranslationDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  item?: Row<TranslationMessage>["original"]
  onSuccess?: () => void
}

type EditTranslation = TranslationMessage
export const EditTranslationDialog: React.FC<EditTranslationDialogProps> = ({
  onSuccess,
  item,
  ...props
}) => {
  if (!item) return null
  return (
    <Dialog.Root {...props}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit Translation</Dialog.Title>
        </Dialog.Header>
        <Dialog.Description className="sr-only">
          Edit Translation
        </Dialog.Description>
        <EditTranlationForm item={item} onSuccess={onSuccess} />
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

const EditTranlationForm: React.FC<{
  onSuccess?: () => void
  item: EditTranslation
}> = ({ onSuccess, item }) => {
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
    mutate: editTranslation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: EditTranslation) => {
      const res = await fetch(`${INTL_API_URL}/messages`, {
        method: "put",
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

  const form = useForm<EditTranslation, any, any, any, any, any, any, any, any, any>({
    defaultValues: item,
    onSubmit: ({ value }) => {
      editTranslation(value)
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
            <Form.Field
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
            <Form.Field
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
            <Form.Field
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
          Save
        </ReactiveButton>
      </Flex>
    </form>
  )
}
