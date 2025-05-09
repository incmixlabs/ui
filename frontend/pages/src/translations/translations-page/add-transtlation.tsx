import AutoForm from "@incmix/ui/auto-form"
import { Button, Dialog, ReactiveButton } from "@incmix/ui/base"
import { INTL_API_URL } from "@incmix/ui/constants"
import { useMutation, useQuery } from "@tanstack/react-query"
import { I18n } from "i18n"
import type React from "react"
import { useState } from "react"
import { translationFormSchema } from "./schemas/translation-form-schema"
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
        <Dialog.Header>
          <Dialog.Title>Add Translation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Add new Translation
          </Dialog.Description>
        </Dialog.Header>
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
  // Query to fetch available locales
  const { data: locales = [], isLoading: localesLoading } = useQuery<
    { code: string; isDefault: boolean }[]
  >({
    queryKey: ["all-locales"],
    queryFn: async () => {
      try {
        const res = await fetch(`${INTL_API_URL}/locales`, {
          method: "GET",
          credentials: "include",
          headers: {
            "accept-language": I18n.language ?? "en",
          },
        })
        return await res.json()
      } catch (error) {
        console.error("Error fetching locales:", error)
        return [] // Return empty array on error
      }
    },
  })

  // Mutation to add a new translation
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

  // Handle form submission
  const handleSubmit = (values: { [key: string]: any }) => {
    addTranslation({
      locale: values.locale as string,
      namespace: values.namespace as string,
      key: values.key as string,
      value: values.value as string,
      type: values.type as "frag" | "label",
    })
  }

  if (localesLoading) return "Loading Locales..."
  if (!locales?.length) return "No Locales Found"

  // Create the initial values with the default locale
  const initialValues = {
    locale: locales.find((l) => l.isDefault)?.code ?? "",
    namespace: "",
    key: "",
    value: "",
    type: "label",
  }

  // Use the predefined field config from the schema file
  // This is the same approach used in add-locale.tsx which works correctly
  const fieldConfig = {
    ...translationFormSchema.fieldConfig,
    // Only override the locale field to add dynamic options based on the API response
    locale: {
      ...translationFormSchema.fieldConfig.locale,
      // Add options directly on the field config, matching the pattern used by the type field
      options: locales.map((locale) => ({
        label: locale.code,
        value: locale.code,
      })),
    },
  }

  return (
    <AutoForm
      formSchema={translationFormSchema.formSchema}
      fieldConfig={fieldConfig}
      onSubmit={handleSubmit}
      values={initialValues}
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
