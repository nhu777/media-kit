'use client';

import { Button } from '@linktr.ee/arbor/Button';
import {
  CaretRightIcon,
  ExportIcon,
  GearSixIcon,
  ListPlusIcon,
  LockIcon,
  PlusIcon,
  QrCodeIcon,
  UsersIcon,
  XIcon,
} from '@phosphor-icons/react';
import { type ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

import { EditorSwitch } from './EditorSwitch';

const MEDIA_KIT_URL = 'linktr.ee/jean-mediakit';

function LinktreeMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M13.09 3.5H10.66V7.62L7.84 4.73L6.21 6.38L9.16 9.22H5V11.53H9.18L6.21 14.43L7.84 16.05L11.88 12L15.93 16.05L17.54 14.43L14.57 11.53H18.75V9.22H14.59L17.54 6.38L15.93 4.73L13.09 7.62V3.5ZM10.66 14.86V20.35H13.09V14.86H10.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShareMenuRow({
  icon: Icon,
  label,
  onClick,
  trailing,
}: {
  icon: typeof ExportIcon;
  label: string;
  onClick?: () => void;
  trailing?: ReactNode;
}) {
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        <Icon size={24} weight="regular" className="shrink-0 text-primary" />
        <span className="truncate text-body-sm-emph text-primary">{label}</span>
      </span>
      {trailing ?? (
        <CaretRightIcon
          size={16}
          weight="regular"
          className="shrink-0 text-secondary"
        />
      )}
    </>
  );

  if (trailing) {
    return (
      <div className="flex w-full items-center justify-between py-0 text-left">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between py-0 text-left"
    >
      {content}
    </button>
  );
}

interface MediaKitShareSheetProps {
  onClose: () => void;
  className?: string;
}

export function MediaKitShareSheet({
  onClose,
  className,
}: MediaKitShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MEDIA_KIT_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-kit-share-title"
      className={cn(
        'w-[377px] overflow-hidden rounded-[24px] border-[1.5px] border-white bg-primary shadow-elevation-400',
        className
      )}
    >
      <div className="flex h-16 items-center gap-4 px-6">
        <h2
          id="media-kit-share-title"
          className="min-w-0 flex-1 text-body-base-emph text-primary"
        >
          Share your media kit
        </h2>
        <div className="flex shrink-0 items-center gap-6">
          <button
            type="button"
            aria-label="Share settings"
            className="flex size-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/60"
          >
            <GearSixIcon size={20} weight="regular" />
          </button>
          <button
            type="button"
            aria-label="Close share menu"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-tertiary"
          >
            <XIcon size={20} weight="regular" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-4">
        <div className="flex h-14 items-center gap-3 rounded-[12px] border border-primary pl-4 pr-3">
          <LinktreeMarkIcon className="shrink-0 text-primary" />
          <p className="min-w-0 flex-1 truncate text-body-base text-primary">
            {MEDIA_KIT_URL}
          </p>
          <Button
            variant="primary"
            size="sm"
            shape="capsule"
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <ShareMenuRow
            icon={LockIcon}
            label="Make it private"
            trailing={
              <EditorSwitch enabled={isPrivate} onChange={setIsPrivate} />
            }
          />
          <ShareMenuRow icon={ExportIcon} label="Share to..." />
          <ShareMenuRow icon={QrCodeIcon} label="QR code" />
          <ShareMenuRow icon={ListPlusIcon} label="Add to bio" />
          <ShareMenuRow icon={UsersIcon} label="Add to follower count" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 bg-secondary p-6">
        <div className="min-w-0 flex-1">
          <p className="text-body-sm-emph text-primary">Add to your Linktree</p>
          <p className="text-body-xs text-secondary">
            Displaying on your page helps brands find you
          </p>
        </div>
        <button
          type="button"
          aria-label="Add to your Linktree"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-secondary bg-elevated text-primary transition-colors hover:bg-primary"
        >
          <PlusIcon size={16} weight="regular" />
        </button>
      </div>
    </div>
  );
}
