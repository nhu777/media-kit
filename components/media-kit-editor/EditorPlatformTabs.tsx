'use client';

import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';

import type { Platform } from '@/components/media-kit/shared';
import { cn } from '@/lib/utils';

const PLATFORMS: {
  id: Platform;
  label: string;
  icon: typeof InstagramLogoIcon;
}[] = [
  { id: 'instagram', label: 'Instagram', icon: InstagramLogoIcon },
  { id: 'tiktok', label: 'TikTok', icon: TiktokLogoIcon },
  { id: 'youtube', label: 'YouTube', icon: YoutubeLogoIcon },
];

interface EditorPlatformTabsProps {
  active: Platform;
  onChange: (platform: Platform) => void;
  platforms?: Platform[];
}

export function EditorPlatformTabs({
  active,
  onChange,
  platforms = ['instagram', 'tiktok', 'youtube'],
}: EditorPlatformTabsProps) {
  const visiblePlatforms = PLATFORMS.filter(({ id }) => platforms.includes(id));

  return (
    <div className="flex items-center">
      {visiblePlatforms.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              'flex shrink-0 items-center justify-center gap-[6px] rounded-full px-3 py-2 text-body-sm-emph text-primary transition-colors',
              isActive ? 'bg-secondary' : 'bg-transparent'
            )}
          >
            <Icon size={20} weight="regular" className="shrink-0" />
            <span className="whitespace-nowrap">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
