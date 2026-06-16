'use client';

import {
  CardsThreeIcon,
  GearSixIcon,
  PaintBrushBroadIcon,
  UserIcon,
} from '@phosphor-icons/react';
import { clsx } from 'clsx';

const tabs: { key: string; label: string; icon: React.ElementType }[] = [
  { key: 'content', label: 'Content', icon: CardsThreeIcon },
  { key: 'header', label: 'Header', icon: UserIcon },
  { key: 'design', label: 'Design', icon: PaintBrushBroadIcon },
  { key: 'settings', label: 'Settings', icon: GearSixIcon },
];

interface EditorPanelNavProps {
  activePanel: string | null;
  onPanelSelect: (panel: string) => void;
}

export default function EditorPanelNav({
  activePanel,
  onPanelSelect,
}: EditorPanelNavProps) {
  return (
    <nav className="flex flex-col items-center w-[88px] h-full px-4 py-6 shrink-0">
      <div className="flex flex-col gap-6 items-center">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activePanel === key;
          return (
            <button
              key={key}
              onClick={() => onPanelSelect(key)}
              className="group flex flex-col gap-[2px] items-center justify-center"
            >
              <Icon
                size={20}
                weight={isActive ? 'fill' : 'regular'}
                className={clsx(
                  'transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-secondary group-hover:text-primary'
                )}
              />
              <span
                className={clsx(
                  'text-body-xxs-emph transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-secondary group-hover:text-primary'
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
