'use client';

import { motion } from 'framer-motion';

import { AddBar } from '@/components/editor/layout';
import { useLinks } from '@/components/editor/shared/LinksContext';
import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { Link } from '@/lib/editorData';

import AnimatedLinkList from './AnimatedLinkList';

interface BlocksViewProps {
  onLinkClick?: (link: Link) => void;
}

export default function BlocksView({ onLinkClick }: BlocksViewProps) {
  const { links, removeLink, updateLink } = useLinks();

  const handleRemoveLink = (id: string) => {
    removeLink(id);
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    updateLink(id, { title: newTitle });
  };

  const handleThumbnailChange = (
    id: string,
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => {
    updateLink(id, { thumbnailUrl: thumbnailUrl ?? undefined, thumbnailType });
  };

  return (
    <motion.div
      className="flex flex-col h-full w-[35rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
      exit={{
        opacity: 0,
        position: 'absolute',
        transition: { duration: 0.15 },
      }}
    >
      <div className="h-[72px] flex items-center justify-center px-12 py-4 shrink-0">
        <h2 className="text-body-base-emph text-primary">Blocks</h2>
      </div>
      <div className="px-6 pb-10">
        <AddBar className="w-full" />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-1 pb-12">
        <AnimatedLinkList
          links={links}
          onRemoveLink={handleRemoveLink}
          onLinkClick={onLinkClick}
          onTitleChange={handleTitleChange}
          onThumbnailChange={handleThumbnailChange}
          hideTopInsert
        />
      </div>
    </motion.div>
  );
}
