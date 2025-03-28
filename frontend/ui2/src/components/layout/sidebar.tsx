import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/button';
import { Separator } from '@/shadcn/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shadcn/accordion';
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeft } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  children?: SidebarItem[];
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  defaultCollapsed?: boolean;
}

function SidebarGroup({
  item,
  activeItem,
  onItemClick,
  level = 0
}: {
  item: SidebarItem;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  React.useEffect(() => {
    const handleCollapseAll = () => {
      if (hasChildren) {
        setIsOpen(false);
      }
    };

    document.addEventListener('collapse-all-groups', handleCollapseAll);

    return () => {
      document.removeEventListener('collapse-all-groups', handleCollapseAll);
    };
  }, [hasChildren]);

  if (hasChildren) {
    return (
      <AccordionItem value={item.id} className="border-none">
        <AccordionTrigger
          className={cn(
            "py-2",
            activeItem === item.id ? "bg-accent" : "",
            level === 1 ? "pl-8" : level === 2 ? "pl-12" : level === 3 ? "pl-16" : ""
          )}
        >
          {item.label}
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-0">
          <div className="ml-2">
            {item.children?.map((child) => (
              <SidebarGroup
                key={child.id}
                item={child}
                activeItem={activeItem}
                onItemClick={onItemClick}
                level={level + 1}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div className="space-y-1">
      <Button
        variant={activeItem === item.id ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          level === 1 ? "pl-8" : level === 2 ? "pl-12" : level === 3 ? "pl-16" : ""
        )}
        onClick={() => onItemClick?.(item.id)}
      >
        <span>{item.label}</span>
      </Button>
    </div>
  );
}

export function Sidebar({
  className,
  items,
  activeItem,
  onItemClick,
  defaultCollapsed = false,
  ...props
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div
      className={cn(
        'flex flex-col h-full border-r bg-background transition-all duration-300 ease-in-out',
        collapsed ? 'w-[60px]' : 'w-[240px]',
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center px-3 py-4">
        {!collapsed && (
          <h2 className="px-4 text-lg font-semibold tracking-tight">
            Components
          </h2>
        )}
        <Button
          variant="solid"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed && (
        <>
          <div className="px-3 py-2">
            <div className="space-y-1 px-3">
              <div
                className="text-sm font-medium ml-1 mb-1 cursor-pointer hover:text-primary"
                onClick={() => {
                  // Toggle all top-level groups to collapse
                  const event = new CustomEvent('collapse-all-groups');
                  document.dispatchEvent(event);
                }}
              >
                Shadcn
              </div>
              <Accordion
                type="multiple"
                defaultValue={items.filter(item => item.children?.length).map(item => item.id)}
                className="space-y-1"
              >
                {items.map((item) => (
                  <SidebarGroup
                    key={item.id}
                    item={item}
                    activeItem={activeItem}
                    onItemClick={onItemClick}
                  />
                ))}
              </Accordion>
            </div>
          </div>
          <Separator />
          <div className="flex-1"></div>
          <div className="p-4">

            <p className="text-xs text-muted-foreground">
              UI component showcase
            </p>
          </div>
        </>
      )}

      {collapsed && (
        <div className="flex flex-col items-center py-4 space-y-4">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "secondary" : "ghost"}
              size="icon"
              title={item.label}
              onClick={() => onItemClick?.(item.id)}
              className="w-10 h-10"
            >
              {item.label.charAt(0)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
