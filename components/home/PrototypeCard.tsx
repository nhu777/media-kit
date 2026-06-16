'use client';

import Link from 'next/link';
import React from 'react';

interface PrototypeCardProps {
  title?: string;
  href: string;
  thumbnail?: string;
  target?: '_blank' | '_self';
}

export function PrototypeCard({
  title,
  href,
  thumbnail,
  target,
}: PrototypeCardProps) {
  const className =
    'block w-[168px] h-[221px] bg-secondary rounded-[20px] overflow-hidden hover:opacity-90 transition-opacity';

  const content = thumbnail ? (
    <div
      className="size-full bg-cover bg-center"
      style={{ backgroundImage: `url(${thumbnail})` }}
    />
  ) : (
    <div className="size-full flex items-center justify-center">
      {title && <span className="text-title-lg text-primary">{title}</span>}
    </div>
  );

  if (target === '_blank') {
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

export default PrototypeCard;
