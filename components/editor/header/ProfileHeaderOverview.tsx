'use client';

import {
  CaretDownIcon,
  MagicWandIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import { useEditorTheme } from '@/components/editor/shared/EditorThemeContext';
import PopoverProfileImage from '@/components/editor/shared/PopoverProfileImage';
import {
  type HeaderLayout,
  type LogoSize,
  type TitleSize,
  type TitleStyle,
  useProfileHeader,
} from '@/components/editor/shared/ProfileHeaderContext';

import type { ProfileHeaderViewType } from './ProfileHeaderView';
import SegmentedControl, { type SegmentOption } from './SegmentedControl';

const layoutOptions: SegmentOption[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'hero', label: 'Hero' },
];

const styleOptions: SegmentOption[] = [
  { id: 'text', label: 'Text' },
  { id: 'logo', label: 'Logo' },
];

const sizeOptions: SegmentOption[] = [
  { id: 'md', label: 'S' },
  { id: 'xl', label: 'L' },
];

const logoSizeOptions: SegmentOption[] = [
  { id: 'sm', label: 'S' },
  { id: 'lg', label: 'L' },
];

interface LogoUploadProps {
  logoUrl: string;
  onLogoChange: (url: string) => void;
}

function LogoUpload({ logoUrl, onLogoChange }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const url = event.target?.result as string;
        onLogoChange(url);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-body-sm-emph text-primary">Logo</span>
      <button
        type="button"
        onClick={handleClick}
        className={clsx(
          'relative w-full h-[112px] rounded-[16px]',
          'bg-elevated shadow-elevation-100',
          'flex items-center justify-center',
          'hover:opacity-90 transition-opacity'
        )}
      >
        {logoUrl ? (
          <>
            <img
              src={logoUrl}
              alt="Logo"
              className="max-h-[56px] max-w-[56%] object-contain"
            />
            <button
              type="button"
              onClick={handleEditClick}
              className={clsx(
                'absolute right-3 bottom-3',
                'size-8 rounded-full bg-secondary',
                'flex items-center justify-center',
                'hover:bg-tertiary transition-colors'
              )}
              aria-label="Edit logo"
            >
              <PencilSimpleIcon
                size={16}
                weight="regular"
                className="text-primary"
              />
            </button>
          </>
        ) : (
          <span className="text-body-sm text-tertiary">
            Click to upload logo
          </span>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
      />
    </div>
  );
}

interface ProfileHeaderOverviewProps {
  onNavigate?: (view: ProfileHeaderViewType) => void;
}

export default function ProfileHeaderOverview({
  onNavigate: _onNavigate,
}: ProfileHeaderOverviewProps) {
  const [selectedFont, _setSelectedFont] = useState('Link Sans');
  const fontFamily =
    selectedFont === 'Link Sans' ? 'Link Sans Product' : selectedFont;
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { pageTextColor, setPageTextColor } = useEditorTheme();
  const {
    profileImageUrl,
    setProfileImageUrl,
    profileTitle,
    setProfileTitle,
    profileBio,
    setProfileBio,
    titleSize,
    setTitleSize,
    headerLayout,
    setHeaderLayout,
    titleStyle,
    setTitleStyle,
    logoUrl,
    setLogoUrl,
    logoSize,
    setLogoSize,
  } = useProfileHeader();

  return (
    <div className="flex flex-col h-full">
      <div className="h-[72px] flex items-center justify-center px-6 py-4 shrink-0">
        <h2 className="text-body-base-emph text-primary">Header</h2>
      </div>

      <div className="flex flex-col gap-6 px-10 py-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between w-full">
          <span className="text-body-sm-emph text-primary">Profile image</span>
          <PopoverProfileImage
            imageUrl={profileImageUrl}
            onSave={(type, imageUrl) => {
              if (type === 'image' && imageUrl) {
                setProfileImageUrl(imageUrl);
              } else if (type === 'empty' || type === 'none') {
                setProfileImageUrl('');
              }
            }}
          >
            <button
              className="size-[44px] rounded-full border border-secondary overflow-hidden bg-secondary flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Edit profile image"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-body-xs text-tertiary">+</span>
              )}
            </button>
          </PopoverProfileImage>
        </div>

        <div className="relative">
          <input
            type="text"
            value={profileTitle}
            onChange={e => setProfileTitle(e.target.value)}
            placeholder="Enter your title"
            className={clsx(
              'w-full h-11 px-3 pr-10 rounded-[12px]',
              'bg-transparent',
              'text-body-sm text-primary placeholder:text-tertiary',
              'border border-primary hover:bg-secondary/50 outline-none transition-colors',
              'focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0'
            )}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors"
            aria-label="Generate title with AI"
          >
            <MagicWandIcon size={20} weight="regular" />
          </button>
        </div>

        <div className="relative">
          <textarea
            value={profileBio}
            onChange={e => setProfileBio(e.target.value)}
            placeholder="Add a bio"
            rows={3}
            className={clsx(
              'w-full p-4 pb-10 rounded-[16px] resize-none',
              'bg-transparent',
              'text-body-sm text-primary placeholder:text-tertiary',
              'border border-primary hover:bg-secondary/50 outline-none transition-colors',
              'focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0'
            )}
          />
          <button
            className="absolute right-4 bottom-4 text-primary hover:text-accent transition-colors"
            aria-label="Generate bio with AI"
          >
            <MagicWandIcon size={20} weight="regular" />
          </button>
        </div>

        <div className="h-px bg-tertiary w-full" />

        <div className="flex items-center gap-4 w-full">
          <span className="text-body-sm-emph text-primary w-[200px] shrink-0">
            Header layout
          </span>
          <SegmentedControl
            options={layoutOptions}
            selectedId={headerLayout}
            onSelect={id => setHeaderLayout(id as HeaderLayout)}
          />
        </div>

        <div className="flex items-center gap-4 w-full">
          <span className="text-body-sm-emph text-primary w-[200px] shrink-0">
            Title style
          </span>
          <SegmentedControl
            options={styleOptions}
            selectedId={titleStyle}
            onSelect={id => setTitleStyle(id as TitleStyle)}
          />
        </div>

        {titleStyle === 'text' ? (
          <>
            <div className="flex items-center gap-4 w-full">
              <span className="text-body-sm-emph text-primary w-[200px] shrink-0">
                Title font
              </span>
              <button
                className={clsx(
                  'flex-1 h-11 px-3 rounded-[12px] flex items-center justify-between gap-2',
                  'border border-transparent bg-elevated shadow-elevation-100',
                  'hover:border-primary transition-colors'
                )}
                onClick={() => {}}
              >
                <span
                  className="text-body-sm-emph text-primary truncate"
                  style={{ fontFamily }}
                >
                  {selectedFont}
                </span>
                <CaretDownIcon
                  size={20}
                  weight="regular"
                  className="text-primary shrink-0"
                />
              </button>
            </div>

            <div className="flex items-center gap-4 w-full">
              <span className="text-body-sm-emph text-primary w-[200px] shrink-0">
                Title size
              </span>
              <div className="flex-1 flex justify-end">
                <SegmentedControl
                  key="title-size"
                  options={sizeOptions}
                  selectedId={titleSize}
                  onSelect={id => setTitleSize(id as TitleSize)}
                  width="108px"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full">
              <span className="text-body-sm-emph text-primary w-[200px] shrink-0">
                Title color
              </span>
              <button
                onClick={() => colorInputRef.current?.click()}
                className={clsx(
                  'flex-1 h-11 px-3 rounded-[12px] flex items-center justify-between gap-2',
                  'border border-transparent bg-elevated shadow-elevation-100',
                  'hover:border-primary transition-colors'
                )}
              >
                <span className="text-body-sm text-primary">
                  {pageTextColor.toUpperCase()}
                </span>
                <div
                  className="size-5 rounded-full border border-primary shrink-0"
                  style={{ backgroundColor: pageTextColor }}
                />
              </button>
              <input
                ref={colorInputRef}
                type="color"
                value={pageTextColor}
                onChange={e => setPageTextColor(e.target.value)}
                className="sr-only"
              />
            </div>
          </>
        ) : (
          <>
            <LogoUpload logoUrl={logoUrl} onLogoChange={setLogoUrl} />

            <div className="flex items-center gap-4 w-full">
              <span className="text-body-sm-emph text-primary w-[200px] shrink-0">
                Logo size
              </span>
              <div className="flex-1 flex justify-end">
                <SegmentedControl
                  key="logo-size"
                  options={logoSizeOptions}
                  selectedId={logoSize}
                  onSelect={id => setLogoSize(id as LogoSize)}
                  width="108px"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
