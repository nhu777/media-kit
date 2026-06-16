'use client';

import React, { useState } from 'react';

import NestedViewHeader from './NestedViewHeader';

interface ThemesViewProps {
  onBack: () => void;
}

interface Theme {
  id: string;
  name: string;
}

interface TabItem {
  value: string;
  label: string;
}

const themes: Theme[] = [
  { id: 'custom', name: 'Custom' },
  { id: 'air', name: 'Air' },
  { id: 'agate', name: 'Agate' },
  { id: 'astrid', name: 'Astrid' },
  { id: 'aura', name: 'Aura' },
  { id: 'bliss', name: 'Bliss' },
  { id: 'blocks', name: 'Blocks' },
  { id: 'bloom', name: 'Bloom' },
  { id: 'breeze', name: 'Breeze' },
  { id: 'encore', name: 'Encore' },
  { id: 'grid', name: 'Grid' },
  { id: 'groove', name: 'Groove' },
  { id: 'haven', name: 'Haven' },
  { id: 'lake', name: 'Lake' },
  { id: 'mineral', name: 'Mineral' },
  { id: 'nourish', name: 'Nourish' },
  { id: 'rise', name: 'Rise' },
  { id: 'sweat', name: 'Sweat' },
  { id: 'tress', name: 'Tress' },
  { id: 'twilight', name: 'Twilight' },
  { id: 'vox', name: 'Vox' },
];

const curatedThemes: Theme[] = [
  { id: 'billie-eilish', name: 'Billie Eilish' },
  { id: 'daniel-triendl', name: 'Daniel Triendl' },
  { id: 'luke-john-matthew-arnold', name: 'Luke John Matthew Arnold' },
  { id: 'olivia-rodrigo', name: 'Olivia Rodrigo' },
  { id: 'selena-benny', name: 'Selena & Benny' },
  { id: 'starry-night', name: 'Starry Night' },
];

const tabs: TabItem[] = [
  { value: 'customizable', label: 'Customizable' },
  { value: 'curated', label: 'Curated' },
];

export default function ThemesView({ onBack }: ThemesViewProps) {
  const [activeTab, setActiveTab] = useState('customizable');
  const [selectedByTab, setSelectedByTab] = useState<Record<string, string>>({
    customizable: 'custom',
    curated: curatedThemes[0]?.id ?? '',
  });

  const selectedTheme = selectedByTab[activeTab] ?? '';

  const setSelectedTheme = (themeId: string) => {
    setSelectedByTab(prev => ({ ...prev, [activeTab]: themeId }));
  };

  const displayedThemes = activeTab === 'customizable' ? themes : curatedThemes;
  const customTheme = themes.find(t => t.id === 'custom');
  const otherThemes = displayedThemes.filter(t => t.id !== 'custom');

  return (
    <div className="flex flex-col h-full">
      <NestedViewHeader title="Change theme" onBack={onBack} />
      <div className="flex flex-col gap-4 px-12 pb-16 flex-1 overflow-y-auto">
        <div className="flex items-center gap-6 border-b border-tertiary w-full">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="relative flex flex-col items-center"
            >
              <span
                className={`py-2.5 text-body-sm-emph ${
                  activeTab === tab.value ? 'text-primary' : 'text-secondary'
                }`}
              >
                {tab.label}
              </span>
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgba(0,0,0,0.9)] rounded-t-[2px]" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {customTheme && activeTab === 'customizable' && (
            <div className="flex flex-col gap-1 items-center w-[64px] mt-2">
              <button
                onClick={() => setSelectedTheme('custom')}
                className={`relative w-[64px] h-[80px] rounded-[12px] overflow-hidden transition-all hover:opacity-90 ${
                  selectedTheme === 'custom'
                    ? 'ring-2 ring-[rgba(0,0,0,0.9)] ring-offset-2'
                    : ''
                }`}
              >
                <div className="absolute inset-0 bg-[#424e7b] rounded-[12px] overflow-hidden">
                  <p className="absolute left-2 top-2.5 text-title-sm font-normal text-white tracking-tight">
                    Aa
                  </p>
                </div>
              </button>
              <p className="text-body-xs text-secondary text-center">
                {customTheme.name}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-x-2 gap-y-2 w-[320px]">
            {otherThemes.map(theme => (
              <div
                key={theme.id}
                className="flex flex-col gap-1 items-center w-[64px]"
              >
                <button
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`relative w-full aspect-[4/5] rounded-[12px] overflow-hidden bg-secondary transition-all hover:opacity-90 ${
                    selectedTheme === theme.id
                      ? 'ring-2 ring-[rgba(0,0,0,0.9)] ring-offset-2'
                      : ''
                  }`}
                >
                  <img
                    src={`/themes/${theme.id}.png`}
                    alt={theme.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                <p className="text-body-xs text-secondary text-center">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
