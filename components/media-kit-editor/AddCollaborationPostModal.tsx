'use client';

import { Button } from '@linktr.ee/arbor/Button';
import {
  CheckIcon,
  LinkBreakIcon,
  PencilSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  COLLABORATION_POST_OPTIONS,
  type CollaborationPostOption,
} from '@/components/media-kit/brandPartnershipsData';
import type { Platform } from '@/components/media-kit/shared';
import { cn } from '@/lib/utils';

import { EditorHiddenHighlightCard } from './EditorHiddenHighlightCard';
import { EditorPlatformTabs } from './EditorPlatformTabs';
import { EditorTrafficPlatformIcon } from './EditorTrafficPlatformIcon';

const PLATFORM_CONNECTED: Record<Platform, boolean> = {
  instagram: true,
  tiktok: false,
  youtube: false,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

const PLATFORM_ACCOUNTS: Record<
  Platform,
  { handle: string; username: string }
> = {
  instagram: { handle: '@jeanbert', username: 'jeanbert' },
  tiktok: { handle: '@trophyeyesmusic', username: 'jeanbert' },
  youtube: { handle: '@jeanbert', username: 'jeanbert' },
};

const OVERLAY_TRANSITION = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };
const MODAL_TRANSITION = { duration: 0.28, ease: [0.32, 0.72, 0, 1] as const };
const SELECTION_TRANSITION = {
  duration: 0.24,
  ease: [0.32, 0.72, 0, 1] as const,
};

interface AddCollaborationPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onSave: (selectedIds: string[]) => void;
}

function CollaborationSelectionBadge({
  post,
}: {
  post: CollaborationPostOption | null;
}) {
  if (post) {
    return (
      <div className="relative size-12 shrink-0 overflow-hidden rounded-[12px]">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
    );
  }

  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary p-[9.6px] shadow-elevation-100">
      <LinkBreakIcon size={29} weight="regular" className="text-secondary" />
    </div>
  );
}

function ConnectPlatformEmptyState({ platform }: { platform: Platform }) {
  return (
    <div className="min-h-0 flex-1 rounded-[20px] bg-primary">
      <EditorHiddenHighlightCard className="flex h-full flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <EditorTrafficPlatformIcon platform={platform} size={48} />

        <div className="flex w-full flex-col gap-0.5">
          <p className="text-body-sm-emph text-primary">
            Connect your {PLATFORM_LABELS[platform]}
          </p>
          <p className="text-body-xs text-secondary">
            Once connected, you can share brand collaborations you&apos;ve done
            in the past. It only takes a few minutes!
          </p>
        </div>

        <Button variant="primary" size="sm" shape="capsule">
          Connect
        </Button>
      </EditorHiddenHighlightCard>
    </div>
  );
}

function ConnectedAccountCard({ platform }: { platform: Platform }) {
  const account = PLATFORM_ACCOUNTS[platform];

  return (
    <div className="flex shrink-0 items-center gap-4 rounded-[16px] border border-secondary p-4">
      <EditorTrafficPlatformIcon platform={platform} />

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-body-sm text-primary">{account.handle}</p>
        <div className="flex items-center gap-1">
          <span
            className="size-2 shrink-0 rounded-full bg-[#008236]"
            aria-hidden
          />
          <p className="truncate text-body-xs text-secondary">
            {account.username}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Edit ${platform} account`}
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/60"
      >
        <PencilSimpleIcon size={20} weight="regular" />
      </button>
    </div>
  );
}

function CollaborationPostTile({
  post,
  selected,
  onToggle,
}: {
  post: CollaborationPostOption;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${selected ? 'Remove' : 'Add'} collaboration post`}
      onClick={onToggle}
      className="relative w-full rounded-[16px] transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none hover:opacity-90"
    >
      <div
        className={cn(
          'aspect-square w-full rounded-[16px] border-2 p-[2px] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          selected ? 'border-black' : 'border-transparent'
        )}
      >
        <div className="relative size-full overflow-hidden rounded-[12px]">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="120px"
          />
          <AnimatePresence>
            {selected ? (
              <motion.span
                key="selected-check"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ ...SELECTION_TRANSITION, delay: 0.04 }}
                className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-[4px] border border-inverse bg-inverse text-on-inverse-primary"
              >
                <CheckIcon size={16} weight="bold" />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </button>
  );
}

export function AddCollaborationPostModal({
  open,
  onOpenChange,
  selectedIds,
  onSave,
}: AddCollaborationPostModalProps) {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [draftSelectedIds, setDraftSelectedIds] = useState<string[]>(() => [
    ...selectedIds,
  ]);
  const isConnected = PLATFORM_CONNECTED[platform];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setDraftSelectedIds([...selectedIds]);
    }
  }, [open, selectedIds]);

  const mostRecentPost = useMemo(() => {
    const mostRecentId = draftSelectedIds[draftSelectedIds.length - 1];
    if (!mostRecentId) {
      return null;
    }

    return (
      COLLABORATION_POST_OPTIONS.find(post => post.id === mostRecentId) ?? null
    );
  }, [draftSelectedIds]);

  const togglePost = (postId: string) => {
    setDraftSelectedIds(current => {
      if (current.includes(postId)) {
        return current.filter(id => id !== postId);
      }

      return [...current, postId];
    });
  };

  const handleSave = () => {
    onSave([...draftSelectedIds]);
    onOpenChange(false);
  };

  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close add collaboration post dialog"
            className="fixed inset-0 z-[100] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-collaboration-post-title"
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
          >
            <motion.div
              className="pointer-events-auto flex h-[640px] w-[560px] flex-col overflow-hidden rounded-[24px] bg-elevated shadow-elevation-400"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={MODAL_TRANSITION}
              onClick={event => event.stopPropagation()}
            >
              <div className="flex h-[72px] shrink-0 items-center gap-4 border-b border-tertiary px-4">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-tertiary"
                >
                  <XIcon size={20} weight="regular" />
                </button>
                <h2
                  id="add-collaboration-post-title"
                  className="min-w-0 flex-1 text-center text-body-base-emph text-primary"
                >
                  Add featured content
                </h2>
                <div className="size-10 shrink-0" aria-hidden />
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
                <EditorPlatformTabs active={platform} onChange={setPlatform} />

                {isConnected ? (
                  <div className="flex min-h-0 flex-1 flex-col gap-6">
                    <ConnectedAccountCard platform={platform} />

                    <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
                      <div className="grid w-full grid-cols-4 gap-4">
                        {COLLABORATION_POST_OPTIONS.map(post => (
                          <CollaborationPostTile
                            key={post.id}
                            post={post}
                            selected={draftSelectedIds.includes(post.id)}
                            onToggle={() => togglePost(post.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <ConnectPlatformEmptyState platform={platform} />
                )}
              </div>

              <div className="flex shrink-0 items-center justify-between border-t border-tertiary p-4">
                <div className="flex min-w-0 items-center gap-4">
                  <CollaborationSelectionBadge post={mostRecentPost} />
                  <p className="text-body-base-emph text-primary">
                    {draftSelectedIds.length} selected
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  shape="capsule"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
