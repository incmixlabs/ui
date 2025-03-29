import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar } from '@/components/radixui/avatar';
import { Button } from '@/components/radixui/button/button';
import { IconButton } from '@/components/radixui/button/icon-button';
import { ReactiveButton } from '@/components/radixui/button/reactive-button';
import { SplitButton } from '@/components/radixui/button/split-button';
import { Card } from '@/components/radixui/card';
import { Popover, t } from '@/components/radixui/popover';
import { Radio } from '@/components/radixui/radio';
import { Checkbox } from '@/components/radixui/checkbox';
import { RadioGroup } from '@/components/radixui/radio-group';
import { CheckboxGroup,  } from '@/components/radixui/checkbox-group';
import { Callout } from '@/components/radixui/callout';
import { Flex } from '@/components/radixui/flex';
import { Grid } from '@/components/radixui/grid';
import { AspectRatio } from '@/components/radixui/aspect-ratio';
import { ContextMenu } from '@/components/radixui/context-menu';
import { Container } from '@/components/radixui/container';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs'

export function RadixUIComponentShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = React.useState('accordion');

  // Form setup
  // Handle sidebar navigation
  const handleComponentChange = (id: string) => {
    setActiveTab(id);
  };
  debugger
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
              <TabsTrigger onClick={()=>{console.log('avatar')}}value="avatar">Avatar</TabsTrigger>
              <TabsTrigger value="button">Button</TabsTrigger>
            </TabsList>
          </div>


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
      </Tabs>
    </div>
    </MainLayout>
  );
}
