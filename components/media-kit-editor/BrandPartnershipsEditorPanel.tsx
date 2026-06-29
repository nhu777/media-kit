'use client';

import type { Icon } from '@phosphor-icons/react';
import {
  AtIcon,
  PencilSimpleIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';

import { BrandMentionsEmptyCard } from '@/components/media-kit/BrandMentionsEmptyCard';
import {
  getBrandMentionsFromIds,
  getCollaborationsFromIds,
  isGlossierLogo,
} from '@/components/media-kit/brandPartnershipsData';
import { FeaturedContentEmptyCard } from '@/components/media-kit/FeaturedContentEmptyCard';
import {
  CollaborationCarousel,
  CollaborationPost,
} from '@/components/media-kit/shared';
import { cn } from '@/lib/utils';

import { AddBrandMentionsModal } from './AddBrandMentionsModal';
import { AddCollaborationPostModal } from './AddCollaborationPostModal';
import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorSectionHeader } from './EditorSectionHeader';

function EditorPartnershipsBlock({
  icon: IconComponent,
  title,
  footer,
  editLabel,
  onEditClick,
  children,
}: {
  icon: Icon;
  title: string;
  footer: string;
  editLabel: string;
  onEditClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-primary">
      <div className="rounded-[16px] border border-tertiary bg-elevated">
        <div className="flex items-center gap-4 p-4">
          <IconComponent
            size={24}
            weight="regular"
            className="shrink-0 text-primary"
          />
          <p className="min-w-0 flex-1 text-body-sm-emph text-primary">
            {title}
          </p>
          <button
            type="button"
            aria-label={`Edit ${editLabel}`}
            onClick={onEditClick}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/60"
          >
            <PencilSimpleIcon size={20} weight="regular" />
          </button>
        </div>
        {children}
      </div>
      <div className="p-4">
        <p className="text-body-xs text-secondary">{footer}</p>
      </div>
    </div>
  );
}

function EditorBrandMentionGrid({
  brands,
}: {
  brands: Array<{ id: string; logo: string }>;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 pb-4">
      {brands.map(brand => (
        <div
          key={brand.id}
          className={`relative aspect-square w-full overflow-hidden rounded-full${
            isGlossierLogo(brand.logo) ? ' border border-secondary' : ''
          }`}
        >
          <Image
            src={brand.logo}
            alt=""
            fill
            className="rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface BrandPartnershipsEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
  selectedBrandMentionIds: string[];
  onBrandMentionsChange: (selectedIds: string[]) => void;
  selectedCollaborationPostIds: string[];
  onCollaborationsChange: (selectedIds: string[]) => void;
}

export function BrandPartnershipsEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
  selectedBrandMentionIds,
  onBrandMentionsChange,
  selectedCollaborationPostIds,
  onCollaborationsChange,
}: BrandPartnershipsEditorPanelProps) {
  const [addCollaborationOpen, setAddCollaborationOpen] = useState(false);
  const [addBrandMentionsOpen, setAddBrandMentionsOpen] = useState(false);
  const selectedBrandMentions = getBrandMentionsFromIds(
    selectedBrandMentionIds
  );
  const selectedCollaborations = getCollaborationsFromIds(
    selectedCollaborationPostIds
  );

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Brand partnerships"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-8">
        {selectedCollaborations.length === 0 ? (
          <FeaturedContentEmptyCard
            onAddPosts={() => setAddCollaborationOpen(true)}
          />
        ) : (
          <EditorPartnershipsBlock
            icon={SquaresFourIcon}
            title="Featured content"
            editLabel="featured content"
            onEditClick={() => setAddCollaborationOpen(true)}
            footer="Hand-pick your best posts to give brands confidence in your style and track record. Prioritize the collabs that you're great at, and want to do more of."
          >
            <div className="px-4 pb-4">
              <CollaborationCarousel>
                {selectedCollaborations.map(collab => (
                  <CollaborationPost key={collab.id} {...collab} />
                ))}
              </CollaborationCarousel>
            </div>
          </EditorPartnershipsBlock>
        )}

        {selectedBrandMentions.length === 0 ? (
          <BrandMentionsEmptyCard
            onAddBrands={() => setAddBrandMentionsOpen(true)}
            onEdit={() => setAddBrandMentionsOpen(true)}
          />
        ) : (
          <EditorPartnershipsBlock
            icon={AtIcon}
            title="Brand mentions"
            editLabel="brand mentions"
            onEditClick={() => setAddBrandMentionsOpen(true)}
            footer="Showcase the brands you already talk about, letting potential partners know that you're a natural fit, before the conversation even starts."
          >
            <EditorBrandMentionGrid brands={selectedBrandMentions} />
          </EditorPartnershipsBlock>
        )}

        <EditorEducationBlock title="What content should I showcase?">
          <p className="text-body-xs text-secondary">
            Choose posts from your social platforms that highlight your content
            style, past brand partnerships or collaborations, or products you
            genuinely love. Beyond metrics, brands want to see who you are as a
            creator and how your content aligns with their brand before reaching
            out.
          </p>
        </EditorEducationBlock>
      </div>

      <AddCollaborationPostModal
        open={addCollaborationOpen}
        onOpenChange={setAddCollaborationOpen}
        selectedIds={selectedCollaborationPostIds}
        onSave={onCollaborationsChange}
      />
      <AddBrandMentionsModal
        open={addBrandMentionsOpen}
        onOpenChange={setAddBrandMentionsOpen}
        selectedIds={selectedBrandMentionIds}
        onSave={onBrandMentionsChange}
      />
    </div>
  );
}
