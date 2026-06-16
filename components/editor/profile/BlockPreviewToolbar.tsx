'use client';

import {
  CheckIcon,
  FilmReelIcon,
  ImageSquareIcon,
  LayoutIcon,
  PencilRulerIcon,
  RowsIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

import type { LinkLayout, LinkType } from '@/lib/linkData';

interface ToolbarButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

function ToolbarButton({ icon: Icon, label, onClick }: ToolbarButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-elevated"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      <Icon size={20} weight="regular" className="text-black" />
    </motion.button>
  );
}

interface LayoutOption {
  id: LinkLayout;
  icon: React.ElementType;
  label: string;
}

const BASE_LAYOUT_OPTIONS: LayoutOption[] = [
  { id: 'classic', icon: RowsIcon, label: 'Button' },
  { id: 'featured', icon: ImageSquareIcon, label: 'Featured' },
];

const REELS_OPTION: LayoutOption = {
  id: 'reels',
  icon: FilmReelIcon,
  label: 'Reels',
};

interface LayoutSegmentedControlProps {
  currentLayout: LinkLayout;
  linkType?: LinkType;
  onLayoutChange?: (layout: LinkLayout) => void;
}

function LayoutSegmentedControl({
  currentLayout,
  linkType,
  onLayoutChange,
}: LayoutSegmentedControlProps) {
  const options =
    linkType === 'instagram'
      ? [...BASE_LAYOUT_OPTIONS, REELS_OPTION]
      : BASE_LAYOUT_OPTIONS;

  const handleClick = (layout: LinkLayout) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onLayoutChange?.(layout);
  };

  return (
    <motion.div
      className="flex flex-col gap-px rounded-full bg-white/55 p-0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      {options.map(option => {
        const isSelected =
          currentLayout === option.id ||
          (option.id === 'classic' &&
            !['classic', 'featured', 'reels'].includes(currentLayout));
        return (
          <button
            key={option.id}
            type="button"
            onClick={handleClick(option.id)}
            aria-label={option.label}
            aria-pressed={isSelected}
            className={`flex size-9 items-center justify-center rounded-full transition-colors ${
              isSelected ? 'bg-white' : 'bg-transparent hover:bg-white/50'
            }`}
          >
            <option.icon
              size={20}
              weight={isSelected ? 'fill' : 'regular'}
              className="text-black"
            />
          </button>
        );
      })}
    </motion.div>
  );
}

export interface BlockPreviewToolbarProps {
  variant?: 'preview' | 'edit' | 'layout';
  onEdit?: () => void;
  onLayout?: () => void;
  onCheck?: () => void;
  currentLayout?: LinkLayout;
  linkType?: LinkType;
  onLayoutChange?: (layout: LinkLayout) => void;
}

export default function BlockPreviewToolbar({
  variant = 'preview',
  onEdit,
  onLayout,
  onCheck,
  currentLayout = 'classic',
  linkType,
  onLayoutChange,
}: BlockPreviewToolbarProps) {
  const handleClick = (handler?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    handler?.();
  };

  const renderContent = () => {
    switch (variant) {
      case 'preview':
        return [
          <ToolbarButton
            key="edit"
            icon={PencilRulerIcon}
            label="Edit"
            onClick={handleClick(onEdit)}
          />,
          <ToolbarButton
            key="layout"
            icon={LayoutIcon}
            label="Layout"
            onClick={handleClick(onLayout)}
          />,
        ];
      case 'layout':
        return [
          <ToolbarButton
            key="check"
            icon={CheckIcon}
            label="Done"
            onClick={handleClick(onCheck)}
          />,
          <LayoutSegmentedControl
            key="layout-control"
            currentLayout={currentLayout}
            linkType={linkType}
            onLayoutChange={onLayoutChange}
          />,
        ];
      case 'edit':
      default:
        return [
          <ToolbarButton
            key="check"
            icon={CheckIcon}
            label="Done"
            onClick={handleClick(onCheck)}
          />,
        ];
    }
  };

  return (
    <motion.div
      layout
      className="rounded-full border border-white/40 bg-white/80 backdrop-blur-sm"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      transition={{
        layout: { type: 'spring', stiffness: 500, damping: 35 },
      }}
    >
      <div className="flex flex-col items-center p-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={variant}
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
