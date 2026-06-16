import { Sparkles } from 'lucide-react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TitleSuggestionsMenuProps {
  suggestions?: string[];
  onSelect: (title: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
  triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Optional width for the popover content (overrides default 320px) */
  width?: number;
}

export const TitleSuggestionsMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'text-body-xs-emph text-accent flex items-center gap-1 transition-colors rounded-[4px] -mx-1.5 px-1.5 w-fit',
        className
      )}
      onMouseDown={e => {
        // Prevent input blur when clicking the trigger
        e.preventDefault();
        props.onMouseDown?.(e);
      }}
      {...props}
    >
      <Sparkles size={12} className="text-accent" />
      <span className="text-body-xs-emph">Suggested titles</span>
    </button>
  );
});
TitleSuggestionsMenuTrigger.displayName = 'TitleSuggestionsMenuTrigger';

const defaultSuggestions = [
  'Check out my latest video!',
  'My Portfolio',
  'Subscribe to my newsletter',
  'Book a consultation',
];

export function TitleSuggestionsMenu({
  suggestions = defaultSuggestions,
  onSelect,
  open,
  onOpenChange,
  triggerClassName,
  triggerProps,
  width,
}: TitleSuggestionsMenuProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <TitleSuggestionsMenuTrigger
          className={triggerClassName}
          {...triggerProps}
        />
      </PopoverTrigger>
      <PopoverContent
        className="p-3 rounded-xl"
        align="start"
        style={{ width: width ? `${width}px` : '320px' }}
      >
        <div className="flex flex-col gap-[1px]">
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              onClick={e => {
                e.stopPropagation();
                onSelect(suggestion);
              }}
              className="w-full text-left rounded-full p-2 text-body-sm text-primary hover:bg-secondary transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
