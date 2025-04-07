"use client"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  FormField,
  ReactiveButton,
  toast,
} from "@incmix/ui"
import type { UserAndProfile } from "@incmix/utils/types"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { setPassword } from "./actions"

interface PasswordDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  items: Row<UserAndProfile>["original"][]
  onSuccess?: () => void
}

export function PasswordDialog({
  items,
  onSuccess,
  ...props
}: PasswordDialogProps) {
  const { t } = useTranslation(["login", "settings"])
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: setPassword,
    onSuccess: (data) => {
      qc.refetchQueries({ queryKey: ["user-list"] })
      toast.success(data.message)
      if (onSuccess) onSuccess()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm({
    defaultValues: {
      password: "",
    },
    onSubmit: ({ value }) => {
      mutate({ id: items[0].id, value: value.password })
    },
  })

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change User Password</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Flex direction="column" gap="4">
            <form.Field
              name="password"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z.string().min(1, t("login:passwordValidation")),
              }}
            >
              {(field) => (
                <FormField
                  name="password"
                  label={t("settings:newPassword")}
                  type="password"
                  field={field}
                />
              )}
            </form.Field>

            <ReactiveButton
              type="submit"
              color="blue"
              loading={isPending}
              success={isSuccess}
              className="w-full"
            >
              {t("settings:changePassword")}
            </ReactiveButton>
          </Flex>
        </form>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
