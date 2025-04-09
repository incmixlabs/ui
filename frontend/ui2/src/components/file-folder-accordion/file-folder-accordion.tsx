import { ArchiveIcon, FileIcon } from "@radix-ui/react-icons"
import type React from "react"
import { Accordion } from "@incmix/ui2"
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
          <Accordion.Item value={path.join("/")} key={path.join("/")}>
            <Accordion.Trigger className="gap-2">
              <FileIcon />
              {leaf.label}
            </Accordion.Trigger>
            <Accordion.Content>{leaf.value}</Accordion.Content>
          </Accordion.Item>
        ),
        folderMap: (folder, children, path) => {
          const items = Array.from(children.values())

          return (
            <Accordion.Item value={path.join("/")} key={path.join("/")}>
              <Accordion.Trigger className="gap-2">
                <ArchiveIcon />
                {folder.label}
              </Accordion.Trigger>
              <Accordion.Content>
                <Accordion.Root type="multiple">{items}</Accordion.Root>
              </Accordion.Content>
            </Accordion.Item>
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
    <Accordion.Root type="multiple" style={style}>
      {createAccordionItems(root)}
    </Accordion.Root>
  )
}
