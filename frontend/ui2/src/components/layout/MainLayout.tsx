import React, { useEffect } from 'react';
import { Sidebar } from './sidebar';
import { useNavigate } from '@tanstack/react-router';

interface MainLayoutProps {
  children: React.ReactNode;
  activeComponent?: string;
  onComponentChange?: (id: string) => void;
}

export function MainLayout({ 
  children, 
  activeComponent,
  onComponentChange
}: MainLayoutProps) {
  const navigate = useNavigate();
  
  const shadcnComponents = [
    { id: 'accordion', label: 'Accordion' },
    { id: 'badge', label: 'Badge' },
    { id: 'button', label: 'Button' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'card', label: 'Card' },
    { id: 'command', label: 'Command' },
    { id: 'dialog', label: 'Dialog' },
    { id: 'dropdown', label: 'Dropdown' },
    { id: 'form', label: 'Form' },
    { id: 'radio', label: 'Radio' },
    { id: 'separator', label: 'Separator' },
  ];
  
  const radixComponents = [
    { id: 'button', label: 'Button' },
    { id: 'card', label: 'Card' },
    { id: 'popover', label: 'Popover' },
    { id: 'checkbox-radio', label: 'Checkbox & Radio' },
    { id: 'groups', label: 'Groups' },
    { id: 'layout', label: 'Layout' },
    { id: 'callout', label: 'Callout' },
    { id: 'context-menu', label: 'Context Menu' },
  ];

  // Determine which component list to show based on active component
  const componentItems = activeComponent === 'shadcn' || activeComponent === 'radixui' 
    ? []
    : activeComponent?.startsWith('radix-') 
      ? radixComponents 
      : shadcnComponents;

  const handleItemClick = (id: string) => {
    if (id === 'shadcn') {
      navigate({ to: '/shadcn' });
    } else if (id === 'radixui') {
      navigate({ to: '/radixui' });
    } else {
      onComponentChange?.(id);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        items={componentItems}
        activeItem={activeComponent}
        onItemClick={handleItemClick}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}