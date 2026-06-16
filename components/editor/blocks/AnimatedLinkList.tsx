'use client';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo } from 'react';

import LinkBlock from '@/components/editor/link-block';
import { useDndState } from '@/components/editor/shared/DndProvider';
import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { Link } from '@/lib/editorData';
import type { LinkData } from '@/lib/linkData';

import InsertLink from './InsertLink';
import SortableLinkBlock from './SortableLinkBlock';

// Animation config - single source of truth for all variants
export const linkBlockAnimation = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
};

interface AnimatedLinkListProps {
  links: Link[];
  onRemoveLink: (id: string) => void;
  onInsertClick?: () => void;
  onLinkClick?: (link: Link) => void;
  /** Called when click count is clicked - opens Insights tab */
  onClickCountClick?: (link: Link) => void;
  onThumbnailChange?: (
    id: string,
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => void;
  onTitleChange?: (id: string, newTitle: string) => void;
  hideTopInsert?: boolean;
}

export default function AnimatedLinkList({
  links,
  onRemoveLink,
  onInsertClick = () => console.log('Insert link'),
  onLinkClick = () => console.log('Edit link'),
  onClickCountClick,
  onThumbnailChange,
  onTitleChange,
  hideTopInsert = false,
}: AnimatedLinkListProps) {
  const { isDragging } = useDndState();
  const sortableIds = useMemo(
    () => links.map(link => `panel-${link.id}`),
    [links]
  );

  return (
    <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
      <AnimatePresence initial={false}>
        {links.map((link, index) => (
          <motion.div
            key={link.id}
            className="w-full"
            layout={!isDragging}
            initial={linkBlockAnimation.initial}
            animate={linkBlockAnimation.animate}
            exit={linkBlockAnimation.exit}
            transition={linkBlockAnimation.transition}
          >
            {!(hideTopInsert && index === 0) && (
              <InsertLink onClick={onInsertClick} />
            )}
            <SortableLinkBlock id={`panel-${link.id}`}>
              {({ attributes, isDragging: isBlockDragging }) => (
                <LinkBlock
                  link={
                    {
                      id: link.id,
                      linkType: link.linkType ?? 'classic',
                      title: link.title,
                      url: link.url,
                      enabled: true,
                      clickCount: link.clickCount,
                      layout: link.layout ?? 'classic',
                      thumbnailUrl: link.thumbnailUrl ?? null,
                      thumbnailType: link.thumbnailType ?? 'image',
                      faviconUrl: link.faviconUrl,
                      redirectEnabled: false,
                      prioritize: 'none',
                      animationType: null,
                      schedule: null,
                      lockTypes: [],
                      instagramUsername: link.instagramUsername,
                      isConnected: link.isConnected,
                      interactionType: link.interactionType,
                      suggestedTitles: link.suggestedTitles,
                    } satisfies LinkData
                  }
                  onClick={() => onLinkClick(link)}
                  onClickCountClick={() => onClickCountClick?.(link)}
                  onRemove={() => onRemoveLink(link.id)}
                  onThumbnailChange={(thumbnailUrl, thumbnailType) =>
                    onThumbnailChange?.(link.id, thumbnailUrl, thumbnailType)
                  }
                  onTitleChange={newTitle => onTitleChange?.(link.id, newTitle)}
                  dragHandleProps={{ attributes }}
                  isDragging={isBlockDragging}
                />
              )}
            </SortableLinkBlock>
          </motion.div>
        ))}
      </AnimatePresence>
      <InsertLink onClick={onInsertClick} />
    </SortableContext>
  );
}
