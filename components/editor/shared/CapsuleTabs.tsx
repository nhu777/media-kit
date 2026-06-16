'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import * as React from 'react';

export interface TabItem {
  value: string;
  label: string;
}

interface CapsuleTabsProps {
  tabs: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export default function CapsuleTabs({
  tabs,
  value,
  onValueChange,
  className,
}: CapsuleTabsProps) {
  return (
    <TabsPrimitive.Root value={value} onValueChange={onValueChange}>
      <TabsPrimitive.List
        className={clsx(
          'inline-flex h-9 items-center gap-0.5 rounded-full bg-secondary p-0.5',
          className
        )}
      >
        {tabs.map(tab => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={clsx(
              'inline-flex h-full items-center justify-center rounded-full px-3 text-body-sm text-primary transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
              'disabled:pointer-events-none disabled:opacity-50',
              'data-[state=active]:bg-elevated data-[state=active]:border data-[state=active]:border-secondary data-[state=active]:shadow-sm'
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
