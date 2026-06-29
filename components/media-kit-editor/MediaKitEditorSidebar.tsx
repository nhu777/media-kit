'use client';

import {
  CalendarHeartIcon,
  CaretDownIcon,
  ChartBarIcon,
  CoinsIcon,
  GearIcon,
  HandshakeIcon,
  HouseIcon,
  InstagramLogoIcon,
  MegaphoneSimpleIcon,
  QuestionIcon,
  StarIcon,
  UsersIcon,
  WalletIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

function LinktreeLogoIcon({
  size = 20,
  className,
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.09 3.5H10.66V7.62L7.84 4.73L6.21 6.38L9.16 9.22H5V11.53H9.18L6.21 14.43L7.84 16.05L11.88 12L15.93 16.05L17.54 14.43L14.57 11.53H18.75V9.22H14.59L17.54 6.38L15.93 4.73L13.09 7.62V3.5ZM10.66 14.86V20.35H13.09V14.86H10.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  external = false,
  active = false,
  badge,
}: {
  icon: ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  href?: string;
  external?: boolean;
  active?: boolean;
  badge?: ReactNode;
}) {
  const className = cn(
    'flex h-9 w-full items-center rounded-[12px] p-2 text-left text-body-sm text-secondary transition-colors',
    active ? 'bg-[#dadad6]' : 'hover:bg-primary/60'
  );

  const content = (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-[8px]">
        <Icon size={20} className="shrink-0 text-secondary" />
        <span className="truncate">{label}</span>
      </div>
      {badge}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {content}
    </button>
  );
}

function SidebarSectionLabel({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center gap-2 px-2 pb-3 pt-6">
      <span className="min-w-0 flex-1 text-body-xs-emph text-tertiary">
        {label}
      </span>
      <CaretDownIcon size={16} className="shrink-0 text-tertiary" />
    </div>
  );
}

export function MediaKitEditorSidebar() {
  return (
    <aside className="hidden h-full w-[214px] min-w-[214px] max-w-[214px] flex-none flex-col overflow-hidden rounded-tl-[12px] border-r border-tertiary bg-secondary lg:flex">
      <div className="flex h-16 shrink-0 items-center justify-between pl-3 pr-5">
        <button
          type="button"
          className="flex items-center gap-[8px] rounded-lg p-2 transition-colors hover:bg-primary/60"
        >
          <div className="relative size-5 shrink-0 overflow-hidden rounded-[6px]">
            <Image
              src="/media-kit/avatar.jpg"
              alt="Jean"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-body-sm text-secondary">Jean</span>
            <CaretDownIcon size={16} className="text-secondary" />
          </div>
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col px-3">
        <SidebarItem icon={HouseIcon} label="Home" href="/" />
        <SidebarItem
          icon={LinktreeLogoIcon}
          label="My Linktree"
          href="https://baby-linktree.vercel.app"
          external
        />
        <SidebarItem icon={ChartBarIcon} label="Analytics" href="/analytics" />

        <SidebarSectionLabel label="Monetize" />
        <SidebarItem icon={CoinsIcon} label="Earn" href="/earn" />
        <SidebarItem
          icon={WalletIcon}
          label="Wallet"
          badge={
            <span className="flex h-5 shrink-0 items-center rounded-full border border-black/15 px-1.5 text-body-xs text-tertiary">
              $84.16
            </span>
          }
        />
        <SidebarItem icon={StarIcon} label="Rewards" />
        <SidebarItem
          icon={HandshakeIcon}
          label="Media kit"
          href="/media-kit-editor"
          active
        />

        <SidebarSectionLabel label="Grow" />
        <SidebarItem icon={UsersIcon} label="Audience" href="/audience" />
        <SidebarItem icon={CalendarHeartIcon} label="Social planner" />
        <SidebarItem icon={InstagramLogoIcon} label="Instagram auto-reply" />
      </nav>

      <div className="flex shrink-0 items-start gap-0 p-3">
        <button
          type="button"
          aria-label="Help"
          className="flex size-9 items-center justify-center rounded-[12px] text-secondary transition-colors hover:bg-primary/60"
        >
          <QuestionIcon size={20} />
        </button>
        <button
          type="button"
          aria-label="Announcements"
          className="flex size-9 items-center justify-center rounded-[12px] text-secondary transition-colors hover:bg-primary/60"
        >
          <MegaphoneSimpleIcon size={20} />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="flex size-9 items-center justify-center rounded-[12px] text-secondary transition-colors hover:bg-primary/60"
        >
          <GearIcon size={20} />
        </button>
      </div>
    </aside>
  );
}
