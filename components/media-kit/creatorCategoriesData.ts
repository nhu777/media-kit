export const MAX_CREATOR_CATEGORIES = 3;

export interface CreatorCategoryOption {
  id: string;
  label: string;
}

export const CREATOR_CATEGORY_OPTIONS: CreatorCategoryOption[] = [
  { id: 'animals', label: 'Animals' },
  { id: 'art-creative-expression', label: 'Art & Creative Expression' },
  { id: 'automobiles', label: 'Automobiles' },
  { id: 'bars-restaurants', label: 'Bars & Restaurants' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'books', label: 'Books' },
  { id: 'business-entrepreneurship', label: 'Business & Entrepreneurship' },
  { id: 'celebrities', label: 'Celebrities' },
  { id: 'comedy-humor-fun', label: 'Comedy, Humor & Fun' },
  { id: 'communication', label: 'Communication' },
  { id: 'curate-shops', label: 'Curate Shops' },
  { id: 'education', label: 'Education' },
  { id: 'events', label: 'Events' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'finance-investing', label: 'Finance & Investing' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'food-drink', label: 'Food & Drink' },
  { id: 'health-wellness', label: 'Health & Wellness' },
  { id: 'holidays-celebrations', label: 'Holidays & Celebrations' },
  { id: 'home-interiors', label: 'Home & Interiors' },
  { id: 'law-government', label: 'Law & Government' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'movies-tv-streaming', label: 'Movies, TV & Streaming' },
  { id: 'music-podcasts-audio', label: 'Music, Podcasts & Audio' },
  { id: 'people-society-news', label: 'People, Society & News' },
  { id: 'real-estate', label: 'Real Estate' },
  {
    id: 'relationships-parenting-family',
    label: 'Relationships, Parenting & Family',
  },
  { id: 'science', label: 'Science' },
  {
    id: 'social-causes-charity-philanthropy',
    label: 'Social Causes, Charity & Philanthropy',
  },
  { id: 'sports-outdoor-leisure', label: 'Sports & Outdoor Leisure' },
  { id: 'tabletop-board-games', label: 'Tabletop & Board Games' },
  { id: 'technology', label: 'Technology' },
  { id: 'travel', label: 'Travel' },
  { id: 'video-games', label: 'Video games' },
];

export const DEFAULT_CREATOR_CATEGORY_IDS = [
  'music-podcasts-audio',
  'fashion',
  'lifestyle',
];

export function getCreatorCategoriesFromIds(
  ids: string[]
): CreatorCategoryOption[] {
  const byId = new Map(
    CREATOR_CATEGORY_OPTIONS.map(category => [category.id, category])
  );

  return ids
    .map(id => byId.get(id))
    .filter(
      (category): category is CreatorCategoryOption => category !== undefined
    );
}
