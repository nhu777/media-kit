'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { Platform } from '@/components/media-kit/shared';

const INSTAGRAM_ICON_BACKGROUND =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.27824 1.3901 -5.7298 1.1476 -5.3624 2.3021)'><stop stop-color='rgba(55,113,200,1)' offset='0'/><stop stop-color='rgba(55,113,200,1)' offset='0.128'/><stop stop-color='rgba(79,57,228,0.5)' offset='0.564'/><stop stop-color='rgba(102,0,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -3.1714 2.9497 0 8.4988 34.465)'><stop stop-color='rgba(255,221,85,1)' offset='0'/><stop stop-color='rgba(255,221,85,1)' offset='0.1'/><stop stop-color='rgba(255,153,74,1)' offset='0.3'/><stop stop-color='rgba(255,118,68,1)' offset='0.4'/><stop stop-color='rgba(255,84,62,1)' offset='0.5'/><stop stop-color='rgba(241,77,89,1)' offset='0.625'/><stop stop-color='rgba(228,70,117,1)' offset='0.75'/><stop stop-color='rgba(200,55,171,1)' offset='1'/></radialGradient></defs></svg>\")";

const PLATFORM_ICON_CONFIG: Record<
  Platform,
  {
    containerClassName: string;
    containerStyle?: CSSProperties;
    glyphSrc: string;
    glyphInset: string;
  }
> = {
  instagram: {
    containerClassName: 'overflow-hidden rounded-full',
    containerStyle: { backgroundImage: INSTAGRAM_ICON_BACKGROUND },
    glyphSrc: '/media-kit/platform-icons/instagram-glyph.svg',
    glyphInset: 'inset-[27.25%_27.27%_27.5%_27.27%]',
  },
  tiktok: {
    containerClassName: 'overflow-hidden rounded-full bg-black',
    glyphSrc: '/media-kit/platform-icons/tiktok-glyph.svg',
    glyphInset: 'inset-[18.18%_22.73%_19.78%_22.73%]',
  },
  youtube: {
    containerClassName: 'overflow-hidden rounded-full bg-white',
    glyphSrc: '/media-kit/platform-icons/youtube-glyph.svg',
    glyphInset: 'inset-[31.82%_22.73%_29.98%_22.73%]',
  },
};

export function EditorTrafficPlatformIcon({
  platform,
  size = 32,
}: {
  platform: Platform;
  size?: 32 | 48;
}) {
  const config = PLATFORM_ICON_CONFIG[platform];
  const sizeClass = size === 48 ? 'size-12' : 'size-8';
  const imageSizes = size === 48 ? '48px' : '32px';

  return (
    <div
      className={`relative shrink-0 ${sizeClass} ${config.containerClassName}`}
      style={config.containerStyle}
    >
      <div className={`absolute ${config.glyphInset}`}>
        <Image
          src={config.glyphSrc}
          alt=""
          fill
          className="object-contain"
          sizes={imageSizes}
        />
      </div>
    </div>
  );
}
