'use client';

import { InstagramLogo, PencilSimpleIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import React from 'react';

interface InstagramProfileCardProps {
  username: string;
  isConnected?: boolean;
  faviconUrl?: string;
  onEditClick?: () => void;
}

export default function InstagramProfileCard({
  username,
  isConnected = true,
  faviconUrl,
  onEditClick,
}: InstagramProfileCardProps) {
  return (
    <div className="flex items-center justify-between p-4 h-[68px] rounded-[16px] bg-elevated shadow-elevation-100">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Favicon container */}
        <div className="size-8 flex items-center justify-center bg-elevated border-2 border-white rounded-full shadow-elevation-100 flex-shrink-0 p-1">
          {faviconUrl ? (
            <Image
              src={faviconUrl}
              alt=""
              width={20}
              height={20}
              className="size-5 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div
              className="size-5 rounded-full flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
              }}
            >
              <InstagramLogo
                size={16}
                weight="regular"
                className="text-white"
              />
            </div>
          )}
        </div>
        {/* Text content */}
        <div className="flex flex-col gap-0 min-w-0 flex-1">
          <p className="text-body-sm text-primary truncate">@{username}</p>
          <div className="flex items-center gap-1">
            {isConnected && (
              <div className="bg-[#05df72] rounded-full shrink-0 size-2" />
            )}
            <p className="text-body-xs text-secondary truncate">
              {isConnected ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
      </div>
      {/* Edit button */}
      <button
        onClick={onEditClick}
        className="size-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0"
        aria-label="Edit Instagram connection"
      >
        <PencilSimpleIcon size={20} weight="regular" className="text-primary" />
      </button>
    </div>
  );
}
