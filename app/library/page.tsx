'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { Tabs, TabsList, TabsTrigger } from '@linktr.ee/arbor/Tabs';
import {
  ArrowRightIcon,
  CloudArrowDownIcon,
  CopyIcon,
  CursorClickIcon,
  DotsThreeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@phosphor-icons/react';
import clsx from 'clsx';
import { useState } from 'react';

import { AppSidebar } from '@/components/AppSidebar';
import { SideNavColumn } from '@/components/home';

// Mock data matching the Figma design
const mockLinks = [
  {
    id: '1',
    title: 'Live at Studio 4',
    url: '',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/live-at-studio-4.jpg',
    clicks: 140,
    tag: 'Digital product' as const,
  },
  {
    id: '2',
    title:
      '[JSYL] Flycatcher Live – Wrench (Secret Album Release Show 2025) [Full Set] - YouTube',
    url: 'https://www.youtube.com/watch?v=Z2QFCsIhId0',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/jsyl-flycatcher-live.jpg',
    clicks: 89,
  },
  {
    id: '3',
    title: 'Wrench - Flycatcher',
    url: 'https://orcd.co/flycatcher_wrenchlp',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/flycatcher/wrench-cover.jpg',
    clicks: 71,
  },
  {
    id: '4',
    title: 'official merch store',
    url: 'https://www.flycatcherband.com/store',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/merch-store.jpg',
    clicks: 70,
  },
  {
    id: '5',
    title: 'Shows',
    url: 'https://www.flycatcherband.com/tour',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/flycatcher/feature.jpg',
    clicks: 64,
  },
  {
    id: '6',
    title: 'flycatcher - down (official music video)',
    url: 'https://www.youtube.com/watch?v=KvTf8pDQ_wk',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/flycatcher-down.jpg',
    clicks: 56,
  },
  {
    id: '7',
    title: 'flycatcher - flood (official music video)',
    url: 'https://www.youtube.com/watch?v=ESR4BQjeVQw',
    shortUrl: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/flycatcher-flood.jpg',
    clicks: 89,
  },
];

type TabValue = 'all' | 'links' | 'products';

const tabs: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'links', label: 'Links' },
  { value: 'products', label: 'Products' },
];

interface LibraryLinkRowProps {
  title: string;
  url: string;
  shortUrl: string;
  thumbnail: string;
  clicks: number;
  tag?: 'Digital product';
}

function LibraryLinkRow({
  title,
  url,
  shortUrl,
  thumbnail,
  clicks,
  tag,
}: LibraryLinkRowProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-elevated border border-secondary rounded-2xl overflow-hidden transition-all hover:border-transparent hover:shadow-elevation-300 min-h-16 shrink-0">
      {/* Thumbnail */}
      <div className="relative shrink-0 size-10 rounded-[12px] border-2 border-white shadow-elevation-200 overflow-hidden">
        <img
          src={thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <p className={clsx('text-body-base-emph text-primary truncate')}>
          {title}
        </p>
        <div className="flex items-center gap-2">
          {url ? (
            <>
              <span
                className={clsx(
                  'text-body-xs text-secondary truncate max-w-[200px]'
                )}
              >
                {url}
              </span>
              <ArrowRightIcon size={14} className="shrink-0 text-primary" />
            </>
          ) : null}
          <span className={clsx('text-body-xs text-secondary')}>
            {shortUrl}
          </span>
        </div>
      </div>

      {/* Digital product tag */}
      {tag === 'Digital product' && (
        <div className="flex items-center gap-1 px-1 py-1 bg-primary border border-tertiary rounded-lg">
          <CloudArrowDownIcon
            size={16}
            className="text-primary"
            weight="regular"
          />
          <span className={clsx('text-body-xs-emph text-primary')}>{tag}</span>
        </div>
      )}

      {/* Click count badge */}
      <div className="flex items-center gap-1 px-1 py-1 bg-primary border border-tertiary rounded-lg">
        <CursorClickIcon size={16} className="text-success" weight="regular" />
        <span className={clsx('text-body-xs-emph text-secondary')}>
          {clicks}
        </span>
      </div>

      {/* Actions */}
      <button className="p-1 hover:bg-secondary rounded-md transition-colors">
        <CopyIcon size={20} className="text-primary" />
      </button>
      <button className="p-1 hover:bg-secondary rounded-md transition-colors">
        <DotsThreeIcon size={20} className="text-primary" weight="bold" />
      </button>
    </div>
  );
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-screen flex bg-secondary overflow-hidden">
      <SideNavColumn />
      <main className="flex-1 flex gap-3 py-2 pr-2 min-h-0 overflow-hidden">
        <AppSidebar activePage="library" />

        {/* Main content area */}
        <div className="flex-1 h-full overflow-auto bg-primary rounded-[24px] shadow-elevation-100 p-10">
          <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2">
              {/* Title row */}
              <div className="flex items-center gap-4">
                <h1 className={clsx('flex-1 text-title-md text-primary')}>
                  Library
                </h1>
                <Button variant="primary" size="sm" shape="capsule">
                  <PlusIcon size={16} weight="bold" />
                  Add
                </Button>
              </div>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={value => setActiveTab(value as TabValue)}
              >
                <TabsList>
                  {tabs.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" shape="capsule">
                Filter
                <FunnelIcon size={16} />
              </Button>

              {/* Search input */}
              <div className="flex items-center gap-3 h-10 px-4 border border-primary rounded-full">
                <MagnifyingGlassIcon size={20} className="text-primary" />
                <input
                  type="text"
                  name="search_links"
                  id="search_links"
                  aria-label="Search links"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={clsx(
                    'bg-transparent outline-none text-body-sm text-primary placeholder:text-tertiary'
                  )}
                />
              </div>
            </div>

            {/* Link table */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar -mx-4 px-4 -mt-4 pt-4">
              {mockLinks
                .filter(link => {
                  // Filter by search query
                  const matchesSearch = link.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

                  // Filter by tab
                  const matchesTab =
                    activeTab === 'all' ||
                    (activeTab === 'products' &&
                      'tag' in link &&
                      link.tag === 'Digital product') ||
                    (activeTab === 'links' &&
                      !('tag' in link && link.tag === 'Digital product'));

                  return matchesSearch && matchesTab;
                })
                .map(link => (
                  <LibraryLinkRow
                    key={link.id}
                    title={link.title}
                    url={link.url}
                    shortUrl={link.shortUrl}
                    thumbnail={link.thumbnail}
                    clicks={link.clicks}
                    tag={'tag' in link ? link.tag : undefined}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
