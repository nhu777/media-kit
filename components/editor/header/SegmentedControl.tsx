'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useLayoutEffect, useRef, useState } from 'react';

export interface SegmentOption {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Fixed width for each segment (e.g., '48px') */
  segmentWidth?: string;
  /** Fixed width for the container (e.g., '108px') */
  width?: string;
}

export default function SegmentedControl({
  options,
  selectedId,
  onSelect,
  segmentWidth,
  width,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useLayoutEffect(() => {
    const selectedButton = buttonRefs.current.get(selectedId);
    const container = containerRef.current;

    if (selectedButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = selectedButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [selectedId, options]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative h-11 flex gap-1 p-1 bg-[rgba(0,0,0,0.04)] rounded-[12px] overflow-hidden',
        !width && 'flex-1'
      )}
      style={width ? { width } : undefined}
    >
      {/* Sliding indicator - only render when position is calculated */}
      {indicatorStyle && (
        <motion.div
          className="absolute top-1 bottom-1 bg-elevated shadow-elevation-100 rounded-[8px]"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: 'spring',
            bounce: 0.15,
            duration: 0.4,
          }}
        />
      )}

      {options.map(option => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            ref={el => {
              if (el) buttonRefs.current.set(option.id, el);
            }}
            onClick={() => onSelect(option.id)}
            className={clsx(
              'relative z-10 flex-1 h-full flex items-center justify-center rounded-[8px] px-4'
            )}
            style={
              segmentWidth ? { width: segmentWidth, flex: 'none' } : undefined
            }
          >
            <span
              className={clsx(
                'text-body-sm text-center transition-colors duration-150',
                isSelected ? 'text-primary' : 'text-secondary'
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
