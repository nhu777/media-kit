'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useDndState } from '@/components/editor/shared/DndProvider';
import { hexToRgba } from '@/lib/utils';

interface EditableTitleProps {
  title: string;
  textColor?: string;
  className?: string;
  layoutId?: string;
  isBlockHovered?: boolean;
  onSave: (newTitle: string) => void;
}

export default function EditableTitle({
  title,
  textColor = '#000000',
  className = '',
  layoutId,
  isBlockHovered = false,
  onSave,
}: EditableTitleProps) {
  const { isDragging } = useDndState();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalTitleRef = useRef(title);

  useEffect(() => {
    if (isEditing) {
      originalTitleRef.current = title;
      requestAnimationFrame(() => {
        inputRef.current?.select();
      });
    }
  }, [isEditing, title]);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    const newTitle = inputRef.current?.value.trim();
    if (newTitle && newTitle !== originalTitleRef.current) {
      onSave(newTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.value = originalTitleRef.current;
      }
      setIsEditing(false);
    }
  };

  const pencilColor = hexToRgba(textColor, 0.55);

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        defaultValue={title}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        onClick={e => e.stopPropagation()}
        autoFocus
        aria-label="Edit title"
        spellCheck={false}
        className={`w-full bg-transparent outline-none text-center ${className}`}
        style={{ color: textColor }}
      />
    );
  }

  return (
    <motion.div
      layout
      layoutId={layoutId}
      className="relative inline-flex items-center justify-center"
      onClick={handleTitleClick}
    >
      <span
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTitleClick(e as unknown as React.MouseEvent);
          }
        }}
        className={`cursor-text ${className}`}
        style={{ color: textColor }}
      >
        {title}
      </span>
      {isBlockHovered && !isEditing && !isDragging && (
        <PencilSimpleIcon
          size={16}
          weight="regular"
          className="absolute"
          style={{
            color: pencilColor,
            left: '100%',
            marginLeft: '4px',
          }}
        />
      )}
    </motion.div>
  );
}
