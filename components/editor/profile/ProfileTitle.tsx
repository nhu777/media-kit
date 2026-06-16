'use client';

import clsx from 'clsx';

import { useEditorTheme } from '@/components/editor/shared/EditorThemeContext';
import {
  type LogoSize,
  type TitleSize,
  useProfileHeader,
} from '@/components/editor/shared/ProfileHeaderContext';

const titleSizeClasses: Record<TitleSize, string> = {
  md: 'text-title-md',
  xl: 'text-title-xl',
};

const logoSizeStyles: Record<
  LogoSize,
  { maxHeight: string; maxWidth: string }
> = {
  sm: { maxHeight: '32px', maxWidth: '120px' },
  lg: { maxHeight: '48px', maxWidth: '180px' },
};

export default function ProfileTitle() {
  const { pageTextColor } = useEditorTheme();
  const {
    profileTitle,
    titleSize,
    headerLayout,
    titleStyle,
    logoUrl,
    logoSize,
  } = useProfileHeader();

  if (titleStyle === 'logo' && logoUrl) {
    const sizeStyles = logoSizeStyles[logoSize];
    return (
      <div
        className={clsx(
          'flex items-center justify-center',
          headerLayout === 'hero' && '-mt-3'
        )}
      >
        <img
          src={logoUrl}
          alt={profileTitle}
          className="object-contain"
          style={{
            maxHeight: sizeStyles.maxHeight,
            maxWidth: sizeStyles.maxWidth,
          }}
        />
      </div>
    );
  }

  return (
    <p
      className={clsx(
        titleSizeClasses[titleSize],
        'text-center',
        headerLayout === 'hero' && '-mt-3'
      )}
      style={{ color: pageTextColor }}
    >
      {profileTitle}
    </p>
  );
}
