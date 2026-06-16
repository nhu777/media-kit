'use client';

import { Button } from '@linktr.ee/arbor/Button';
import React from 'react';

interface ExploreCardProps {
  emoji: string;
  title: string;
  description: string;
  buttonLabel?: string;
  href?: string;
  onClick?: () => void;
}

export function ExploreCard({
  emoji,
  title,
  description,
  buttonLabel = 'Set up',
  href,
  onClick,
}: ExploreCardProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex-1 bg-elevated border border-secondary rounded-2xl p-6 flex flex-col gap-4 items-start text-left overflow-hidden">
      {/* Emoji */}
      <span className="text-title-xl">{emoji}</span>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <span className="text-body-base-emph text-primary">{title}</span>
        <span className="text-body-sm text-secondary">{description}</span>
      </div>

      {/* Button */}
      <Button
        variant="secondary"
        size="sm"
        shape="capsule"
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

export default ExploreCard;
