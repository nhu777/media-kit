'use client';

import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react';
import React from 'react';

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  changePercent?: number;
  changeDirection?: 'up' | 'down';
}

export function StatItem({
  icon: Icon,
  value,
  label,
  changePercent,
  changeDirection,
}: StatItemProps) {
  const showChange =
    changePercent !== undefined && changeDirection !== undefined;

  return (
    <div className="flex-1 flex flex-col gap-2 items-center justify-center">
      {/* Icon */}
      <Icon size={24} weight="regular" className="text-primary" />

      {/* Content */}
      <div className="flex flex-col gap-2 items-center justify-center">
        {/* Text */}
        <div className="flex flex-col items-center text-center">
          <span className="text-title-sm text-primary">{value}</span>
          <span className="text-body-sm text-secondary">{label}</span>
        </div>

        {/* Change Indicator */}
        {showChange && (
          <div
            className={`flex items-center gap-0.5 px-2 py-1 rounded-full ${
              changeDirection === 'up'
                ? 'bg-success-subtle'
                : 'bg-danger-subtle'
            }`}
          >
            {changeDirection === 'up' ? (
              <ArrowUpIcon size={14} weight="bold" className="text-success" />
            ) : (
              <ArrowDownIcon size={14} weight="bold" className="text-danger" />
            )}
            <span
              className={`text-body-xs-emph ${
                changeDirection === 'up' ? 'text-success' : 'text-danger'
              }`}
            >
              {changePercent}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Divider between stats (24px height with round caps)
export function StatDivider() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1px] h-6 bg-black/10 rounded-full" />
    </div>
  );
}

// Container for all stats in a row
interface InsightsStatsProps {
  children: React.ReactNode;
}

export function InsightsStats({ children }: InsightsStatsProps) {
  return (
    <div className="bg-elevated border border-secondary rounded-2xl p-6 flex items-center">
      {children}
    </div>
  );
}

// Legacy single stat card (keeping for backward compatibility)
interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  changePercent?: number;
  changeDirection?: 'up' | 'down';
}

export function StatCard({
  icon: Icon,
  value,
  label,
  changePercent,
  changeDirection,
}: StatCardProps) {
  const showChange =
    changePercent !== undefined && changeDirection !== undefined;

  return (
    <div className="bg-elevated border border-secondary rounded-2xl p-4 flex flex-col gap-4">
      {/* Icon */}
      <Icon size={24} weight="regular" className="text-primary" />

      {/* Content */}
      <div className="flex items-center gap-4">
        {/* Text */}
        <div className="flex-1 flex flex-col">
          <span className="text-body-base-emph text-primary">{value}</span>
          <span className="text-body-sm text-secondary">{label}</span>
        </div>

        {/* Change Indicator */}
        {showChange && (
          <div
            className={`flex items-center gap-0.5 px-2 py-1 rounded-full ${
              changeDirection === 'up'
                ? 'bg-success-subtle'
                : 'bg-danger-subtle'
            }`}
          >
            {changeDirection === 'up' ? (
              <ArrowUpIcon size={14} weight="bold" className="text-success" />
            ) : (
              <ArrowDownIcon size={14} weight="bold" className="text-danger" />
            )}
            <span
              className={`text-body-xs-emph ${
                changeDirection === 'up' ? 'text-success' : 'text-danger'
              }`}
            >
              {changePercent}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
