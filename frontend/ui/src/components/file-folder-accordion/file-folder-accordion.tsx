import { ArchiveIcon, FileIcon } from "@radix-ui/react-icons"
import type React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion/shadcn-accordion"
import type { EnvironmentVariableRoot } from "./types"
import { mapEnvironmentVariable } from "./utils"

type FileFolderAccordionProps = {
  root: EnvironmentVariableRoot
  style?: React.CSSProperties
}

function createAccordionItems(
  root: EnvironmentVariableRoot
): React.ReactElement[] {
  const items: React.ReactElement[] = Array.from(root.children.entries()).map(
    ([key, id]) => {
      const variable = root.variables.get(id)

      if (!variable) {
        throw new Error(`Could not find child of environment variable ${key}`)
      }

      return mapEnvironmentVariable<React.ReactElement, React.ReactElement>({
        root,
        environmentVariable: variable,
        path: [key],
        leafMap: (leaf, path) => (
          <AccordionItem value={path.join("/")} key={path.join("/")}>
            <AccordionTrigger className="gap-2">
              <FileIcon />
              {leaf.label}
            </AccordionTrigger>
            <AccordionContent>{leaf.value}</AccordionContent>
          </AccordionItem>
        ),
        folderMap: (folder, children, path) => {
          const items = Array.from(children.values())

          return (
            <AccordionItem value={path.join("/")} key={path.join("/")}>
              <AccordionTrigger className="gap-2">
                <ArchiveIcon />
                {folder.label}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple">{items}</Accordion>
              </AccordionContent>
            </AccordionItem>
          )
        },
      })
    }
  )

  return items
}

export const FileFolderAccordion: React.FC<FileFolderAccordionProps> = ({
  root,
  style,
}) => {
  return (
    <Accordion type="multiple" style={style}>
      {createAccordionItems(root)}
    </Accordion>
  )
}
