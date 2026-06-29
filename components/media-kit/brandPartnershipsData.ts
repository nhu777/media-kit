import type { Platform } from './shared';

export const GLOSSIER_LOGO = '/media-kit/brand-glossier.png';
export const CAMPER_LOGO = '/media-kit/brand-camper.png';

export function isGlossierLogo(logo: string) {
  return logo === GLOSSIER_LOGO;
}

export interface BrandMentionOption {
  id: string;
  name: string;
  logo: string;
}

export const FEATURED_BRAND_MENTIONS: BrandMentionOption[] = [
  { id: 'camper', name: 'Camper', logo: CAMPER_LOGO },
  { id: 'geel', name: 'GEEL', logo: '/media-kit/mention-4.png' },
  { id: 'kotn', name: 'KOTN', logo: '/media-kit/mention-5.png' },
  { id: 'glossier', name: 'Glossier', logo: GLOSSIER_LOGO },
  { id: 'rhode', name: 'Rhode', logo: '/media-kit/mention-2.png' },
  { id: 'cafe-forgot', name: 'Café Forgot', logo: '/media-kit/mention-6.png' },
  { id: 'rare-beauty', name: 'Rare Beauty', logo: '/media-kit/mention-3.png' },
  { id: 'coyseio', name: 'Coyseio', logo: '/media-kit/mention-7.png' },
];

export const ADDITIONAL_BRAND_MENTIONS: BrandMentionOption[] = [
  { id: 'aritzia', name: 'Aritzia', logo: '/media-kit/mention-1.png' },
  { id: 'sezane', name: 'Sézane', logo: '/media-kit/mention-5.png' },
  { id: 'reformation', name: 'Reformation', logo: '/media-kit/mention-6.png' },
  { id: 'everlane', name: 'Everlane', logo: '/media-kit/mention-4.png' },
  { id: 'alo-yoga', name: 'Alo Yoga', logo: '/media-kit/mention-3.png' },
  { id: 'lululemon', name: 'Lululemon', logo: '/media-kit/mention-2.png' },
  { id: 'nike', name: 'Nike', logo: '/media-kit/mention-7.png' },
  { id: 'adidas', name: 'Adidas', logo: '/media-kit/mention-1.png' },
  { id: 'patagonia', name: 'Patagonia', logo: '/media-kit/mention-4.png' },
  {
    id: 'outdoor-voices',
    name: 'Outdoor Voices',
    logo: '/media-kit/mention-5.png',
  },
  { id: 'skims', name: 'Skims', logo: '/media-kit/mention-2.png' },
  {
    id: 'good-american',
    name: 'Good American',
    logo: '/media-kit/mention-6.png',
  },
  { id: 'mejuri', name: 'Mejuri', logo: '/media-kit/mention-3.png' },
  { id: 'pandora', name: 'Pandora', logo: '/media-kit/mention-7.png' },
  { id: 'levis', name: "Levi's", logo: '/media-kit/mention-1.png' },
  { id: 'madewell', name: 'Madewell', logo: '/media-kit/mention-4.png' },
  { id: 'uniqlo', name: 'Uniqlo', logo: '/media-kit/mention-5.png' },
  { id: 'zara', name: 'Zara', logo: '/media-kit/mention-2.png' },
  { id: 'hm', name: 'H&M', logo: '/media-kit/mention-6.png' },
  {
    id: 'urban-outfitters',
    name: 'Urban Outfitters',
    logo: '/media-kit/mention-3.png',
  },
];

export const ALL_BRAND_MENTION_OPTIONS: BrandMentionOption[] = [
  ...FEATURED_BRAND_MENTIONS,
  ...ADDITIONAL_BRAND_MENTIONS,
];

export const MAX_BRAND_MENTIONS = 8;

export const BRAND_MENTION_MODAL_OPTIONS = ALL_BRAND_MENTION_OPTIONS.slice(
  0,
  MAX_BRAND_MENTIONS
);

export const DEFAULT_BRAND_MENTION_IDS = FEATURED_BRAND_MENTIONS.map(
  brand => brand.id
);

export function getBrandMentionsFromIds(ids: string[]): BrandMentionOption[] {
  const optionsById = new Map(
    ALL_BRAND_MENTION_OPTIONS.map(brand => [brand.id, brand])
  );

  return ids
    .map(id => optionsById.get(id))
    .filter((brand): brand is BrandMentionOption => brand !== undefined);
}

export function getBrandMentionLogosFromIds(ids: string[]): string[] {
  return getBrandMentionsFromIds(ids).map(brand => brand.logo);
}

export interface CollaborationPostOption {
  id: string;
  image: string;
  platform: Platform;
}

const COLLABORATION_PLATFORMS: Platform[] = [
  'instagram',
  'tiktok',
  'youtube',
  'instagram',
  'tiktok',
  'youtube',
  'instagram',
  'tiktok',
];

const FEATURED_COLLABORATION_POST_IMAGES = [
  '/media-kit/collab-post-5.png',
  '/media-kit/collab-post-6.png',
  '/media-kit/collab-post-7.png',
  '/media-kit/collab-post-8.png',
  '/media-kit/collab-post-9.png',
  '/media-kit/collab-post-10.png',
  '/media-kit/collab-post-11.png',
  '/media-kit/collab-post-12.png',
] as const;

export const COLLABORATION_POST_OPTIONS: CollaborationPostOption[] =
  FEATURED_COLLABORATION_POST_IMAGES.map((image, index) => ({
    id: `collab-post-${index + 1}`,
    image,
    platform: COLLABORATION_PLATFORMS[index]!,
  }));

export const COLLABORATIONS = COLLABORATION_POST_OPTIONS.slice(0, 3);

export const DEFAULT_COLLABORATION_POST_IDS = COLLABORATION_POST_OPTIONS.slice(
  0,
  4
).map(post => post.id);

export function getCollaborationsFromIds(
  ids: string[]
): CollaborationPostOption[] {
  const optionsById = new Map(
    COLLABORATION_POST_OPTIONS.map(post => [post.id, post])
  );

  return ids
    .map(id => optionsById.get(id))
    .filter((post): post is CollaborationPostOption => post !== undefined);
}

export const BRAND_MENTIONS = FEATURED_BRAND_MENTIONS.map(brand => brand.logo);
