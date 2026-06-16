'use client';

import {
  LightbulbFilamentIcon,
  PencilRulerIcon,
  ShootingStarIcon,
} from '@phosphor-icons/react';
import clsx from 'clsx';
import React from 'react';

import RulesIcon from '@/components/editor/shared/RulesIcon';

import type { LinkEditorTab, NavItem } from '../types';

// Navigation items configuration
const navItems: NavItem[] = [
  { id: 'details', label: 'Details', icon: PencilRulerIcon },
  { id: 'prioritize', label: 'Prioritize', icon: ShootingStarIcon },
  { id: 'rules', label: 'Rules', icon: RulesIcon },
  { id: 'insights', label: 'Insights', icon: LightbulbFilamentIcon },
];

interface NavItemButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

function NavItemButton({ item, isActive, onClick }: NavItemButtonProps) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={clsx(
        'group flex items-center gap-2 w-full pl-3 pr-4 py-3 rounded-full transition-colors',
        !isActive && 'hover:bg-white/40'
      )}
    >
      <Icon
        size={20}
        weight="regular"
        className={clsx(
          'flex-shrink-0 transition-colors',
          isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'
        )}
      />
      <span
        className={clsx(
          'text-body-sm transition-colors',
          isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'
        )}
      >
        {item.label}
      </span>
    </button>
  );
}

interface EditorSideNavProps {
  activeTab: LinkEditorTab;
  onTabChange: (tab: LinkEditorTab) => void;
}

export default function EditorSideNav({
  activeTab,
  onTabChange,
}: EditorSideNavProps) {
  return (
    <nav className="w-[200px] flex-shrink-0 border-r border-tertiary px-4 py-6">
      <div className="flex flex-col gap-[1px]">
        {navItems.map(item => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
