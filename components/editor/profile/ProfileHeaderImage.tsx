'use client';

import { useProfileHeader } from '@/components/editor/shared/ProfileHeaderContext';

/**
 * ProfileHeaderImage renders the circular profile image in the preview.
 * It consumes the profile image URL from ProfileHeaderContext,
 * enabling real-time updates when the user edits via ProfileHeaderOverview.
 */
export default function ProfileHeaderImage() {
  const { profileImageUrl } = useProfileHeader();

  return (
    <div className="flex items-center justify-center">
      <div className="size-[96px] overflow-hidden rounded-full bg-inverse">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
