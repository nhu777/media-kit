'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  CREATOR_CATEGORY_OPTIONS,
  type CreatorCategoryOption,
  MAX_CREATOR_CATEGORIES,
} from '@/components/media-kit/creatorCategoriesData';
import { cn } from '@/lib/utils';

const OVERLAY_TRANSITION = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };
const MODAL_TRANSITION = { duration: 0.28, ease: [0.32, 0.72, 0, 1] as const };
const SELECTION_EASE = [0.32, 0.72, 0, 1] as const;
const SELECTION_TRANSITION = {
  duration: 0.28,
  ease: SELECTION_EASE,
};

function CategoryPill({
  category,
  selected,
  selectionDisabled,
  onToggle,
}: {
  category: CreatorCategoryOption;
  selected: boolean;
  selectionDisabled: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      layout
      type="button"
      aria-pressed={selected}
      disabled={!selected && selectionDisabled}
      onClick={onToggle}
      animate={{
        opacity: !selected && selectionDisabled ? 0.4 : 1,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        layout: { duration: 0.28, ease: SELECTION_EASE },
        opacity: SELECTION_TRANSITION,
      }}
      className={cn(
        'inline-flex h-8 items-center rounded-full px-3 motion-reduce:transition-none',
        'transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
        selected
          ? 'border border-transparent bg-inverse text-body-sm-emph text-on-inverse-primary'
          : 'border border-primary bg-primary text-body-sm text-primary',
        !selected && selectionDisabled && 'cursor-not-allowed'
      )}
    >
      <span className="whitespace-nowrap">{category.label}</span>
      <motion.span
        aria-hidden={!selected}
        className="flex shrink-0 items-center justify-center overflow-hidden"
        initial={false}
        animate={{
          width: selected ? 16 : 0,
          marginLeft: selected ? 8 : 0,
          opacity: selected ? 1 : 0,
        }}
        transition={SELECTION_TRANSITION}
      >
        <XIcon size={16} weight="regular" className="shrink-0" />
      </motion.span>
    </motion.button>
  );
}

interface AddCreatorCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onSave: (selectedIds: string[]) => void;
}

export function AddCreatorCategoriesModal({
  open,
  onOpenChange,
  selectedIds,
  onSave,
}: AddCreatorCategoriesModalProps) {
  const [draftSelectedIds, setDraftSelectedIds] = useState<string[]>(() => [
    ...selectedIds,
  ]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setDraftSelectedIds([...selectedIds]);
    }
  }, [open, selectedIds]);

  const selectionDisabled = draftSelectedIds.length >= MAX_CREATOR_CATEGORIES;

  const toggleCategory = (categoryId: string) => {
    setDraftSelectedIds(current => {
      if (current.includes(categoryId)) {
        return current.filter(id => id !== categoryId);
      }

      if (current.length >= MAX_CREATOR_CATEGORIES) {
        return current;
      }

      return [...current, categoryId];
    });
  };

  const handleSave = () => {
    onSave([...draftSelectedIds]);
    onOpenChange(false);
  };

  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close creator categories dialog"
            className="fixed inset-0 z-[100] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-creator-categories-title"
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
          >
            <motion.div
              className="pointer-events-auto flex max-h-[min(640px,calc(100vh-2rem))] w-[560px] flex-col overflow-hidden rounded-[24px] bg-elevated shadow-elevation-400"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={MODAL_TRANSITION}
              onClick={event => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-center gap-4 border-b border-tertiary p-4">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-tertiary"
                >
                  <XIcon size={20} weight="regular" />
                </button>
                <h2
                  id="add-creator-categories-title"
                  className="min-w-0 flex-1 text-center text-body-base-emph text-primary"
                >
                  Add up to 3 creator categories
                </h2>
                <Button
                  variant="primary"
                  size="sm"
                  shape="capsule"
                  onClick={handleSave}
                  className="shrink-0"
                >
                  Save
                </Button>
              </div>

              <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto p-4">
                <div className="flex flex-wrap gap-3">
                  {CREATOR_CATEGORY_OPTIONS.map(category => (
                    <CategoryPill
                      key={category.id}
                      category={category}
                      selected={draftSelectedIds.includes(category.id)}
                      selectionDisabled={selectionDisabled}
                      onToggle={() => toggleCategory(category.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
