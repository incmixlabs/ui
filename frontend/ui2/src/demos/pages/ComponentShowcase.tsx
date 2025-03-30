import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn/accordion';
import { Badge } from '@/components/shadcn/badge';
import { Button as ShadcnButton } from '@/components/shadcn/button';
import { Flex } from '@/components/radixui/flex';
import { Calendar } from '@/components/shadcn/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/shadcn/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcn/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { Label } from '@/components/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/radio-group';
import { Separator } from '@/components/shadcn/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Avatar } from '@/components/radixui/avatar';
import { Button } from '@/components/radixui/button/button';
import { MainLayout } from '../layout/MainLayout';

export function ComponentShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = React.useState('accordion');

  // Form setup
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    radio: z.enum(['option1', 'option2', 'option3']),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      radio: 'option1',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // Handle sidebar navigation
  const handleComponentChange = (id: string) => {
    setActiveTab(id);
  };

  return (
    <MainLayout
      activeComponent={activeTab}
      onComponentChange={handleComponentChange}
    >
      <div className="container p-8">
        <h1 className="text-3xl font-bold mb-8">Components Showcase</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
          <div className="hidden">
            <TabsList className="mb-4">
              <TabsTrigger value="accordion">Accordion</TabsTrigger>
              <TabsTrigger value="badge">Badge</TabsTrigger>
              <TabsTrigger value="button">Button</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="command">Command</TabsTrigger>
              <TabsTrigger value="dialog">Dialog</TabsTrigger>
              <TabsTrigger value="dropdown">Dropdown</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="radio">Radio</TabsTrigger>
              <TabsTrigger value="separator">Separator</TabsTrigger>
            </TabsList>
          </div>

        {/* Accordion */}
        <TabsContent value="accordion" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* Badge */}
        <TabsContent value="badge" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Badge</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </TabsContent>

        {/* Button */}
        <TabsContent value="button" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Button</h2>
          <div className="flex flex-wrap gap-4">
            <ShadcnButton>Default</ShadcnButton>
            <ShadcnButton variant="secondary">Secondary</ShadcnButton>
            <ShadcnButton variant="destructive">Destructive</ShadcnButton>
            <ShadcnButton variant="outline">Outline</ShadcnButton>
            <ShadcnButton variant="ghost">Ghost</ShadcnButton>
            <ShadcnButton variant="link">Link</ShadcnButton>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <ShadcnButton size="sm">Small</ShadcnButton>
            <ShadcnButton size="lg">Large</ShadcnButton>
          </div>
        </TabsContent>
        {/* Button */}
        <TabsContent value="radix-button" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">RadixUI Button</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="classic">Classic</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="1">Size 1</Button>
            <Button size="2">Size 2</Button>
            <Button size="3">Size 3</Button>
          </div>
        </TabsContent>
        {/* Avatar */}
        <TabsContent value="radix-avatar" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">RadixUI Avatar</h2>
          <Flex align="center" gap="4">
            <Avatar
              size="1"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
            <Avatar
              size="2"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"/>
            <Avatar variant="solid" fallback="A" />
            <Avatar variant="soft" fallback="A" />
            <Avatar variant="solid" color="indigo" fallback="A" />
            <Avatar variant="solid" color="cyan" fallback="A" />
            <Avatar variant="solid" color="orange" fallback="A" />
            <Avatar variant="solid" color="crimson" fallback="A" />
          </Flex>
        </TabsContent>
        {/* Calendar */}
        <TabsContent value="calendar" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </TabsContent>

        {/* Card */}
        <TabsContent value="card" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Card</h2>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Command */}
        <TabsContent value="command" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Command</h2>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>
                  New File
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Open
                  <CommandShortcut>⌘O</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Save
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </TabsContent>

        {/* Dialog */}
        <TabsContent value="dialog" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <ShadcnButton>Open Dialog</ShadcnButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog description. You can provide more information about this dialog here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p>Dialog content goes here.</p>
              </div>
              <DialogFooter>
                <ShadcnButton>Save changes</ShadcnButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Dropdown Menu */}
        <TabsContent value="dropdown" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Dropdown Menu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ShadcnButton>Open Dropdown</ShadcnButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsContent>

        {/* Form */}
        <TabsContent value="form" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Form</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <input
                        placeholder="Enter username"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ShadcnButton type="submit">Submit</ShadcnButton>
            </form>
          </Form>
        </TabsContent>

        {/* Radio Group */}
        <TabsContent value="radio" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Radio Group</h2>
          <Form {...form}>
            <form className="w-2/3">
              <FormField
                control={form.control}
                name="radio"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select an option</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option1" id="option1" />
                          <Label htmlFor="option1">Option 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option2" id="option2" />
                          <Label htmlFor="option2">Option 2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option3" id="option3" />
                          <Label htmlFor="option3">Option 3</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </TabsContent>

        {/* Separator */}
        <TabsContent value="separator" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Separator</h2>
          <div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Separator Example</h4>
              <p className="text-sm text-muted-foreground">
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
        </TabsContent>
      </Tabs>
    </div>
    </MainLayout>
  );
}
