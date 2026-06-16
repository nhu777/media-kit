'use client';

import type { IconComponent } from '@linktr.ee/arbor/IconButton';
import { IconButton } from '@linktr.ee/arbor/IconButton';
import { Tabs, TabsList, TabsTrigger } from '@linktr.ee/arbor/Tabs';
import {
  BookmarkSimpleIcon,
  ClockIcon,
  CloudArrowDownIcon,
  DotsThreeIcon,
  HandCoinsIcon,
  LightbulbIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShareNetworkIcon,
  SlidersHorizontalIcon,
  StorefrontIcon,
  TShirtIcon,
  XIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface AddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLink?: (url: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const browseByItems: NavItem[] = [
  { id: 'suggested', label: 'Suggested', icon: <LightbulbIcon size={20} /> },
  {
    id: 'sponsored',
    label: 'Sponsored links',
    icon: <HandCoinsIcon size={20} />,
  },
  {
    id: 'affiliate',
    label: 'Affiliate products',
    icon: <TShirtIcon size={20} />,
  },
  { id: 'sell', label: 'Sell', icon: <StorefrontIcon size={20} /> },
  { id: 'social', label: 'Social media', icon: <ShareNetworkIcon size={20} /> },
  {
    id: 'more',
    label: 'View more',
    icon: <DotsThreeIcon size={20} weight="bold" />,
  },
];

const otherItems: NavItem[] = [
  { id: 'library', label: 'Library', icon: <BookmarkSimpleIcon size={20} /> },
  { id: 'recent', label: 'Recent', icon: <ClockIcon size={20} /> },
];

// Mock suggested cards for demo
const mockSuggestedCards = [
  {
    id: '1',
    title: 'Down - Official video',
    description: 'https://youtu.be/KvTf8pDQ_wk?si=aUfhr...',
  },
  {
    id: '2',
    title: 'Tour & Events',
    description: 'Auto-updating Tour Dates feed',
  },
  {
    id: '3',
    title: 'Music Presave',
    description: 'Presave for early access',
  },
  {
    id: '4',
    title: 'Music Presave',
    description: 'Presave for early access',
  },
  {
    id: '5',
    title: 'Music Presave',
    description: 'Presave for early access',
  },
  {
    id: '6',
    title: 'Music Presave',
    description: 'Presave for early access',
  },
];

// Mock library items for the Library tab
interface LibraryItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tag?: 'digital-product' | 'analytics';
  analyticsCount?: number;
}

const mockLibraryItems: LibraryItem[] = [
  {
    id: '1',
    title: 'Live at Studio 4',
    url: 'tr.ee/vWgfo0_UrB',
    thumbnail: '/images/live-at-studio-4.jpg',
    tag: 'digital-product',
  },
  {
    id: '2',
    title:
      'Flycatcher: Full Set (Recorded Live for The Key Studio Sessions) - WXPN | Vinyl At Heart',
    url: 'https://www.youtube.com/watch?v=Z2QFCsIhId0',
    thumbnail: '/images/jsyl-flycatcher-live.jpg',
  },
  {
    id: '3',
    title: 'Music | Flycatcher',
    url: 'https://orcd.co/flycatcher_wrenchlp',
    thumbnail: '/images/flycatcher-flood.jpg',
    tag: 'digital-product',
  },
  {
    id: '4',
    title: 'official merch store',
    url: 'https://orcd.co/flycatcher_wrenchlp',
    thumbnail: '/images/merch-store.jpg',
    tag: 'digital-product',
  },
  {
    id: '5',
    title: 'Shows',
    url: 'https://www.flycatcherband.com/tour',
    thumbnail: '/images/flycatcher/profile.jpg',
  },
  {
    id: '6',
    title: 'flycatcher - down (official music video)',
    url: 'https://www.youtube.com/watch?v=KvTf8pDQ_wk',
    thumbnail: '/images/flycatcher-down.jpg',
  },
];

const libraryTabs = ['All', 'Links', 'Products'] as const;
type LibraryTab = (typeof libraryTabs)[number];

export default function AddDialog({
  isOpen,
  onClose,
  onAddLink,
}: AddDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('suggested');
  const [activeLibraryTab, setActiveLibraryTab] = useState<LibraryTab>('All');

  const handleAddItem = (title: string) => {
    onAddLink?.(title);
    onClose();
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(2px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(238, 235, 229, 0.4)' }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.2 },
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              initial={{ borderRadius: 9999 }}
              animate={{ borderRadius: 24 }}
              exit={{ borderRadius: 9999 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-primary shadow-elevation-200 w-full max-w-[942px] h-[656px] flex flex-col overflow-hidden pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="flex items-center gap-4 p-4 bg-primary relative"
              >
                <IconButton
                  variant="secondary"
                  size="sm"
                  icon={XIcon as IconComponent}
                  aria-label="Close"
                  onClick={onClose}
                  style={{ border: 'none', color: 'rgba(0, 0, 0, 1)' }}
                />
                <span className="absolute left-1/2 -translate-x-1/2 text-body-base text-primary">
                  Add
                </span>
              </motion.div>

              {/* Search bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.2 }}
                className="flex gap-2 items-start px-4 pb-6 border-b border-tertiary"
              >
                <div
                  className="flex-1 flex gap-2 items-center px-4 py-3 rounded-full"
                  style={{ backgroundColor: 'rgba(241, 240, 238, 1)' }}
                >
                  <MagnifyingGlassIcon
                    size={20}
                    className="text-primary shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search or paste a link..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-body-base text-primary placeholder:text-secondary outline-none"
                    autoFocus
                  />
                </div>
                <IconButton
                  variant="secondary"
                  size="lg"
                  icon={SlidersHorizontalIcon as IconComponent}
                  aria-label="Filters"
                  style={{ backgroundColor: 'rgba(241, 240, 238, 1)' }}
                />
              </motion.div>

              {/* Content area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="flex flex-1 overflow-hidden"
              >
                {/* Left sidebar */}
                <div className="shrink-0 px-4 py-6 flex flex-col gap-6 bg-primary overflow-y-auto">
                  {/* Browse by section */}
                  <div className="flex flex-col gap-4">
                    <span className="text-body-sm-emph text-secondary">
                      Browse by
                    </span>
                    <div className="flex flex-col">
                      {browseByItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.03,
                            duration: 0.2,
                          }}
                          onClick={() => setActiveNavItem(item.id)}
                          className={`flex gap-2 items-center py-3 pl-3 pr-4 rounded-full transition-colors ${
                            activeNavItem === item.id
                              ? 'bg-secondary'
                              : 'hover:bg-secondary/50'
                          }`}
                        >
                          <span className="text-primary">{item.icon}</span>
                          <span className="text-body-sm text-primary">
                            {item.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Other section */}
                  <div className="flex flex-col gap-4">
                    <span className="text-body-sm-emph text-secondary">
                      Other
                    </span>
                    <div className="flex flex-col">
                      {otherItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.35 + index * 0.03,
                            duration: 0.2,
                          }}
                          onClick={() => setActiveNavItem(item.id)}
                          className={`flex gap-2 items-center py-3 pl-3 pr-4 rounded-full transition-colors ${
                            activeNavItem === item.id
                              ? 'bg-secondary'
                              : 'hover:bg-secondary/50'
                          }`}
                        >
                          <span className="text-primary">{item.icon}</span>
                          <span className="text-body-sm text-primary">
                            {item.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right content */}
                {activeNavItem === 'library' ? (
                  /* Library View */
                  <div className="flex-1 flex flex-col gap-8 p-4 overflow-hidden">
                    {/* Tabs */}
                    <Tabs
                      value={activeLibraryTab}
                      onValueChange={value =>
                        setActiveLibraryTab(value as LibraryTab)
                      }
                    >
                      <TabsList>
                        {libraryTabs.map(tab => (
                          <TabsTrigger key={tab} value={tab}>
                            {tab}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>

                    {/* Library Items List */}
                    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                      {mockLibraryItems
                        .filter(item => {
                          if (activeLibraryTab === 'All') return true;
                          if (activeLibraryTab === 'Products')
                            return item.tag === 'digital-product';
                          if (activeLibraryTab === 'Links')
                            return item.tag !== 'digital-product';
                          return true;
                        })
                        .map(item => (
                          <div
                            key={item.id}
                            className="flex gap-3 items-center w-full"
                          >
                            {/* Thumbnail */}
                            <div className="shrink-0 size-10 rounded-xl overflow-hidden bg-tertiary">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Text content */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <p className="text-body-sm-emph text-primary truncate">
                                {item.title}
                              </p>
                              <p className="text-body-sm text-secondary truncate">
                                {item.url}
                              </p>
                            </div>

                            {/* Tag (optional) */}
                            {item.tag === 'digital-product' && (
                              <div className="shrink-0 flex items-center gap-1 px-1 py-1 bg-primary border border-tertiary rounded-lg">
                                <CloudArrowDownIcon
                                  size={16}
                                  className="text-primary"
                                />
                                <span className="text-body-xs-emph text-primary">
                                  Digital product
                                </span>
                              </div>
                            )}

                            {/* Actions */}
                            <button
                              onClick={() => handleAddItem(item.title)}
                              className="shrink-0 p-1 hover:bg-secondary rounded transition-colors"
                            >
                              <PlusIcon size={16} className="text-primary" />
                            </button>
                            <button className="shrink-0 p-1 hover:bg-secondary rounded transition-colors">
                              <DotsThreeIcon
                                size={16}
                                weight="bold"
                                className="text-primary"
                              />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  /* Card Grid (default view) */
                  <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-2 gap-2.5">
                      {mockSuggestedCards.map((card, index) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.05,
                            duration: 0.2,
                          }}
                          className="bg-secondary rounded-2xl p-4 flex flex-col gap-4 overflow-hidden"
                        >
                          {/* Preview area */}
                          <div className="relative rounded-xl overflow-hidden bg-tertiary h-[140px]">
                            {/* Placeholder preview - matches Figma gray */}
                          </div>

                          {/* Footer - Title, description & add button */}
                          <div className="flex gap-3 items-start">
                            <div className="flex-1 min-w-0">
                              <p className="text-body-sm-emph text-primary truncate">
                                {card.title}
                              </p>
                              <p className="text-body-sm text-secondary truncate">
                                {card.description}
                              </p>
                            </div>
                            <IconButton
                              variant="primary"
                              size="xs"
                              icon={PlusIcon as IconComponent}
                              aria-label={`Add ${card.title}`}
                              onClick={() => handleAddItem(card.title)}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
