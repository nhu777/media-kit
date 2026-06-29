'use client';

import {
  DotsThreeCircleIcon,
  EyeClosedIcon,
  EyeIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';
import { type ReactNode, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MediaKitRowMenuPopoverProps {
  label: string;
  hidden?: boolean;
  visible?: boolean;
  onEdit: () => void;
  onToggleHidden: () => void;
  onOpenChange?: (open: boolean) => void;
}

function RowMenuItem({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-full p-3 text-left transition-colors',
        'hover:bg-secondary focus:outline-none focus-visible:bg-secondary'
      )}
    >
      <span className="flex size-5 shrink-0 items-center justify-center text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-body-sm text-primary">
        {label}
      </span>
    </button>
  );
}

export function MediaKitRowMenuPopover({
  label,
  hidden = false,
  visible = true,
  onEdit,
  onToggleHidden,
  onOpenChange,
}: MediaKitRowMenuPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const handleEdit = () => {
    handleOpenChange(false);
    onEdit();
  };

  const handleToggleHidden = () => {
    handleOpenChange(false);
    onToggleHidden();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${label} options`}
          className={cn(
            'flex size-8 items-center justify-center rounded-full text-primary transition-opacity duration-150 hover:bg-secondary/40',
            visible
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          )}
          onPointerDown={event => event.stopPropagation()}
          onClick={event => event.stopPropagation()}
        >
          <DotsThreeCircleIcon
            size={24}
            weight="regular"
            className="pointer-events-none"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="center"
        sideOffset={8}
        className="w-auto rounded-[24px] p-2 shadow-elevation-400"
        onPointerDown={event => event.stopPropagation()}
        onClick={event => event.stopPropagation()}
      >
        <div className="flex flex-col">
          <RowMenuItem
            icon={<PencilSimpleIcon size={20} weight="regular" />}
            label="Edit"
            onClick={handleEdit}
          />
          <RowMenuItem
            icon={
              hidden ? (
                <EyeIcon size={20} weight="regular" />
              ) : (
                <EyeClosedIcon size={20} weight="regular" />
              )
            }
            label={hidden ? 'Show' : 'Hide'}
            onClick={handleToggleHidden}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
