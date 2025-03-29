import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/radixui/button/button';
import { IconButton } from '@/components/radixui/button/icon-button';
import { ReactiveButton } from '@/components/radixui/button/reactive-button';
import { SplitButton } from '@/components/radixui/button/split-button';
import { Card } from '@/components/radixui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/radixui/popover';
import { Radio } from '@/components/radixui/radio';
import { Checkbox } from '@/components/radixui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/radixui/radio-group';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/radixui/checkbox-group';
import { Callout } from '@/components/radixui/callout';
import { Flex } from '@/components/radixui/flex';
import { Grid } from '@/components/radixui/grid';
import { AspectRatio } from '@/components/radixui/aspect-ratio';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/radixui/context-menu';
import { Container } from '@/components/radixui/container';

export function RadixUIComponentShowcase() {
  const [activeTab, setActiveTab] = React.useState('button');

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
        <h1 className="text-3xl font-bold mb-8">RadixUI Components Showcase</h1>

        <div className="flex flex-col gap-12">
          {/* Buttons */}
          <section id="button" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default Button</Button>
              <Button variant="solid">Solid Button</Button>
              <Button variant="soft">Soft Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <IconButton size="1" variant="soft">
                <span>🔍</span>
              </IconButton>
              <IconButton size="2" variant="outline">
                <span>📌</span>
              </IconButton>
              <IconButton size="3" variant="solid">
                <span>⚙️</span>
              </IconButton>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <ReactiveButton>Reactive Button</ReactiveButton>
              <SplitButton>Split Button</SplitButton>
            </div>
          </section>

          {/* Card */}
          <section id="card" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Card</h2>
            <Card size="2" style={{ width: 350 }}>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Card Component</h3>
                <p className="text-sm text-gray-600">This is a RadixUI card component. It's simple and customizable.</p>
              </div>
            </Card>
          </section>

          {/* Popover */}
          <section id="popover" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Popover</h2>
            <Popover>
              <PopoverTrigger>
                <Button>Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-2">Popover Content</h3>
                  <p className="text-xs">This is the content of the popover.</p>
                </div>
              </PopoverContent>
            </Popover>
          </section>

          {/* Checkbox & Radio */}
          <section id="checkbox-radio" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Checkbox & Radio</h2>
            <div className="flex gap-12">
              <div>
                <h3 className="text-lg font-medium mb-2">Checkbox</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <span>Option 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <span>Option 2</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Radio</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Radio defaultChecked name="radio-demo" />
                    <span>Option A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio name="radio-demo" />
                    <span>Option B</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Groups */}
          <section id="groups" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Groups</h2>
            <div className="flex gap-12">
              <div>
                <h3 className="text-lg font-medium mb-2">Checkbox Group</h3>
                <CheckboxGroup defaultValue={["apple"]}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckboxGroupItem value="apple" />
                      <span>Apple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckboxGroupItem value="orange" />
                      <span>Orange</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckboxGroupItem value="grape" />
                      <span>Grape</span>
                    </div>
                  </div>
                </CheckboxGroup>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Radio Group</h3>
                <RadioGroup defaultValue="cat">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="cat" />
                      <span>Cat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="dog" />
                      <span>Dog</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="rabbit" />
                      <span>Rabbit</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>

          {/* Layout */}
          <section id="layout" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Layout Components</h2>
            
            <h3 className="text-lg font-medium mb-2">Container</h3>
            <Container size="2" className="border p-4 rounded bg-gray-100 mb-6">
              Container with controlled width
            </Container>
            
            <h3 className="text-lg font-medium mb-2">Flex</h3>
            <Flex gap="3" className="border p-4 rounded bg-gray-100 mb-6">
              <div className="bg-blue-200 p-2 rounded">Item 1</div>
              <div className="bg-blue-200 p-2 rounded">Item 2</div>
              <div className="bg-blue-200 p-2 rounded">Item 3</div>
            </Flex>
            
            <h3 className="text-lg font-medium mb-2">Grid</h3>
            <Grid columns="3" gap="3" className="border p-4 rounded bg-gray-100 mb-6">
              <div className="bg-green-200 p-4 rounded">Grid 1</div>
              <div className="bg-green-200 p-4 rounded">Grid 2</div>
              <div className="bg-green-200 p-4 rounded">Grid 3</div>
              <div className="bg-green-200 p-4 rounded">Grid 4</div>
              <div className="bg-green-200 p-4 rounded">Grid 5</div>
              <div className="bg-green-200 p-4 rounded">Grid 6</div>
            </Grid>
            
            <h3 className="text-lg font-medium mb-2">AspectRatio</h3>
            <AspectRatio ratio={16 / 9} className="bg-yellow-200 w-[300px] rounded-md mb-6">
              <div className="flex items-center justify-center h-full">16:9 Aspect Ratio</div>
            </AspectRatio>
          </section>

          {/* Callout */}
          <section id="callout" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Callout</h2>
            <Callout.Root>
              <Callout.Icon>ℹ️</Callout.Icon>
              <Callout.Text>
                This is a callout component from RadixUI. It's useful for displaying important information or notices.
              </Callout.Text>
            </Callout.Root>
          </section>

          {/* Context Menu */}
          <section id="context-menu" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Context Menu</h2>
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="border border-dashed border-gray-300 p-8 text-center rounded">
                  Right-click here to open the context menu
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onSelect={() => console.log('Cut')}>Cut</ContextMenuItem>
                <ContextMenuItem onSelect={() => console.log('Copy')}>Copy</ContextMenuItem>
                <ContextMenuItem onSelect={() => console.log('Paste')}>Paste</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}