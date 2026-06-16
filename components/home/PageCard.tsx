'use client';

import { Button } from '@linktr.ee/arbor/Button';
import type { IconComponent } from '@linktr.ee/arbor/IconButton';
import { IconButton } from '@linktr.ee/arbor/IconButton';
import { ShareNetworkIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';

interface PageCardProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  href: string;
  target?: '_blank' | '_self';
  /** Called when the Edit button is clicked, before navigation */
  onEditClick?: () => void;
}

export function PageCard({
  title,
  subtitle = 'Home',
  backgroundColor = '#424e7b',
  href,
  target,
  onEditClick,
}: PageCardProps) {
  const isExternal = target === '_blank';

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick?.();
  };

  return (
    <div className="w-[340px] h-[331px] flex flex-col rounded-[16px] overflow-hidden shadow-elevation-400">
      {/* Preview Window with gradient background */}
      <div
        className="flex-1 flex items-start justify-center overflow-hidden pt-6 relative"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), ${backgroundColor}`,
        }}
      >
        {/* Mobile Preview */}
        <div
          className="w-[153px] h-[239px] rounded-t-[12px] shrink-0"
          style={{ backgroundColor }}
        />
      </div>

      {/* Details Bar */}
      <div className="flex items-center gap-2 p-4 bg-white/[0.88] backdrop-blur-md border-t border-tertiary rounded-b-[16px]">
        <div className="flex-1 flex flex-col">
          <span className="text-body-sm-emph text-primary">{title}</span>
          <span className="text-body-xs text-secondary">{subtitle}</span>
        </div>
        <IconButton
          aria-label="Share"
          variant="tertiary"
          size="sm"
          icon={ShareNetworkIcon as IconComponent}
        />
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleEditClick}
          >
            <Button variant="secondary" size="sm" shape="capsule">
              Edit
            </Button>
          </a>
        ) : (
          <Link href={href} onClick={handleEditClick}>
            <Button variant="secondary" size="sm" shape="capsule">
              Edit
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PageCard;
