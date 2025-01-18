"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  ReactiveButton,
  toast,
} from "@incmix/ui"
import type { UserAndProfile } from "@jsprtmnn/utils/types"
import { Button, Flex } from "@radix-ui/themes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"
import { Form } from "houseform"
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
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change User Password</DialogTitle>
        </DialogHeader>
        <Form
          onSubmit={(values) => {
            mutate({ id: items[0].id, value: values.password })
          }}
        >
          {({ submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <Flex direction="column" gap="4">
                <FormField
                  name="password"
                  label={t("settings:newPassword")}
                  type="password"
                  validation={z.string().min(1, t("login:passwordValidation"))}
                />

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
          )}
        </Form>
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
