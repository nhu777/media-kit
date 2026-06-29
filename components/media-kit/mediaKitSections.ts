export type MediaKitSectionId =
  | 'about'
  | 'audience'
  | 'performance'
  | 'brand-partnerships'
  | 'social-data';

export const DEFAULT_MEDIA_KIT_SECTION_ORDER: MediaKitSectionId[] = [
  'about',
  'audience',
  'performance',
  'brand-partnerships',
  'social-data',
];

export function reorderMediaKitSections(
  order: MediaKitSectionId[],
  activeId: MediaKitSectionId,
  overId: MediaKitSectionId
): MediaKitSectionId[] {
  const oldIndex = order.indexOf(activeId);
  const newIndex = order.indexOf(overId);

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    return order;
  }

  const next = [...order];
  const [moved] = next.splice(oldIndex, 1);
  next.splice(newIndex, 0, moved!);

  return next;
}
