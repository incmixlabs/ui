"use client"

import { Tabs, Tabs.Content, TabsList, Tabs.Trigger } from "@components/tabs"
import React from "react"
import { Preview } from "./preview"
import { Write } from "./write"
// TODO: TabsList has an interesting tab focus. Need to investigate on it

const defaultText = "shadcn **ui**.\n\nSupports raw <code>html</code>."

export function FancyArea() {
  const [textValue, setTextValue] = React.useState(defaultText)

  return (
    <Tabs.root defaultValue="write" className="w-full">
      <Tabs.list >
        <Tabs.Trigger value="write">Write</Tabs.Trigger>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
      </TabsList>
      <Tabs.Content value="write">
        <Write {...{ textValue, setTextValue }} />
      </Tabs.Content>
      <Tabs.Content value="preview">
        <Preview {...{ textValue }} />
      </Tabs.Content>
    </Tabs>
  )
}
