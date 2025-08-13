import {
  Button,
  Accordion,
  Separator
} from "@/base"
import { Plus, Trash } from "lucide-react"
import { useFieldArray, type useForm } from "react-hook-form"
import type { z } from "zod"
import { beautifyObjectName } from "../utils"
import AutoFormObject from "./object"

export default function AutoFormArray({
  name,
  item,
  form,
  path = [],
  fieldConfig,
}: {
  name: string
  item: z.ZodArray<any>
  form: ReturnType<typeof useForm>
  path?: string[]
  fieldConfig?: any
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  })
  const title = (item as any)._def?.description ?? beautifyObjectName(name)

  return (
    <Accordion.Item value={name} className="border-none">
      <Accordion.Trigger>{title}</Accordion.Trigger>
      <Accordion.Content>
        {fields.map((_field, index) => {
          const key = [...path, index.toString()].join(".")
          return (
            <div className="mt-4 flex flex-col" key={`${key}`}>
              <AutoFormObject
                schema={(item as any)._def?.type as z.ZodObject<any, any>}
                form={form}
                fieldConfig={fieldConfig}
                path={[...path, index.toString()]}
              />
              <div className="my-4 flex justify-end">
                <Button
                  // variant="secondary"
                  // size="icon"
                  type="button"
                  className="hover:bg-zinc-300 hover:text-black focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:text-black dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 dark:hover:bg-zinc-300 dark:hover:text-black dark:hover:ring-0 dark:hover:ring-offset-0"
                  onClick={() => remove(index)}
                >
                  <Trash className="size-4 " />
                </Button>
              </div>

              <Separator />
            </div>
          )
        })}
        <Button
          type="button"
          // variant="secondary"
          onClick={() => append({})}
          className="mt-4 flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add
        </Button>
      </Accordion.Content>
    </Accordion.Item>
  )
}
