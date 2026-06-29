'use client';

import { cn } from '@/lib/utils';

interface EditorSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function EditorSwitch({
  enabled,
  onChange,
  disabled = false,
  className,
}: EditorSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={cn(
        'relative h-5 w-8 shrink-0 rounded-full p-0.5 transition-colors',
        enabled ? 'bg-[#016e1a]' : 'bg-tertiary',
        disabled && 'cursor-not-allowed opacity-40',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'block size-4 rounded-full bg-elevated shadow-elevation-100 transition-transform duration-200 ease-out',
          enabled ? 'translate-x-3' : 'translate-x-0'
        )}
      />
    </button>
  );
}
