/**
 * Link data types and mock data for prototyping link editing UI.
 * Shared across all LinkBlock and LinkEditor variants.
 */

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';

// Link types (extensible for future types)
export type LinkType =
  | 'classic'
  | 'youtube'
  | 'digitalProduct'
  | 'instagram'
  | 'music';

// Layout options
export type LinkLayout =
  | 'classic'
  | 'featured'
  | 'music'
  | 'instagram'
  | 'reels';

// Interaction options (what happens when a visitor clicks)
export type InteractionType = 'openProfile' | 'showLatestPosts' | 'openInApp';

// Animation options
export type AnimationType = 'buzz' | 'wobble' | 'pop' | 'swipe';
export type PrioritizeType = 'animation' | 'spotlight' | 'none';

// Lock gate options (multiple can be enabled)
export type LockType =
  | 'subscribe'
  | 'code'
  | 'password'
  | 'dateOfBirth'
  | 'sensitiveContent'
  | 'nftContract';

// Schedule settings
export interface LinkSchedule {
  showOn: string | null; // ISO date string
  hideOn: string | null; // ISO date string
  notifySubscribers: boolean;
  timezone: string;
}

// Main link data interface
export interface LinkData {
  id: string;
  linkType: LinkType;

  // Core fields
  title: string;
  url: string;
  enabled: boolean;
  clickCount: number;

  // Display
  layout: LinkLayout;
  thumbnailUrl: string | null;
  thumbnailType: ThumbnailType;
  faviconUrl?: string;

  // Behavior
  redirectEnabled: boolean;
  prioritize: PrioritizeType;
  animationType: AnimationType | null;

  // Access control
  schedule: LinkSchedule | null;
  lockTypes: LockType[];

  // Instagram-specific fields (optional, only for instagram linkType)
  instagramUsername?: string;
  isConnected?: boolean;
  interactionType?: InteractionType;

  // AI-generated title suggestions
  suggestedTitles?: string[];
}

// ============================================================================
// Mock Data
// ============================================================================

export const mockLinks: LinkData[] = [
  // Classic link - matches the "Mini Pistakio Jars" from screenshots
  {
    id: 'link-1',
    linkType: 'classic',
    title: 'NEW! Mini Pistakio Jars',
    url: 'https://pistakio.co/products/mini-3-4oz-pistakio',
    enabled: true,
    clickCount: 0,
    layout: 'classic',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1612187209234-9d724802c02a?w=200&h=200&fit=crop',
    thumbnailType: 'image',
    redirectEnabled: false,
    prioritize: 'none',
    animationType: null,
    schedule: null,
    lockTypes: [],
  },

  // YouTube link
  {
    id: 'link-2',
    linkType: 'youtube',
    title: 'Watch: Behind the Scenes',
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    enabled: true,
    clickCount: 1847,
    layout: 'featured',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    thumbnailType: 'image',
    redirectEnabled: false,
    prioritize: 'animation',
    animationType: 'pop',
    schedule: null,
    lockTypes: [],
  },

  // Digital Product link
  {
    id: 'link-3',
    linkType: 'digitalProduct',
    title: 'Download: Recipe eBook',
    url: 'https://gumroad.com/l/recipe-ebook',
    enabled: true,
    clickCount: 342,
    layout: 'classic',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop',
    thumbnailType: 'image',
    redirectEnabled: false,
    prioritize: 'none',
    animationType: null,
    schedule: {
      showOn: '2025-01-01T00:00:00Z',
      hideOn: '2025-02-01T00:00:00Z',
      notifySubscribers: true,
      timezone: 'America/Los_Angeles',
    },
    lockTypes: ['subscribe'],
  },

  // Instagram link - no thumbnail set yet
  {
    id: 'link-4',
    linkType: 'instagram',
    title: 'Instagram',
    url: 'https://instagram.com/flycatcherband',
    enabled: true,
    clickCount: 2341,
    layout: 'classic',
    thumbnailUrl: null,
    thumbnailType: 'empty',
    redirectEnabled: false,
    prioritize: 'none',
    animationType: null,
    schedule: null,
    lockTypes: [],
    // Instagram-specific fields
    instagramUsername: 'flycatcherband',
    isConnected: true,
    interactionType: 'openProfile',
  },
];

// Helper to get a single mock link by ID
export function getMockLinkById(id: string): LinkData | undefined {
  return mockLinks.find(link => link.id === id);
}

// Helper to get mock links by type
export function getMockLinksByType(type: LinkType): LinkData[] {
  return mockLinks.filter(link => link.linkType === type);
}
