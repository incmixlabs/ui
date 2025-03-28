import React from 'react';
import { Sidebar } from './sidebar';

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
  const componentItems = [
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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        items={componentItems}
        activeItem={activeComponent}
        onItemClick={onComponentChange}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}