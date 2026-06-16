'use client';

import { useEditorTheme } from '@/components/editor/shared/EditorThemeContext';
import { useProfileHeader } from '@/components/editor/shared/ProfileHeaderContext';

/**
 * ProfileBio renders the profile bio/description in the preview.
 * It consumes the profile bio from ProfileHeaderContext and
 * the page text color from EditorThemeContext.
 * Bio is truncated to 2 lines with ellipsis overflow.
 */
export default function ProfileBio() {
  const { profileBio } = useProfileHeader();
  const { pageTextColor } = useEditorTheme();

  return (
    <p
      className="text-body-sm text-center line-clamp-2 px-2"
      style={{ color: pageTextColor }}
    >
      {profileBio}
    </p>
  );
}
