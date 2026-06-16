'use client';

import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

import BlocksView from '@/components/editor/blocks/BlocksView';
import { DesignView } from '@/components/editor/design';
import LinkEditor from '@/components/editor/edit-block/LinkEditor';
import { ProfileHeaderView } from '@/components/editor/header';
import { SettingsView } from '@/components/editor/settings';
import { useEditorPanel } from '@/components/editor/shared/EditorPanelContext';
import { useLinks } from '@/components/editor/shared/LinksContext';
import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import { useSelection } from '@/components/editor/shared/SelectionContext';
import { detectLinkType, type Link, type LinkLayout } from '@/lib/editorData';

interface ControlPanelProps {
  activeTool: string | null;
}

export default function ControlPanel({ activeTool }: ControlPanelProps) {
  const [measureRef, bounds] = useMeasure();
  const { updateLink } = useLinks();
  const {
    selectedLink,
    isEditing,
    selectLink,
    clearSelection,
    enteredWithPanelOpen,
  } = useSelection();
  const { togglePanel } = useEditorPanel();

  // Determine close mode based on how editing was initiated
  const closeMode = enteredWithPanelOpen ? 'back' : 'close';

  const handleLinkClick = (link: Link) => {
    // Panel is always open when clicking from BlocksView
    selectLink(link.id, { panelWasOpen: true });
    // Auto-detect and update linkType if missing
    if (!link.linkType) {
      const detectedType = detectLinkType(link.url);
      updateLink(link.id, { linkType: detectedType });
    }
  };

  const handleBack = () => {
    clearSelection();
    // If panel was closed when we started editing, close it when done
    if (!enteredWithPanelOpen) {
      togglePanel('content');
    }
  };

  const handleTitleChange = (newTitle: string) => {
    if (selectedLink) {
      updateLink(selectedLink.id, { title: newTitle });
    }
  };

  const handleThumbnailChange = (
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => {
    if (selectedLink) {
      updateLink(selectedLink.id, {
        thumbnailUrl: thumbnailUrl ?? undefined,
        thumbnailType,
      });
    }
  };

  const handleLayoutChange = (layout: LinkLayout) => {
    if (selectedLink) {
      updateLink(selectedLink.id, { layout });
    }
  };

  const isCollapsed = activeTool === null;

  return (
    <motion.div
      className="h-full flex-shrink-0 bg-[rgba(255,255,255,0.8)] rounded-t-2xl shadow-elevation-100 overflow-hidden flex flex-col"
      animate={{
        width: isCollapsed ? 0 : bounds.width || 'auto',
        opacity: isCollapsed ? 0 : 1,
      }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.4,
      }}
    >
      <div ref={measureRef} className="relative h-full w-fit">
        <AnimatePresence mode="popLayout" initial={false}>
          {activeTool === 'content' && !isEditing && (
            <BlocksView key="blocks" onLinkClick={handleLinkClick} />
          )}
          {activeTool === 'content' && isEditing && selectedLink && (
            <motion.div
              key={`editor-${selectedLink.id}`}
              className="flex flex-col h-full w-[45rem]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.3, delay: 0.1 },
              }}
              exit={{
                opacity: 0,
                position: 'absolute',
                transition: { duration: 0.15 },
              }}
            >
              <LinkEditor
                linkType={
                  selectedLink.linkType ?? detectLinkType(selectedLink.url)
                }
                title={selectedLink.title}
                url={selectedLink.url}
                faviconUrl={selectedLink.faviconUrl}
                thumbnailUrl={selectedLink.thumbnailUrl}
                thumbnailType={selectedLink.thumbnailType}
                instagramUsername={selectedLink.instagramUsername}
                isConnected={selectedLink.isConnected}
                interactionType={selectedLink.interactionType}
                layout={selectedLink.layout}
                suggestedTitles={selectedLink.suggestedTitles}
                closeMode={closeMode}
                onBack={handleBack}
                onTitleChange={handleTitleChange}
                onThumbnailChange={handleThumbnailChange}
                onLayoutChange={handleLayoutChange}
              />
            </motion.div>
          )}
          {activeTool === 'header' && <ProfileHeaderView key="header" />}
          {activeTool === 'design' && <DesignView key="design" />}
          {activeTool === 'settings' && <SettingsView key="settings" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
