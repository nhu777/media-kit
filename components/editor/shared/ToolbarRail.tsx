'use client';

import {
  GearSixIcon,
  PaintBrushBroadIcon,
  PencilIcon,
  UserIcon,
} from '@phosphor-icons/react';
import React from 'react';

export type Tool = 'content' | 'profile' | 'appearance' | 'settings';

interface ToolbarRailProps {
  selected: Tool;
  onSelect: (t: Tool) => void;
}

export default function ToolbarRail({ selected, onSelect }: ToolbarRailProps) {
  const mainItems: { key: Tool; label: string; icon: React.ElementType }[] = [
    { key: 'content', label: 'Content', icon: PencilIcon },
    { key: 'profile', label: 'Header', icon: UserIcon },
    { key: 'appearance', label: 'Design', icon: PaintBrushBroadIcon },
  ];

  const settingsItem = {
    key: 'settings' as Tool,
    label: 'Settings',
    icon: GearSixIcon,
  };

  const renderItem = ({
    key,
    label,
    icon: Icon,
    showLabel = true,
  }: {
    key: Tool;
    label: string;
    icon: React.ElementType;
    showLabel?: boolean;
  }) => {
    const isActive = selected === key;
    return (
      <button
        key={key}
        onClick={() => onSelect(key)}
        aria-current={isActive ? 'page' : undefined}
        className="flex flex-col items-center gap-0.5"
        title={label}
      >
        <div
          className={`size-10 grid place-items-center rounded-full transition-colors ${
            isActive ? 'bg-inverse' : ''
          }`}
        >
          <Icon
            size={24}
            weight="regular"
            className={isActive ? 'text-on-inverse-primary' : 'text-primary'}
          />
        </div>
        {showLabel && (
          <span
            className={
              isActive
                ? 'text-body-xxs text-primary'
                : 'text-body-xxs text-primary'
            }
          >
            {label}
          </span>
        )}
      </button>
    );
  };

  return (
    <nav className="w-[72px] p-4 flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-5 items-center grow justify-center">
        {mainItems.map(renderItem)}
      </div>
      {renderItem({ ...settingsItem, showLabel: false })}
    </nav>
  );
}
