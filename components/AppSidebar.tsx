'use client';

import { Button } from '@linktr.ee/arbor/Button';
import {
  CalendarHeartIcon,
  ChartBarIcon,
  ChatCircleIcon,
  CoinsIcon,
  InstagramLogoIcon,
  LinkIcon,
  ListIcon,
  MagicWandIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Linktree Logo Icon Component
function LinktreeLogoIcon({
  size = 24,
  className,
}: {
  size?: number;
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

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
};

const mainNavItems: NavItem[] = [
  {
    label: 'My Linktree',
    href: 'https://baby-linktree.vercel.app',
    icon: LinktreeLogoIcon,
    external: true,
  },
  {
    label: 'Link library',
    href: 'https://baby-linktree.vercel.app/library',
    icon: LinkIcon,
    external: true,
  },
  {
    label: 'Insights',
    href: 'https://baby-linktree-grow.vercel.app/analytics',
    icon: ChartBarIcon,
    external: true,
  },
  {
    label: 'Audience',
    href: 'https://baby-linktree-grow.vercel.app/audience',
    icon: UsersIcon,
    external: true,
  },
  { label: 'Earn', href: '/earn', icon: CoinsIcon },
  { label: 'Messages', href: '/messages', icon: ChatCircleIcon },
];

// More popover menu items
const moreMenuItems = [
  { label: 'Social planner', icon: CalendarHeartIcon },
  { label: 'Instagram auto-reply', icon: InstagramLogoIcon },
  { label: 'Link shortener', icon: LinkIcon },
  { label: 'Post ideas', icon: MagicWandIcon },
];

interface AppSidebarProps {
  activePage?: string;
}

export function AppSidebar({ activePage }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.external) return false;
    if (activePage) {
      return item.href === `/${activePage}`;
    }
    return pathname === item.href;
  };

  return (
    <aside className="w-[200px] h-full flex flex-col bg-primary rounded-[24px] shadow-elevation-100 overflow-hidden">
      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col justify-between p-2 overflow-hidden rounded-[24px]">
        <div className="flex flex-col gap-0.5">
          {mainNavItems.map(item => (
            <NavLink key={item.href} item={item} isActive={isActive(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          {/* More Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 p-3 rounded-[16px] transition-colors text-body-base text-primary hover:bg-secondary/50 w-full text-left">
                <ListIcon size={24} weight="regular" className="shrink-0" />
                <span>More</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="start"
              sideOffset={8}
              className="w-[224px] p-0 rounded-[24px] shadow-elevation-400 overflow-hidden"
            >
              {moreMenuItems.map(item => (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 px-4 py-3 text-body-sm text-primary hover:bg-secondary transition-colors"
                >
                  <item.icon size={20} weight="regular" className="shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>
          {/* Upsell Button */}
          <div className="p-3">
            <Button
              variant="primary"
              size="md"
              shape="capsule"
              className="w-full bg-green-600"
            >
              Upgrade to pro
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;
  const className = `flex items-center gap-3 p-3 rounded-[16px] transition-colors ${
    isActive
      ? 'bg-secondary text-body-base-emph text-primary'
      : 'text-body-base text-primary hover:bg-secondary/50'
  }`;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Icon size={24} weight="regular" className="shrink-0" />
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      <Icon size={24} weight="regular" className="shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export default AppSidebar;
