'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { ComponentType } from 'react';

import {
  type MediaKitSectionId,
  reorderMediaKitSections,
} from '@/components/media-kit/mediaKitSections';

import { SortableMediaKitSectionRow } from './SortableMediaKitSectionRow';

export interface MediaKitSectionConfig {
  id: MediaKitSectionId;
  label: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
}

interface MediaKitSectionListProps {
  sections: MediaKitSectionConfig[];
  hiddenSections: Set<string>;
  isSectionHidden?: (sectionId: MediaKitSectionId) => boolean;
  onSectionClick: (sectionId: MediaKitSectionId) => void;
  onToggleSectionHidden: (sectionId: MediaKitSectionId) => void;
  onReorder: (nextOrder: MediaKitSectionId[]) => void;
}

export function MediaKitSectionList({
  sections,
  hiddenSections,
  isSectionHidden,
  onSectionClick,
  onToggleSectionHidden,
  onReorder,
}: MediaKitSectionListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sectionIds = sections.map(section => section.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    onReorder(
      reorderMediaKitSections(
        sectionIds,
        active.id as MediaKitSectionId,
        over.id as MediaKitSectionId
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sectionIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4 overflow-visible lg:-ml-10 lg:pl-10 lg:-mr-10 lg:pr-10">
          {sections.map(section => (
            <SortableMediaKitSectionRow
              key={section.id}
              id={section.id}
              icon={section.icon}
              label={section.label}
              hidden={
                isSectionHidden?.(section.id) ?? hiddenSections.has(section.id)
              }
              onClick={() => onSectionClick(section.id)}
              onToggleHidden={() => onToggleSectionHidden(section.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
