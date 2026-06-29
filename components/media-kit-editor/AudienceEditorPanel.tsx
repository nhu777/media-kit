'use client';

import {
  CakeIcon,
  GenderFemaleIcon,
  InstagramLogoIcon,
  MapPinIcon,
  TiktokLogoIcon,
  UsersThreeIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import type { ComponentType } from 'react';

import { PLATFORM_STATS } from '@/components/media-kit/platformData';
import { cn } from '@/lib/utils';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorSectionHeader } from './EditorSectionHeader';

function AudienceStatCard({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-[16px] border border-secondary p-4',
        className
      )}
    >
      <Icon size={24} className="shrink-0 text-primary" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-xs text-secondary">{label}</p>
        <p className="text-body-sm-emph text-primary">{value}</p>
      </div>
    </div>
  );
}

interface AudienceEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
}

export function AudienceEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
}: AudienceEditorPanelProps) {
  const audience = PLATFORM_STATS.instagram.audience;

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Audience"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-8">
        <div className="overflow-hidden rounded-[20px] bg-primary">
          <div className="rounded-[20px] border border-tertiary bg-elevated">
            <div className="flex items-center gap-4 p-4">
              <UsersThreeIcon
                size={24}
                weight="regular"
                className="shrink-0 text-primary"
              />
              <p className="text-body-sm-emph text-primary">
                Audience overview
              </p>
            </div>

            <div className="flex flex-col gap-3 px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                <AudienceStatCard
                  icon={GenderFemaleIcon}
                  label="Gender"
                  value={audience.gender}
                />
                <AudienceStatCard
                  icon={CakeIcon}
                  label="Average age"
                  value={audience.averageAge}
                />
              </div>
              <AudienceStatCard
                icon={MapPinIcon}
                label="Top location"
                value={audience.topLocation}
              />
            </div>
          </div>

          <div className="p-4">
            <p className="text-body-xs text-secondary">
              Brands use audience demographics to judge whether your followers
              match the customers they&apos;re trying to reach.
            </p>
          </div>
        </div>

        <EditorEducationBlock title="Why do brands need audience demographics?">
          <p className="text-body-xs text-secondary">
            Demographics are the first filter brands apply when shortlisting
            creators. Gender, age and location help them assess whether your
            audience aligns with their target customer.
          </p>
        </EditorEducationBlock>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-start gap-1">
            <InstagramLogoIcon
              size={20}
              weight="regular"
              className="text-primary"
            />
            <TiktokLogoIcon
              size={20}
              weight="regular"
              className="text-primary"
            />
            <YoutubeLogoIcon
              size={20}
              weight="regular"
              className="text-primary"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="text-center text-body-xs text-secondary">
              Social audience data aggregated by
            </span>
            <Image
              src="/media-kit/linktree-wordmark.svg"
              alt="Linktree"
              width={55}
              height={11}
              className="shrink-0"
            />
            <span className="text-center text-body-xs text-secondary">
              in the last 28 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
