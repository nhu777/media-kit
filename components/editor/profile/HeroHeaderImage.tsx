'use client';

import { useEditorTheme } from '@/components/editor/shared/EditorThemeContext';
import { useProfileHeader } from '@/components/editor/shared/ProfileHeaderContext';

const BLUR_LAYERS = [
  { blur: 2, maskStart: 60, maskEnd: 68 },
  { blur: 6, maskStart: 66, maskEnd: 76 },
  { blur: 12, maskStart: 74, maskEnd: 86 },
  { blur: 24, maskStart: 82, maskEnd: 96 },
];

export default function HeroHeaderImage() {
  const { profileImageUrl } = useProfileHeader();
  const { backgroundColor } = useEditorTheme();

  return (
    <div
      className="relative w-full aspect-square overflow-hidden -mb-[72px]"
      style={{ backgroundColor }}
    >
      {profileImageUrl && (
        <img
          src={profileImageUrl}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {profileImageUrl &&
        BLUR_LAYERS.map(({ blur, maskStart, maskEnd }, i) => (
          <div
            key={i}
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: `linear-gradient(to bottom, transparent ${maskStart}%, black ${maskEnd}%)`,
              WebkitMaskImage: `linear-gradient(to bottom, transparent ${maskStart}%, black ${maskEnd}%)`,
            }}
          >
            <img
              src={profileImageUrl}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: `blur(${blur}px)` }}
            />
          </div>
        ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 35%, ${backgroundColor} 85%)`,
        }}
      />
    </div>
  );
}
