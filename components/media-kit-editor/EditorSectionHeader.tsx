'use client';

import { ArrowLeftIcon, EyeClosedIcon, EyeIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

interface EditorSectionHeaderProps {
  title: string;
  hidden?: boolean;
  onBack: () => void;
  onToggleHidden: () => void;
  toggleHiddenDisabled?: boolean;
}

export function EditorSectionHeader({
  title,
  hidden = false,
  onBack,
  onToggleHidden,
  toggleHiddenDisabled = false,
}: EditorSectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex size-5 shrink-0 items-center justify-center text-primary transition-colors hover:text-secondary"
      >
        <ArrowLeftIcon size={20} weight="regular" />
      </button>

      <div className="flex min-w-0 flex-1 items-center">
        <h2 className="shrink-0 text-title-sm text-primary">{title}</h2>
        {hidden ? (
          <div className="flex min-w-0 items-center">
            <span
              aria-hidden
              className="flex size-8 shrink-0 items-center justify-center text-title-sm text-secondary"
            >
              ·
            </span>
            <div className="flex items-center gap-2">
              <EyeClosedIcon
                size={16}
                weight="regular"
                className="shrink-0 text-secondary"
              />
              <span className="text-title-sm text-secondary">Hidden</span>
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onToggleHidden}
        disabled={toggleHiddenDisabled}
        aria-label={hidden ? 'Show section' : 'Hide section'}
        aria-pressed={hidden}
        aria-disabled={toggleHiddenDisabled}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors',
          toggleHiddenDisabled
            ? 'cursor-not-allowed opacity-40'
            : 'hover:bg-tertiary'
        )}
      >
        {hidden ? (
          <EyeClosedIcon size={16} weight="regular" />
        ) : (
          <EyeIcon size={16} weight="bold" />
        )}
      </button>
    </div>
  );
}
