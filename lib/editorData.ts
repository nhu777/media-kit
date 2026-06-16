import type React from 'react';

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { InteractionType, LinkType } from '@/lib/linkData';

export type LinkLayout =
  | 'classic'
  | 'featured'
  | 'music'
  | 'instagram'
  | 'reels';

export interface Link {
  id: string;
  title: string;
  url: string;
  clickCount: number;
  faviconUrl?: string;
  thumbnailUrl?: string;
  thumbnailType?: ThumbnailType;
  layout?: LinkLayout;
  // Music-specific fields (for layout: 'music')
  albumName?: string;
  trackCount?: number;
  // Instagram-specific fields (for layout: 'instagram')
  instagramHandle?: string;
  followerCount?: string;
  gridImages?: string[];
  avatarUrl?: string;
  /** Type of link - determines which editor variant to use */
  linkType?: LinkType;
  // Instagram link type specific fields
  instagramUsername?: string;
  isConnected?: boolean;
  interactionType?: InteractionType;
  /** AI-generated title suggestions for this link */
  suggestedTitles?: string[];
}

/**
 * Helper to detect link type from URL
 */
export function detectLinkType(url: string): LinkType {
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('spotify.com') || url.includes('music.apple.com'))
    return 'music';
  return 'classic';
}

/**
 * Helper to extract Instagram username from URL
 */
export function extractInstagramUsername(url: string): string | undefined {
  const match = url.match(/instagram\.com\/([^/?]+)/);
  return match ? match[1] : undefined;
}

export interface SuggestionChip {
  id: string;
  label: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  backgroundColor?: string;
  iconColor?: 'light' | 'dark';
  description?: string;
  previewImageUrl?: string;
}

export type TitleSize = 'md' | 'xl';
export type HeaderLayout = 'classic' | 'hero';
export type TitleStyle = 'text' | 'logo';
export type LogoSize = 'sm' | 'lg';

export interface PageHeader {
  profileImageUrl: string;
  profileTitle: string;
  profileBio: string;
  titleSize: TitleSize;
  headerLayout: HeaderLayout;
  titleStyle: TitleStyle;
  logoUrl: string;
  logoSize: LogoSize;
}

export interface PageDesign {
  backgroundColor: string;
  linkBlockBackground: string;
  linkBlockTextColor: string;
  pageTextColor: string;
}

export interface Page {
  id: string;
  name: string;
  subtitle?: string;
  header: PageHeader;
  design: PageDesign;
  links: Link[];
}

const flycatcherLinks: Link[] = [
  {
    id: '3',
    title: 'Instagram',
    url: 'https://instagram.com/flycatcherband',
    clickCount: 2341,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://instagram.com&size=64',
    linkType: 'instagram',
    layout: 'classic',
    instagramUsername: 'flycatcherband',
    instagramHandle: 'flycatcherband',
    isConnected: true,
    interactionType: 'openProfile',
    followerCount: '17k followers',
    gridImages: [
      '/images/flycatcher/instagram-1.png',
      '/images/flycatcher/instagram-2.png',
      '/images/flycatcher/instagram-3.png',
      '/images/flycatcher/instagram-4.png',
      '/images/flycatcher/instagram-5.png',
    ],
    avatarUrl: '/images/flycatcher/profile.jpg',
    suggestedTitles: [
      'Follow us on Instagram',
      'See behind the scenes',
      'Connect with @flycatcherband',
      'Join the Flycatcher community',
      'Check out our latest posts',
    ],
  },
  {
    id: '2',
    title: 'Official merch store',
    url: 'https://project.com',
    clickCount: 567,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://project.com&size=64',
    linkType: 'classic',
    layout: 'classic',
    suggestedTitles: [
      'Shop official Flycatcher merch',
      'Get exclusive band gear',
      'Support the band with merch',
      'Browse our merch collection',
      'Wear Flycatcher gear',
    ],
  },
  {
    id: '4',
    title: 'Listen to our new album',
    url: 'https://open.spotify.com/album/example',
    clickCount: 2341,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://open.spotify.com&size=64',
    thumbnailUrl: '/images/flycatcher/wrench-cover.jpg',
    linkType: 'music',
    layout: 'classic',
    albumName: 'Wrench',
    trackCount: 12,
    suggestedTitles: [
      'Stream Wrench on Spotify',
      'Listen to our latest tracks',
      'Hear the new album now',
      'Experience Wrench today',
      'Play our newest music',
    ],
  },
  {
    id: '3a',
    title: 'visit our website',
    url: 'https://www.flycatcherband.com/',
    clickCount: 892,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.flycatcherband.com&size=64',
    thumbnailUrl: '/images/flycatcher/feature.jpg',
    layout: 'classic',
    suggestedTitles: [
      'Explore our official site',
      'Learn more about Flycatcher',
      'Get the latest band news',
      'Visit flycatcherband.com',
      'See tour dates and more',
    ],
  },
];

const nationalParksLinks: Link[] = [
  {
    id: 'np-1',
    title: 'Yosemite National Park',
    url: 'https://www.lonelyplanet.com/destinations/usa/yosemite-national-park',
    clickCount: 0,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.lonelyplanet.com&size=64',
    linkType: 'classic',
    layout: 'classic',
    suggestedTitles: [
      'Explore Yosemite National Park highlights',
      'Discover Yosemite National Park on Lonely Planet',
      'Find detailed Yosemite park information',
      'Yosemite National Park guide',
      'Experience top Yosemite sights',
    ],
  },
  {
    id: 'np-2',
    title: 'Everything to know about Zion National Park | National Geographic',
    url: 'https://www.nationalgeographic.com/travel/national-parks/article/zion-national-park',
    clickCount: 0,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.nationalgeographic.com&size=64',
    linkType: 'classic',
    layout: 'classic',
    thumbnailUrl: '/images/national-parks/zion.jpeg',
    thumbnailType: 'image',
    suggestedTitles: [
      'Explore Zion National Park tips',
      'Discover Zion National Park on National Geographic',
      'Find best trails and sights',
      'Zion National Park guide',
      'Explore top Zion park highlights',
    ],
  },
  {
    id: 'np-3',
    title:
      'KARIJINI, WESTERN AUSTRALIA: Travel Guide to ALL Gorges & Waterfalls in 4K - YouTube',
    url: 'https://www.youtube.com/watch?v=vbcXe9xtbdk',
    clickCount: 0,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.youtube.com&size=64',
    linkType: 'youtube',
    layout: 'classic',
    thumbnailUrl: '/images/national-parks/karijini.jpeg',
    thumbnailType: 'image',
    suggestedTitles: [
      'Watch national parks exploration',
      'Explore national parks on YouTube',
      'Discover stunning park views',
      'National parks YouTube video',
      'Enjoy breathtaking park scenery',
    ],
  },
  {
    id: 'np-4',
    title: 'Banff National Park',
    url: 'https://parks.canada.ca/pn-np/ab/banff',
    clickCount: 0,
    faviconUrl:
      'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://parks.canada.ca&size=64',
    linkType: 'classic',
    layout: 'classic',
    suggestedTitles: [
      'Explore Banff National Park details',
      'Discover Banff Park on Parks Canada',
      'Plan your visit to Banff National Park',
      'Banff National Park overview',
      "Visit Banff's stunning landscapes today",
    ],
  },
];

export const pagesData: Record<string, Page> = {
  flycatcher: {
    id: 'flycatcher',
    name: 'Flycatcher',
    subtitle: 'Home • Tour',
    header: {
      profileImageUrl: '/images/flycatcher/profile.jpg',
      profileTitle: 'Flycatcher',
      profileBio:
        'This is a short Linktree bio that can go over two lines sometimes.',
      titleSize: 'md',
      headerLayout: 'classic',
      titleStyle: 'text',
      logoUrl: '/images/flycatcher/logo.png',
      logoSize: 'sm',
    },
    design: {
      backgroundColor: '#424E7B',
      linkBlockBackground: '#FFFFFF',
      linkBlockTextColor: 'rgba(0, 0, 0, 0.9)',
      pageTextColor: '#FFFFFF',
    },
    links: flycatcherLinks,
  },
  'national-parks': {
    id: 'national-parks',
    name: 'National Parks',
    subtitle: 'Explore America',
    header: {
      profileImageUrl: '/images/national-parks/profile.jpg',
      profileTitle: 'National Parks',
      profileBio: 'Celebrating the beauty of our world',
      titleSize: 'md',
      headerLayout: 'classic',
      titleStyle: 'text',
      logoUrl: '',
      logoSize: 'sm',
    },
    design: {
      backgroundColor: '#59885c',
      linkBlockBackground: '#FFFFFF',
      linkBlockTextColor: '#151017',
      pageTextColor: '#FFFFFF',
    },
    links: nationalParksLinks,
  },
};

export function getAllPages(): Page[] {
  return Object.values(pagesData);
}

export function getPageById(id: string): Page | undefined {
  return pagesData[id];
}

export const DEFAULT_PAGE_ID = 'flycatcher';

/** @deprecated Use pagesData['flycatcher'].links instead */
export const initialLinks: Link[] = flycatcherLinks;

// Suggestion chip configuration (icons added by consuming components)
export const suggestionChipConfig = [
  {
    id: 'browse',
    label: 'Browse',
    backgroundColor: '#fbfaf9',
    iconColor: 'dark' as const,
  },
  {
    id: 'tour-events',
    label: 'Tour & Events',
    description: 'Auto-updating Tour Dates feed',
    backgroundColor: '#8129d9',
  },
  {
    id: 'music-presave',
    label: 'Music presave',
    description: 'Spread the word and build excitement',
    backgroundColor: '#c41500',
  },
  {
    id: 'music',
    label: 'Music',
    description: 'Connect fans with your music',
    backgroundColor: '#fc3e4b',
  },
  {
    id: 'fan-club',
    label: 'Fan club',
    description: 'Build your community',
    backgroundColor: '#ff6c02',
  },
];

// Suggested apps for the SuggestedLinksPanel (includes items with images)
export interface SuggestedApp {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  backgroundColor?: string;
  iconType?: 'music-presave' | 'music' | 'tour-dates';
  previewImageUrl?: string;
}

export const suggestedApps: SuggestedApp[] = [
  {
    id: 'youtube-video',
    title: 'Down - Official video',
    description: 'Youtube',
    imageUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
    previewImageUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  },
  {
    id: 'music-presave',
    title: 'Music presave',
    description: 'Spread the word and build excitement',
    backgroundColor: '#c41500',
    iconType: 'music-presave',
    previewImageUrl: '/previews/music-presave.png',
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Connect fans with your music',
    backgroundColor: '#fc3e4b',
    iconType: 'music',
    previewImageUrl: '/previews/music.png',
  },
  {
    id: 'tour-dates',
    title: 'Tour dates',
    description: 'Auto-updating Tour Dates feed',
    backgroundColor: '#8129d9',
    iconType: 'tour-dates',
    previewImageUrl: '/previews/tour-dates.png',
  },
];
