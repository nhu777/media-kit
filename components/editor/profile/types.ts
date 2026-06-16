import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';

export interface ClassicLinkBlockProps {
  title: string;
  thumbnailUrl?: string;
  thumbnailType?: ThumbnailType;
  onThumbnailChange?: (type: ThumbnailType, imageUrl?: string) => void;
  onTitleChange?: (newTitle: string) => void;
  layout?: 'classic' | 'featured';
  linkId?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface MusicBlockProps {
  title: string;
  thumbnailUrl?: string;
  albumName?: string;
  trackCount?: number;
  thumbnailType?: ThumbnailType;
  onThumbnailChange?: (type: ThumbnailType, imageUrl?: string) => void;
  onTitleChange?: (newTitle: string) => void;
  layout?: 'classic' | 'featured';
  linkId?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface InstagramBlockProps {
  title: string;
  thumbnailUrl?: string;
  instagramHandle?: string;
  followerCount?: string;
  gridImages: string[];
  avatarUrl?: string;
  thumbnailType?: ThumbnailType;
  onThumbnailChange?: (type: ThumbnailType, imageUrl?: string) => void;
  onTitleChange?: (newTitle: string) => void;
  layout?: 'classic' | 'featured';
  linkId?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  borderRadius?: number;
}
