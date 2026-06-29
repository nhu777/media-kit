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

import {
  type PerformanceMetric,
  reorderPerformanceMetrics,
} from '@/components/media-kit/performanceData';

import { SortablePerformanceContentRow } from './SortablePerformanceContentRow';

export interface PerformanceContentItem {
  id: PerformanceMetric;
  label: string;
  sublabel?: string;
  locked?: boolean;
}

export const PERFORMANCE_CONTENT_ITEMS: PerformanceContentItem[] = [
  { id: 'ctr', label: 'Click-through rate' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'retention', label: 'Audience retention' },
  {
    id: 'sales',
    label: 'Sales',
    sublabel: 'Make a sale in a 28-day period to unlock this section',
    locked: true,
  },
  { id: 'traffic', label: 'Traffic' },
];

interface PerformanceContentListProps {
  order: PerformanceMetric[];
  hiddenMetrics: Set<PerformanceMetric>;
  sectionHidden?: boolean;
  onItemClick: (metric: PerformanceMetric) => void;
  onToggleMetricHidden: (metric: PerformanceMetric) => void;
  onReorder: (nextOrder: PerformanceMetric[]) => void;
}

export function PerformanceContentList({
  order,
  hiddenMetrics,
  sectionHidden = false,
  onItemClick,
  onToggleMetricHidden,
  onReorder,
}: PerformanceContentListProps) {
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

  const orderedItems = order
    .map(metricId =>
      PERFORMANCE_CONTENT_ITEMS.find(item => item.id === metricId)
    )
    .filter((item): item is PerformanceContentItem => item !== undefined);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    onReorder(
      reorderPerformanceMetrics(
        order,
        active.id as PerformanceMetric,
        over.id as PerformanceMetric
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
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4 overflow-visible lg:-ml-10 lg:pl-10 lg:-mr-10 lg:pr-10">
          {orderedItems.map(item => (
            <SortablePerformanceContentRow
              key={item.id}
              id={item.id}
              label={item.label}
              sublabel={item.sublabel}
              locked={item.locked}
              hidden={sectionHidden || hiddenMetrics.has(item.id)}
              onClick={() => onItemClick(item.id)}
              onToggleHidden={() => onToggleMetricHidden(item.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
