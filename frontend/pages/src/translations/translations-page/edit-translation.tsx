import {
  Button,
  Dialog,
  ReactiveButton,
} from "@incmix/ui/base"
import { INTL_API_URL } from "@incmix/ui/constants"
import AutoForm from "@incmix/ui/auto-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"
import { I18n } from "i18n"
import type React from "react"
import type { TranslationMessage } from "./types"
import { translationFormSchema } from "./schemas/translation-form-schema"
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
          <Dialog.Description className="sr-only">
            Edit Translation
          </Dialog.Description>
        </Dialog.Header>
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
  
  const handleSubmit = (values: { [key: string]: any }) => {
    // Make sure to preserve the id in the edit operation
    editTranslation({
      id: item.id,
      locale: values.locale as string,
      namespace: values.namespace as string,
      key: values.key as string,
      value: values.value as string,
      type: values.type as "frag" | "label",
    })
  }

  if (localesLoading) return "Loading Locales..."
  if (!locales?.length) return "No Locales Found"
  
  // Create a customized schema with dynamic locale options
  const customizedSchema = {
    ...translationFormSchema,
    fieldConfig: {
      ...translationFormSchema.fieldConfig,
      locale: {
        ...translationFormSchema.fieldConfig.locale,
        options: locales.map(locale => ({ 
          label: locale.code, 
          value: locale.code 
        })),
      },
    },
  }

  return (
    <AutoForm
      formSchema={translationFormSchema.formSchema}
      fieldConfig={customizedSchema.fieldConfig}
      onSubmit={handleSubmit}
      values={item}
      className="space-y-4"
    >
      <ReactiveButton 
        type="submit" 
        loading={isPending} 
        success={isSuccess}
        className="w-full"
      >
        Save
      </ReactiveButton>
    </AutoForm>
  )
}
