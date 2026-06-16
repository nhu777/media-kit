'use client';

import {
  BackspaceIcon,
  CirclesThreePlusIcon,
  ExportIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import MenuItem from './MenuItem';

interface MenuItemData {
  icon: React.ComponentType<any>;
  label: string;
  onClick: () => void;
}

interface LinkBlockMenuPopoverProps {
  children: React.ReactNode;
  onRemove?: () => void;
  tooltipText?: React.ReactNode;
  /** When true, tooltip is hidden (e.g., during drag) */
  hideTooltip?: boolean;
}

export default function LinkBlockMenuPopover({
  children,
  onRemove,
  tooltipText = 'More',
  hideTooltip = false,
}: LinkBlockMenuPopoverProps) {
  const menuItems: MenuItemData[] = [
    {
      icon: PencilSimpleIcon,
      label: 'Edit',
      onClick: () => console.log('Edit clicked'),
    },
    {
      icon: ExportIcon,
      label: 'Share',
      onClick: () => console.log('Share clicked'),
    },
    {
      icon: CirclesThreePlusIcon,
      label: 'Move to collection',
      onClick: () => console.log('Move to collection clicked'),
    },
    {
      icon: BackspaceIcon,
      label: 'Remove',
      onClick: () => onRemove?.(),
    },
  ];

  const trigger = <PopoverTrigger asChild>{children}</PopoverTrigger>;

  return (
    <Popover>
      {hideTooltip ? (
        trigger
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent className="bg-inverse border-none rounded-sm">
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      )}
      <PopoverContent
        className="w-auto p-3 rounded-xl shadow-elevation-400 bg-elevated"
        side="right"
        align="center"
        sideOffset={8}
      >
        <div className="flex flex-col gap-[1px]">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <MenuItem
                key={index}
                label={item.label}
                onClick={item.onClick}
                startIcon={<Icon size={20} weight="regular" />}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
