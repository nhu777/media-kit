'use client';

import {
  ArrowsCounterClockwiseIcon,
  ChartLineUpIcon,
  CursorClickIcon,
  EyesIcon,
  InfoIcon,
  InstagramLogoIcon,
  TicketIcon,
  TiktokLogoIcon,
  UsersThreeIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import React from 'react';

import type {
  PerformanceCardData,
  PerformanceIconStat,
} from './performanceData';
import {
  MEDIA_KIT_ACCENT,
  MEDIA_KIT_ACCENT_RADIUS_CLASS,
  type Platform,
} from './shared';

const PERFORMANCE_CARD_CLASS =
  'flex h-[480px] w-[319px] shrink-0 snap-start snap-always flex-col gap-3 rounded-[20px] bg-primary p-4';

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: InstagramLogoIcon,
  tiktok: TiktokLogoIcon,
  youtube: YoutubeLogoIcon,
};

const PERFORMANCE_ICON_BADGE_CLASS =
  'inline-flex shrink-0 items-center justify-center rounded-[10px]';

function PerformanceIconBadge({ icon }: { icon: PerformanceIconStat['icon'] }) {
  const style = { backgroundColor: MEDIA_KIT_ACCENT };
  const isChart = icon === 'chart';

  return (
    <div
      className={`${PERFORMANCE_ICON_BADGE_CLASS} ${
        isChart ? 'size-14' : 'size-12'
      }`}
      style={style}
    >
      {icon === 'users' && <UsersThreeIcon size={24} weight="regular" />}
      {icon === 'click' && <CursorClickIcon size={24} weight="regular" />}
      {icon === 'return' && (
        <ArrowsCounterClockwiseIcon size={24} weight="regular" />
      )}
      {icon === 'eyes' && <EyesIcon size={24} weight="regular" />}
      {icon === 'chart' && <ChartLineUpIcon size={32} weight="regular" />}
    </div>
  );
}

function LinkPreviewThumbnail({
  image,
  variant = 'image',
}: {
  image?: string;
  variant?: 'image' | 'ticket';
}) {
  return (
    <div className="flex size-[68px] shrink-0 items-center justify-center">
      <div className="-rotate-[4deg]">
        <div
          className={`relative size-16 overflow-hidden rounded-[13px] border-[3px] border-white shadow-[0px_8px_16px_0px_rgba(0,0,0,0.08)] ${
            variant === 'ticket' ? 'flex items-center justify-center' : ''
          }`}
          style={
            variant === 'ticket'
              ? { backgroundColor: MEDIA_KIT_ACCENT }
              : undefined
          }
        >
          {variant === 'ticket' ? (
            <TicketIcon size={26} weight="regular" />
          ) : (
            image && (
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function PerformanceCardShell({
  label,
  highlight,
  onInfoClick,
  children,
}: {
  label: string;
  highlight: string;
  onInfoClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <article className={PERFORMANCE_CARD_CLASS}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-body-xs text-secondary">{label}</p>
          <button
            type="button"
            aria-label={`More info about ${label}`}
            onClick={onInfoClick}
            className="flex shrink-0 items-center justify-center text-secondary"
          >
            <InfoIcon size={24} weight="regular" />
          </button>
        </div>
        <div
          className={`p-4 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
          style={{ backgroundColor: MEDIA_KIT_ACCENT }}
        >
          <p className="text-body-lg-emph text-primary">{highlight}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

function BorderedSubCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-[16px] border border-secondary p-4 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
    >
      {children}
    </div>
  );
}

function IconStatBlock({ stat }: { stat: PerformanceIconStat }) {
  return (
    <BorderedSubCard>
      <PerformanceIconBadge icon={stat.icon} />
      <div className="flex flex-col gap-2">
        <p
          className={`text-primary ${
            stat.icon === 'eyes' || stat.icon === 'chart'
              ? 'text-body-sm'
              : 'text-body-sm-emph'
          }`}
        >
          {stat.title}
        </p>
        {stat.caption && (
          <p className="text-body-xs text-secondary">{stat.caption}</p>
        )}
      </div>
    </BorderedSubCard>
  );
}

export function PerformanceCard({
  data,
  onInfoClick,
}: {
  data: PerformanceCardData;
  onInfoClick?: () => void;
}) {
  return (
    <PerformanceCardShell
      label={data.label}
      highlight={data.highlight}
      onInfoClick={onInfoClick}
    >
      <div className="flex flex-1 flex-col gap-3">
        {data.topLinks && (
          <BorderedSubCard>
            <p className="text-body-xs text-secondary">Top performing links</p>
            <div className="flex flex-col gap-5">
              {data.topLinks.map(link => (
                <div key={link.title} className="flex items-center gap-4">
                  <LinkPreviewThumbnail
                    image={link.image}
                    variant={link.variant}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="truncate text-body-xs text-secondary">
                      {link.title}
                    </p>
                    <p className="text-body-sm-emph text-primary">
                      {link.clickRate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BorderedSubCard>
        )}

        {data.trafficSources && (
          <>
            <BorderedSubCard>
              <p className="text-body-xs text-secondary">
                Average clicks by traffic source
              </p>
              <div className="flex flex-col gap-3">
                {data.trafficSources.map(row => {
                  const Icon = PLATFORM_ICONS[row.platform];
                  return (
                    <div
                      key={row.platform}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={24} weight="regular" />
                        <span className="text-body-sm text-primary">
                          {row.label}
                        </span>
                      </div>
                      <span className="text-body-sm-emph text-primary">
                        {row.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </BorderedSubCard>
            {data.iconStats?.map(stat => (
              <IconStatBlock key={stat.title} stat={stat} />
            ))}
          </>
        )}

        {data.categories && (
          <BorderedSubCard>
            <p className="text-body-xs-emph text-secondary">Top categories</p>
            <div className="flex flex-wrap gap-2">
              {data.categories.map(category => (
                <span
                  key={category}
                  className={`px-3 py-2 text-body-xs-emph text-primary ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
                  style={{ backgroundColor: MEDIA_KIT_ACCENT }}
                >
                  {category}
                </span>
              ))}
            </div>
          </BorderedSubCard>
        )}

        {data.iconStats &&
          !data.trafficSources &&
          data.iconStats.map(stat => (
            <IconStatBlock key={stat.title} stat={stat} />
          ))}
      </div>
    </PerformanceCardShell>
  );
}
