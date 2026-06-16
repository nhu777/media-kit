'use client';

import { LayoutGroup } from 'framer-motion';

import {
  ClassicLinkBlock,
  InstagramBlock,
  MusicBlock,
} from '@/components/editor/profile';
import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { Link } from '@/lib/editorData';

import { useEditorTheme } from './EditorThemeContext';
import PreviewFrame from './PreviewFrame';
import PreviewMenuButton from './PreviewMenuButton';

interface PreviewPanelProps {
  hideMenuButton?: boolean;
  links?: Link[];
  onLinkUpdate?: (id: string, updates: Partial<Link>) => void;
}

export default function PreviewPanel({
  hideMenuButton,
  links = [],
  onLinkUpdate,
}: PreviewPanelProps) {
  const { getLinkBlockCSSVars, linkBlockBackground, buttonTextColor } =
    useEditorTheme();

  const handleThumbnailChange = (
    linkId: string,
    type: ThumbnailType,
    imageUrl?: string
  ) => {
    onLinkUpdate?.(linkId, {
      thumbnailType: type,
      thumbnailUrl: imageUrl,
    });
  };

  return (
    <div
      className="h-full border-l border-tertiary flex flex-col gap-2 items-center justify-start overflow-hidden pt-8 pb-12 px-16"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {!hideMenuButton && <PreviewMenuButton />}
      <PreviewFrame>
        <div
          className="flex flex-col flex-1 min-h-0 px-6 pb-16 pt-24 gap-3 overflow-y-auto scrollbar-hide"
          style={getLinkBlockCSSVars()}
        >
          <LayoutGroup>
            {links.map(link => {
              if (link.linkType === 'instagram') {
                return (
                  <InstagramBlock
                    key={link.id}
                    linkId={link.id}
                    title={link.title}
                    thumbnailUrl={link.thumbnailUrl}
                    instagramHandle={link.instagramHandle}
                    followerCount={link.followerCount}
                    gridImages={link.gridImages || []}
                    avatarUrl={link.avatarUrl}
                    layout={link.layout === 'featured' ? 'featured' : 'classic'}
                    backgroundColor={linkBlockBackground}
                    textColor={buttonTextColor}
                  />
                );
              }
              if (link.linkType === 'music') {
                return (
                  <MusicBlock
                    key={link.id}
                    linkId={link.id}
                    title={link.title}
                    thumbnailUrl={link.thumbnailUrl}
                    albumName={link.albumName}
                    trackCount={link.trackCount}
                    layout={link.layout === 'featured' ? 'featured' : 'classic'}
                    backgroundColor={linkBlockBackground}
                    textColor={buttonTextColor}
                  />
                );
              }
              return (
                <ClassicLinkBlock
                  key={link.id}
                  linkId={link.id}
                  title={link.title}
                  thumbnailUrl={link.thumbnailUrl}
                  thumbnailType={link.thumbnailType}
                  onThumbnailChange={(type, imageUrl) =>
                    handleThumbnailChange(link.id, type, imageUrl)
                  }
                  layout={link.layout === 'featured' ? 'featured' : 'classic'}
                  backgroundColor={linkBlockBackground}
                  textColor={buttonTextColor}
                />
              );
            })}
          </LayoutGroup>
        </div>
      </PreviewFrame>
    </div>
  );
}
