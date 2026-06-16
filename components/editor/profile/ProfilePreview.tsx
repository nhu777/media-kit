'use client';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LayoutGroup } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

import { useEditorPanel } from '@/components/editor/shared/EditorPanelContext';
import { useEditorTheme } from '@/components/editor/shared/EditorThemeContext';
import { useLinks } from '@/components/editor/shared/LinksContext';
import { useProfileHeader } from '@/components/editor/shared/ProfileHeaderContext';
import { useSelection } from '@/components/editor/shared/SelectionContext';

import ClassicLinkBlock from './ClassicLinkBlock';
import HeroHeaderImage from './HeroHeaderImage';
import HoverableBlockWrapper from './HoverableBlockWrapper';
import InstagramBlock from './InstagramBlock';
import MusicBlock from './MusicBlock';
import ProfileBio from './ProfileBio';
import ProfileHeaderImage from './ProfileHeaderImage';
import ProfileTitle from './ProfileTitle';
import SortablePreviewBlock from './SortablePreviewBlock';

export default function ProfilePreview() {
  const { links, updateLink } = useLinks();
  const { getLinkBlockCSSVars, buttonTextColor, linkBlockBackground } =
    useEditorTheme();
  const { selectLink, selectedLinkId, isEditing } = useSelection();
  const { activePanel, openPanel } = useEditorPanel();
  const { headerLayout, titleSize } = useProfileHeader();
  const blockRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const sortableIds = useMemo(
    () => links.map(link => `preview-${link.id}`),
    [links]
  );

  const handleBlockClick = (linkId: string) => {
    // Pass whether content panel was already open when starting to edit
    selectLink(linkId, { panelWasOpen: activePanel === 'content' });
    openPanel('content');
  };

  useEffect(() => {
    if (selectedLinkId) {
      const blockElement = blockRefs.current.get(selectedLinkId);
      if (blockElement) {
        blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedLinkId]);

  const setBlockRef = (linkId: string) => (el: HTMLDivElement | null) => {
    if (el) {
      blockRefs.current.set(linkId, el);
    } else {
      blockRefs.current.delete(linkId);
    }
  };

  const isHeroLayout = headerLayout === 'hero';

  return (
    <div
      className="flex w-full flex-1 flex-col overflow-y-auto pb-16 scrollbar-hide"
      style={getLinkBlockCSSVars()}
    >
      {/* Hero section - full width, no padding */}
      {isHeroLayout && (
        <div
          className="transition-opacity duration-300"
          style={{ opacity: isEditing ? 0.35 : 1 }}
        >
          <HeroHeaderImage />
        </div>
      )}

      {/* Padded content area */}
      <div
        className={`flex flex-col gap-4 px-4 ${isHeroLayout ? '' : 'pt-24'}`}
      >
        {/* Classic header - inside padded area */}
        {!isHeroLayout && (
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isEditing ? 0.35 : 1 }}
          >
            <ProfileHeaderImage />
          </div>
        )}

        {/* Name and bio - always visible with z-index to appear above hero gradient */}
        <div
          className={`flex flex-col items-center pb-6 relative z-10 transition-opacity duration-300 ${titleSize === 'md' ? 'gap-2' : 'gap-3'}`}
          style={{ opacity: isEditing ? 0.35 : 1 }}
        >
          <ProfileTitle />
          <ProfileBio />
        </div>

        <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
        >
          <LayoutGroup>
            {links.map(link => {
              const isDimmed = isEditing && link.id !== selectedLinkId;

              if (link.linkType === 'instagram') {
                return (
                  <SortablePreviewBlock
                    key={link.id}
                    id={`preview-${link.id}`}
                    ref={setBlockRef(link.id)}
                    className="transition-opacity duration-300"
                    style={{ opacity: isDimmed ? 0.35 : undefined }}
                  >
                    <HoverableBlockWrapper
                      linkId={link.id}
                      currentLayout={link.layout}
                      linkType={link.linkType}
                      onEdit={() => handleBlockClick(link.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleBlockClick(link.id);
                        }
                      }}
                    >
                      <InstagramBlock
                        linkId={link.id}
                        title={link.title}
                        thumbnailUrl={link.thumbnailUrl}
                        thumbnailType={link.thumbnailType}
                        onThumbnailChange={(type, imageUrl) => {
                          updateLink(link.id, {
                            thumbnailType: type,
                            thumbnailUrl: imageUrl,
                          });
                        }}
                        onTitleChange={newTitle => {
                          updateLink(link.id, { title: newTitle });
                        }}
                        instagramHandle={link.instagramHandle || ''}
                        followerCount={link.followerCount || ''}
                        gridImages={link.gridImages || []}
                        avatarUrl={link.avatarUrl}
                        layout={
                          link.layout === 'featured' ? 'featured' : 'classic'
                        }
                        backgroundColor={linkBlockBackground}
                        textColor={buttonTextColor}
                      />
                    </HoverableBlockWrapper>
                  </SortablePreviewBlock>
                );
              }

              if (link.linkType === 'music') {
                return (
                  <SortablePreviewBlock
                    key={link.id}
                    id={`preview-${link.id}`}
                    ref={setBlockRef(link.id)}
                    className="transition-opacity duration-300"
                    style={{ opacity: isDimmed ? 0.35 : undefined }}
                  >
                    <HoverableBlockWrapper
                      linkId={link.id}
                      currentLayout={link.layout}
                      linkType={link.linkType}
                      onEdit={() => handleBlockClick(link.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleBlockClick(link.id);
                        }
                      }}
                    >
                      <MusicBlock
                        linkId={link.id}
                        title={link.title}
                        thumbnailUrl={link.thumbnailUrl}
                        thumbnailType={link.thumbnailType}
                        onThumbnailChange={(type, imageUrl) => {
                          updateLink(link.id, {
                            thumbnailType: type,
                            thumbnailUrl: imageUrl,
                          });
                        }}
                        onTitleChange={newTitle => {
                          updateLink(link.id, { title: newTitle });
                        }}
                        albumName={link.albumName}
                        trackCount={link.trackCount}
                        layout={
                          link.layout === 'featured' ? 'featured' : 'classic'
                        }
                        backgroundColor={linkBlockBackground}
                        textColor={buttonTextColor}
                      />
                    </HoverableBlockWrapper>
                  </SortablePreviewBlock>
                );
              }

              return (
                <SortablePreviewBlock
                  key={link.id}
                  id={`preview-${link.id}`}
                  ref={setBlockRef(link.id)}
                  className="transition-opacity duration-300"
                  style={{ opacity: isDimmed ? 0.35 : undefined }}
                >
                  <HoverableBlockWrapper
                    linkId={link.id}
                    currentLayout={link.layout}
                    linkType={link.linkType}
                    onEdit={() => handleBlockClick(link.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleBlockClick(link.id);
                      }
                    }}
                  >
                    <ClassicLinkBlock
                      linkId={link.id}
                      title={link.title}
                      thumbnailUrl={link.thumbnailUrl}
                      thumbnailType={link.thumbnailType}
                      onThumbnailChange={(type, imageUrl) => {
                        updateLink(link.id, {
                          thumbnailType: type,
                          thumbnailUrl: imageUrl,
                        });
                      }}
                      onTitleChange={newTitle => {
                        updateLink(link.id, { title: newTitle });
                      }}
                      layout={
                        link.layout === 'featured' ? 'featured' : 'classic'
                      }
                      backgroundColor={linkBlockBackground}
                      textColor={buttonTextColor}
                    />
                  </HoverableBlockWrapper>
                </SortablePreviewBlock>
              );
            })}
          </LayoutGroup>
        </SortableContext>
      </div>
    </div>
  );
}
