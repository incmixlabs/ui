import { Badge } from "@/components/radixui/badge"
import { Card } from "@/components/radixui/card"
import { Dialog } from "@/components/radixui/dialog"
import { DropdownMenu } from "@/components/radixui/dropdown-menu"
import { Flex } from "@/components/radixui/flex"
import { RadioGroup } from "@/components/radixui/radio-group"
import { Separator } from "@/components/radixui/separator"
import { Tabs } from "@/components/radixui/tabs"
import { Accordion } from "@/components/shadcn/accordion"
import { Button as ShadcnButton } from "@/components/shadcn/button"
import { Calendar } from "@/components/shadcn/calendar"
import { Command } from "@/components/shadcn/command"
import { Form } from "@/components/shadcn/form"
import { Pagination } from "@/components/shadcn/pagination"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Avatar } from "@/components/radixui/avatar"
import { Button } from "@/components/radixui/button/button"
import { MainLayout } from "../layout/MainLayout"

export function ComponentShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = React.useState("accordion")

  // Form setup
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    radio: z.enum(["option1", "option2", "option3"]),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      radio: "option1",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  // Handle sidebar navigation
  const handleComponentChange = (id: string) => {
    setActiveTab(id)
  }

  return (
    <MainLayout
      activeComponent={activeTab}
      onComponentChange={handleComponentChange}
    >
      <div className="container p-8">
        <h1 className="mb-8 font-bold text-3xl">Components Showcase</h1>

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-12 w-full"
        >
          <div className="hidden">
            <Tabs.List className="mb-4">
              <Tabs.Trigger value="accordion">Accordion</Tabs.Trigger>
              <Tabs.Trigger className="bold" value="badge">
                Badge
              </Tabs.Trigger>
              <Tabs.Trigger value="button">Button</Tabs.Trigger>
              <Tabs.Trigger className="bold" value="button">
                Button
              </Tabs.Trigger>
              <Tabs.Trigger value="calendar">Calendar</Tabs.Trigger>
              <Tabs.Trigger value="card">Card</Tabs.Trigger>
              <Tabs.Trigger value="command">Command</Tabs.Trigger>
              <Tabs.Trigger value="dialog">Dialog</Tabs.Trigger>
              <Tabs.Trigger value="dropdown">Dropdown</Tabs.Trigger>
              <Tabs.Trigger value="form">Form</Tabs.Trigger>
              <Tabs.Trigger value="radio">Radio</Tabs.Trigger>
              <Tabs.Trigger value="separator">Separator</Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Accordion */}
          <Tabs.Content value="accordion" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Accordion</h2>
            <Accordion.Root type="single" collapsible className="w-full">
              <Accordion.Item value="item-1">
                <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-2">
                <Accordion.Trigger>Is it styled?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. It comes with default styles that matches the other
                  components.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-3">
                <Accordion.Trigger>Is it animated?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </Tabs.Content>
        {/* Avatar */}
        <Tabs.Content value="radix-avatar" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">RadixUI Avatar</h2>
            <Flex align="center" gap="4">
              <Avatar
                size="1"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
              />
              <Avatar
                size="2"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
              />
              <Avatar variant="solid" fallback="A" />
              <Avatar variant="soft" fallback="A" />
              <Avatar variant="solid" color="indigo" fallback="A" />
              <Avatar variant="solid" color="cyan" fallback="A" />
              <Avatar variant="solid" color="orange" fallback="A" />
              <Avatar variant="solid" color="crimson" fallback="A" />
            </Flex>
          </Tabs.Content>
          {/* Badge */}
          <Tabs.Content value="badge" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Badge</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Tabs.Content>

          {/* Button */}
          <Tabs.Content value="button" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Button</h2>
            <div className="flex flex-wrap gap-4">
              <ShadcnButton>Default</ShadcnButton>
              <ShadcnButton variant="secondary">Secondary</ShadcnButton>
              <ShadcnButton variant="destructive">Destructive</ShadcnButton>
              <ShadcnButton variant="outline">Outline</ShadcnButton>
              <ShadcnButton variant="ghost">Ghost</ShadcnButton>
              <ShadcnButton variant="link">Link</ShadcnButton>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <ShadcnButton size="sm">Small</ShadcnButton>
              <ShadcnButton size="lg">Large</ShadcnButton>
            </div>
          </Tabs.Content>
          {/* Button */}
          <Tabs.Content value="radix-button" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">RadixUI Button</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="classic">Classic</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="1">Size 1</Button>
              <Button size="2">Size 2</Button>
              <Button size="3">Size 3</Button>
            </div>
          </Tabs.Content>

          {/* Calendar */}
          <Tabs.Content value="calendar" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Calendar</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </Tabs.Content>

          {/* Card */}
          <Tabs.Content value="card" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Card</h2>
            <Card.Root className="w-[350px]">
              <Card.Title>Card Title</Card.Title>
              <Card.Description>Card Description</Card.Description>

              <Card.Content>
                <p>Card Content</p>
              </Card.Content>
              <Card.Footer>
                <p>Card Footer</p>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>

          {/* Command */}
          <Tabs.Content value="command" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Command</h2>
            <Command.Root className="rounded-lg border shadow-md">
              <Command.Input placeholder="Type a command or search..." />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group heading="Suggestions">
                  <Command.Item>Calendar</Command.Item>
                  <Command.Item>Search</Command.Item>
                  <Command.Item>Settings</Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Actions">
                  <Command.Item>
                    New File
                    <Command.Shortcut>⌘N</Command.Shortcut>
                  </Command.Item>
                  <Command.Item>
                    Open
                    <Command.Shortcut>⌘O</Command.Shortcut>
                  </Command.Item>
                  <Command.Item>
                    Save
                    <Command.Shortcut>⌘S</Command.Shortcut>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command.Root>
          </Tabs.Content>

          {/* Dialog */}
          <Tabs.Content value="dialog" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Dialog</h2>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>Open Dialog</Button>
              </Dialog.Trigger>
              <Dialog.Content className="sm:max-w-[425px]">
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description>
                  This is a dialog description. You can provide more information
                  about this dialog here.
                </Dialog.Description>
                <div className="grid gap-4 py-4">
                  <p>Dialog content goes here.</p>
                </div>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button>Save changes</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </Tabs.Content>

          {/* Dropdown Menu */}
          <Tabs.Content value="dropdown" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Dropdown Menu</h2>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button>Open Dropdown</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-56">
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Profile</DropdownMenu.Item>
                <DropdownMenu.Item>Billing</DropdownMenu.Item>
                <DropdownMenu.Item>Team</DropdownMenu.Item>
                <DropdownMenu.Item>Subscription</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Tabs.Content>

          {/* Form */}
          <Tabs.Content value="form" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Form</h2>
            <Form.Root {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-8"
              >
                <Form.Field
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>Username</Form.Label>
                      <Form.Control>
                        <input
                          placeholder="Enter username"
                          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                          {...field}
                        />
                      </Form.Control>
                      <Form.Description>
                        This is your public display name.
                      </Form.Description>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form.Root>
          </Tabs.Content>
          {/* Pagination */}
          <Tabs.Content value="pagination" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Pagination</h2>
            <Pagination.Root>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous href="#" />
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Link href="#">1</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Link href="#" isActive>
                    2
                  </Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Link href="#">3</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Next href="#" />
                </Pagination.Item>
              </Pagination.Content>
            </Pagination.Root>
          </Tabs.Content>
          {/* Radio Group */}
          <Tabs.Content value="radio" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Radio Group</h2>
            <RadioGroup.Root defaultValue="1" name="example">
              <RadioGroup.Item value="1">Default</RadioGroup.Item>
              <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
              <RadioGroup.Item value="3">Compact</RadioGroup.Item>
            </RadioGroup.Root>
          </Tabs.Content>

          {/* Separator */}
          <Tabs.Content value="separator" className="space-y-4">
            <h2 className="mb-4 font-semibold text-2xl">Separator</h2>
            <div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm leading-none">
                  Separator Example
                </h4>
                <p className="text-muted-foreground text-sm">
                  A component for visually separating content.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Profile</div>
                <Separator orientation="vertical" />
                <div>Settings</div>
                <Separator orientation="vertical" />
                <div>Logout</div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </MainLayout>
  )
}
