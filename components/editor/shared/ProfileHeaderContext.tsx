'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  HeaderLayout,
  LogoSize,
  PageHeader,
  TitleSize,
  TitleStyle,
} from '@/lib/editorData';

import { usePage } from './PageContext';

export type {
  HeaderLayout,
  LogoSize,
  TitleSize,
  TitleStyle,
} from '@/lib/editorData';

const STORAGE_KEY_PREFIX = 'linktree-';
const STORAGE_KEY_SUFFIX = '-header';

function getStorageKey(pageId: string): string {
  return `${STORAGE_KEY_PREFIX}${pageId}${STORAGE_KEY_SUFFIX}`;
}

function getStoredHeader(pageId: string): PageHeader | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(getStorageKey(pageId));
    if (stored) {
      return JSON.parse(stored) as PageHeader;
    }
  } catch (e) {
    console.warn('Failed to parse stored header:', e);
  }
  return null;
}

function storeHeader(pageId: string, header: PageHeader): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(pageId), JSON.stringify(header));
  } catch (e) {
    console.warn('Failed to store header:', e);
  }
}

interface ProfileHeaderContextValue {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  profileTitle: string;
  setProfileTitle: (title: string) => void;
  profileBio: string;
  setProfileBio: (bio: string) => void;
  titleSize: TitleSize;
  setTitleSize: (size: TitleSize) => void;
  headerLayout: HeaderLayout;
  setHeaderLayout: (layout: HeaderLayout) => void;
  titleStyle: TitleStyle;
  setTitleStyle: (style: TitleStyle) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  logoSize: LogoSize;
  setLogoSize: (size: LogoSize) => void;
}

const ProfileHeaderContext = createContext<ProfileHeaderContextValue | null>(
  null
);

interface ProfileHeaderProviderProps {
  children: ReactNode;
}

export function ProfileHeaderProvider({
  children,
}: ProfileHeaderProviderProps) {
  const { activePage, activePageId } = usePage();
  const { header } = activePage;
  const currentPageIdRef = useRef(activePageId);
  const pageIdRef = useRef(activePageId);

  const [profileImageUrl, setProfileImageUrlState] = useState(
    header.profileImageUrl
  );
  const [profileTitle, setProfileTitleState] = useState(header.profileTitle);
  const [profileBio, setProfileBioState] = useState(header.profileBio);
  const [titleSize, setTitleSizeState] = useState<TitleSize>(header.titleSize);
  const [headerLayout, setHeaderLayoutState] = useState<HeaderLayout>(
    header.headerLayout
  );
  const [titleStyle, setTitleStyleState] = useState<TitleStyle>(
    header.titleStyle
  );
  const [logoUrl, setLogoUrlState] = useState(header.logoUrl);
  const [logoSize, setLogoSizeState] = useState<LogoSize>(header.logoSize);

  useEffect(() => {
    pageIdRef.current = activePageId;
  }, [activePageId]);

  useEffect(() => {
    const storedHeader = getStoredHeader(activePageId);
    if (storedHeader) {
      setProfileImageUrlState(storedHeader.profileImageUrl);
      setProfileTitleState(storedHeader.profileTitle);
      setProfileBioState(storedHeader.profileBio);
      setTitleSizeState(storedHeader.titleSize);
      setHeaderLayoutState(storedHeader.headerLayout);
      setTitleStyleState(storedHeader.titleStyle);
      setLogoUrlState(storedHeader.logoUrl);
      setLogoSizeState(storedHeader.logoSize);
    } else if (activePageId !== currentPageIdRef.current) {
      setProfileImageUrlState(header.profileImageUrl);
      setProfileTitleState(header.profileTitle);
      setProfileBioState(header.profileBio);
      setTitleSizeState(header.titleSize);
      setHeaderLayoutState(header.headerLayout);
      setTitleStyleState(header.titleStyle);
      setLogoUrlState(header.logoUrl);
      setLogoSizeState(header.logoSize);
    }
    currentPageIdRef.current = activePageId;
  }, [activePageId, header]);

  const persistHeader = useCallback(
    (updates: Partial<PageHeader>) => {
      const currentHeader: PageHeader = {
        profileImageUrl,
        profileTitle,
        profileBio,
        titleSize,
        headerLayout,
        titleStyle,
        logoUrl,
        logoSize,
        ...updates,
      };
      storeHeader(pageIdRef.current, currentHeader);
    },
    [
      profileImageUrl,
      profileTitle,
      profileBio,
      titleSize,
      headerLayout,
      titleStyle,
      logoUrl,
      logoSize,
    ]
  );

  const setProfileImageUrl = useCallback(
    (url: string) => {
      setProfileImageUrlState(url);
      persistHeader({ profileImageUrl: url });
    },
    [persistHeader]
  );

  const setProfileTitle = useCallback(
    (title: string) => {
      setProfileTitleState(title);
      persistHeader({ profileTitle: title });
    },
    [persistHeader]
  );

  const setProfileBio = useCallback(
    (bio: string) => {
      setProfileBioState(bio);
      persistHeader({ profileBio: bio });
    },
    [persistHeader]
  );

  const setTitleSize = useCallback(
    (size: TitleSize) => {
      setTitleSizeState(size);
      persistHeader({ titleSize: size });
    },
    [persistHeader]
  );

  const setHeaderLayout = useCallback(
    (layout: HeaderLayout) => {
      setHeaderLayoutState(layout);
      persistHeader({ headerLayout: layout });
    },
    [persistHeader]
  );

  const setTitleStyle = useCallback(
    (style: TitleStyle) => {
      setTitleStyleState(style);
      persistHeader({ titleStyle: style });
    },
    [persistHeader]
  );

  const setLogoUrl = useCallback(
    (url: string) => {
      setLogoUrlState(url);
      persistHeader({ logoUrl: url });
    },
    [persistHeader]
  );

  const setLogoSize = useCallback(
    (size: LogoSize) => {
      setLogoSizeState(size);
      persistHeader({ logoSize: size });
    },
    [persistHeader]
  );

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <ProfileHeaderContext.Provider value={value}>
      {children}
    </ProfileHeaderContext.Provider>
  );
}

export function useProfileHeader() {
  const context = useContext(ProfileHeaderContext);
  if (!context) {
    throw new Error(
      'useProfileHeader must be used within a ProfileHeaderProvider'
    );
  }
  return context;
}
