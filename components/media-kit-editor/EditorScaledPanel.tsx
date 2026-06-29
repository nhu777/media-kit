'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import {
  EDITOR_COMPACT_BREAKPOINT_PX,
  EDITOR_DESIGN_WIDTH,
  EDITOR_EDGE_MARGIN_PX,
} from './mediaKitEditorLayout';
import {
  MEDIA_KIT_ROW_LEFT_GUTTER_PX,
  MEDIA_KIT_ROW_RIGHT_GUTTER_PX,
} from './mediaKitRowLayout';

const EDITOR_ROW_BLEED_PX =
  MEDIA_KIT_ROW_LEFT_GUTTER_PX + MEDIA_KIT_ROW_RIGHT_GUTTER_PX;
export const EDITOR_LAYOUT_WIDTH = EDITOR_DESIGN_WIDTH + EDITOR_ROW_BLEED_PX;
export { EDITOR_DESIGN_WIDTH, EDITOR_EDGE_MARGIN_PX };
const EDITOR_HORIZONTAL_PADDING_COMPACT = EDITOR_EDGE_MARGIN_PX * 2;
const EDITOR_HORIZONTAL_PADDING_DESKTOP = 80;
const MIN_SCALE = 0.72;
const MAX_SCALE = 1.35;

function clampScale(value: number) {
  return Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
}

export function EditorScaledPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const update = () => {
      const compact = container.clientWidth < EDITOR_COMPACT_BREAKPOINT_PX;
      const horizontalPadding = compact
        ? EDITOR_HORIZONTAL_PADDING_COMPACT
        : EDITOR_HORIZONTAL_PADDING_DESKTOP;
      const availableWidth = container.clientWidth - horizontalPadding;

      setIsCompact(compact);
      setScale(clampScale(availableWidth / EDITOR_LAYOUT_WIDTH));
      setContentHeight(content.scrollHeight);
    };

    update();

    const containerObserver = new ResizeObserver(update);
    const contentObserver = new ResizeObserver(update);
    containerObserver.observe(container);
    contentObserver.observe(content);

    return () => {
      containerObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  const layoutWidth = isCompact ? EDITOR_DESIGN_WIDTH : EDITOR_LAYOUT_WIDTH;
  const gutterOffset = isCompact ? 0 : MEDIA_KIT_ROW_LEFT_GUTTER_PX * scale;

  return (
    <section ref={containerRef} className={cn(className, 'scrollbar-hide')}>
      <div
        className={cn(
          'box-border flex min-w-full justify-center py-6 lg:py-10',
          isCompact ? 'px-4' : 'px-10'
        )}
      >
        <div
          className="relative shrink-0 overflow-visible"
          style={{
            width: layoutWidth * scale,
            height: contentHeight > 0 ? contentHeight * scale : undefined,
          }}
        >
          <div
            ref={contentRef}
            className="flex w-full flex-col gap-6"
            style={{
              width: EDITOR_DESIGN_WIDTH,
              marginLeft: gutterOffset,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
