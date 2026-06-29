'use client';

import { cn } from '@/lib/utils';

export function EditorHiddenHighlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-4 rounded-[20px] bg-elevated',
        className
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 z-10 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        style={{ color: 'rgb(var(--color-border-primary))' }}
      >
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="4"
          ry="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="4 6"
          strokeMiterlimit="4"
        />
      </svg>
      {children}
    </div>
  );
}
