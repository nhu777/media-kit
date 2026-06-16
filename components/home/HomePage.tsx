'use client';

import { Button } from '@linktr.ee/arbor/Button';
import type { IconComponent } from '@linktr.ee/arbor/IconButton';
import { IconButton } from '@linktr.ee/arbor/IconButton';
import {
  BellIcon,
  CaretDownIcon,
  CursorClickIcon,
  EyeIcon,
  FileIcon,
  LinkIcon,
  MoneyIcon,
  SparkleIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAllPages } from '@/lib/editorData';

import { ExploreCard } from './ExploreCard';
import { PageCard } from './PageCard';
import { InsightsStats, StatDivider, StatItem } from './StatCard';

interface HomePageProps {
  username?: string;
}

export function HomePage({ username = 'Creator' }: HomePageProps) {
  const pages = getAllPages();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-primary rounded-[24px] shadow-elevation-100 p-10">
      <div className="flex flex-col gap-12 max-w-[1400px] mx-auto">
        {/* Pages Section */}
        <section className="flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex items-center gap-2">
            <h1 className="flex-1 text-title-md text-primary">
              {getGreeting()}, {username}
            </h1>

            {/* Sparkle Button */}
            <IconButton
              aria-label="AI features"
              variant="secondary"
              size="md"
              icon={SparkleIcon as IconComponent}
            />

            {/* Notifications with Badge */}
            <div className="relative">
              <IconButton
                aria-label="Notifications"
                variant="secondary"
                size="md"
                icon={BellIcon as IconComponent}
              />
              <div className="absolute top-2.5 right-3 size-1.5 bg-accent rounded-full ring-0" />
            </div>

            {/* Create Button with Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary" size="sm" shape="capsule">
                  <span>Create</span>
                  <CaretDownIcon size={14} weight="bold" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-[200px] p-0 rounded-[24px] shadow-elevation-400 overflow-hidden"
              >
                <button className="flex w-full items-center gap-3 px-4 py-3 text-body-sm text-primary hover:bg-secondary transition-colors">
                  <FileIcon size={20} weight="regular" className="shrink-0" />
                  <span>New page</span>
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-3 text-body-sm text-primary hover:bg-secondary transition-colors">
                  <LinkIcon size={20} weight="regular" className="shrink-0" />
                  <span>Create a shortlink</span>
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Page Cards Row */}
          <div className="flex gap-6">
            {pages.map(page => {
              // Hardcoded external URLs for specific pages
              const externalUrls: Record<string, string> = {
                flycatcher:
                  'https://baby-linktree.vercel.app/editor/flycatcher',
                'national-parks':
                  'https://baby-linktree.vercel.app/editor/national-parks',
              };
              const isExternal = page.id in externalUrls;

              return (
                <PageCard
                  key={page.id}
                  title={page.name}
                  subtitle={page.subtitle}
                  href={
                    isExternal ? externalUrls[page.id] : `/editor/${page.id}`
                  }
                  target={isExternal ? '_blank' : undefined}
                  backgroundColor={page.design.backgroundColor}
                />
              );
            })}
          </div>
        </section>

        {/* Insights Section */}
        <section className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <span className="flex-1 text-body-base-emph text-primary">
              Insights
            </span>
            <Button variant="ghost" size="sm" shape="capsule">
              <span>Past 7 days</span>
              <CaretDownIcon size={14} weight="bold" />
            </Button>
          </div>

          {/* Stats Row */}
          <InsightsStats>
            <StatItem
              icon={EyeIcon}
              value="6,345"
              label="Views"
              changePercent={7}
              changeDirection="up"
            />
            <StatDivider />
            <StatItem
              icon={CursorClickIcon}
              value="1,245"
              label="Clicks"
              changePercent={7}
              changeDirection="up"
            />
            <StatDivider />
            <StatItem
              icon={UsersIcon}
              value="+8"
              label="Subscribers"
              changePercent={2}
              changeDirection="down"
            />
            <StatDivider />
            <StatItem
              icon={MoneyIcon}
              value="$302.34"
              label="Earnings"
              changePercent={4}
              changeDirection="up"
            />
          </InsightsStats>
        </section>

        {/* Explore Section */}
        <section className="flex flex-col gap-4">
          <span className="text-body-base-emph text-primary">
            Explore more on Linktree
          </span>

          {/* Explore Cards Row */}
          <div className="flex gap-4">
            <ExploreCard
              emoji="🕺"
              title="Audience manager"
              description="Earn more with selling first party products directly on your Linktree"
            />
            <ExploreCard
              emoji="🛍️"
              title="Affiliate products"
              description="Earn more with selling first party products directly on your Linktree"
            />
            <ExploreCard
              emoji="💸"
              title="Sell with Linktree"
              description="Earn more with selling first party products directly on your Linktree"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
