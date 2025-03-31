"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/tabs"
import React from "react"
import { Preview } from "./preview"
import { Write } from "./write"
// TODO: TabsList has an interesting tab focus. Need to investigate on it

const defaultText = "shadcn **ui**.\n\nSupports raw <code>html</code>."

export function FancyArea() {
  const [textValue, setTextValue] = React.useState(defaultText)

  return (
    <Tabs defaultValue="write" className="w-full">
      <TabsList>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write">
        <Write {...{ textValue, setTextValue }} />
      </TabsContent>
      <TabsContent value="preview">
        <Preview {...{ textValue }} />
      </TabsContent>
    </Tabs>
  )
}
