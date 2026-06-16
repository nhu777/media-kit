'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useLinks } from './LinksContext';

type ActiveView = 'panel' | 'preview' | null;

function extractView(sortableId: string): ActiveView {
  if (sortableId.startsWith('preview-')) return 'preview';
  if (sortableId.startsWith('panel-')) return 'panel';
  return null;
}

// Strip prefixes added by SortableContext to get the original link ID
function extractLinkId(sortableId: string): string {
  if (sortableId.startsWith('preview-')) {
    return sortableId.slice('preview-'.length);
  }
  if (sortableId.startsWith('panel-')) {
    return sortableId.slice('panel-'.length);
  }
  return sortableId;
}

interface DndContextValue {
  activeId: string | null;
  isDragging: boolean;
  activeView: ActiveView;
}

const DndStateContext = createContext<DndContextValue>({
  activeId: null,
  isDragging: false,
  activeView: null,
});

export function useDndState() {
  return useContext(DndStateContext);
}

interface DndProviderProps {
  children: ReactNode;
}

export function DndProvider({ children }: DndProviderProps) {
  const { reorderLinks } = useLinks();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>(null);

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

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id as string;
    setActiveId(id);
    setActiveView(extractView(id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const activeBaseId = extractLinkId(active.id as string);
        const overBaseId = extractLinkId(over.id as string);
        reorderLinks(activeBaseId, overBaseId);
      }

      setActiveId(null);
      setActiveView(null);
    },
    [reorderLinks]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setActiveView(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      activeId,
      isDragging: activeId !== null,
      activeView,
    }),
    [activeId, activeView]
  );

  return (
    <DndStateContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {children}
      </DndContext>
    </DndStateContext.Provider>
  );
}
