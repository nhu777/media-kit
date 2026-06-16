'use client';

import { CaretRightIcon, PlusIcon } from '@phosphor-icons/react';
import React from 'react';

import { useEditorTheme } from '../shared/EditorThemeContext';
import type { DesignViewType } from './DesignView';
import StyleTab from './StyleTab';

interface DesignOverviewProps {
  onNavigate: (view: DesignViewType) => void;
}

export default function DesignOverview({ onNavigate }: DesignOverviewProps) {
  const { backgroundColor, buttonTextColor, getShellBackground } =
    useEditorTheme();

  return (
    <div className="flex flex-col h-full">
      <div className="h-[72px] flex items-center justify-center px-6 py-4 shrink-0">
        <h2 className="text-body-base-emph text-primary">Design</h2>
      </div>

      <div className="flex flex-col gap-6 px-10 pb-16 flex-1 overflow-y-auto">
        <section className="flex flex-col gap-4 pb-6">
          <div
            className="relative h-20 rounded-xl overflow-hidden"
            style={{ background: getShellBackground() }}
          >
            <div
              className="absolute left-7 top-3 w-20 h-[105px] rounded-[10px] shadow-elevation-200 overflow-hidden"
              style={{ backgroundColor }}
            >
              <p className="absolute left-[23px] -translate-x-1/2 top-[10px] text-[20px] font-medium leading-[1.2] tracking-[-0.4px] text-white">
                Aa
              </p>
              <div
                className="absolute left-5 top-[41px] w-[60px] h-[27px] rounded-tl-[6.667px] rounded-bl-[6.667px] backdrop-blur-[10px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderWidth: '0.832px',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
              />
            </div>

            <button
              onClick={() => onNavigate('themes')}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 h-8 px-3.5 bg-elevated rounded-full shadow-elevation-100 text-body-sm-emph text-primary hover:bg-secondary transition-colors"
            >
              Edit theme
            </button>
          </div>

          <button
            onClick={() => onNavigate('themes')}
            className="flex items-center justify-between pl-0 pr-3 hover:opacity-80 transition-opacity"
          >
            <span className="text-body-sm-emph text-primary w-[200px] text-left truncate">
              New themes available
            </span>
            <div className="flex items-center gap-2">
              <div className="relative w-[78px] h-[52px]">
                <div
                  className="absolute left-0 top-[1px] size-[49px] rounded-[15px] border-[2.5px] border-white shadow-elevation-200 bg-elevated rotate-[-2deg]"
                  style={{
                    backgroundImage: "url('/themes/rise.png')",
                    backgroundSize: 'cover',
                  }}
                />
                <div
                  className="absolute left-[28px] top-0 size-[49px] rounded-[15px] border-[2.5px] border-white shadow-elevation-200 bg-elevated rotate-[4deg]"
                  style={{
                    backgroundImage: "url('/themes/astrid.png')",
                    backgroundSize: 'cover',
                  }}
                />
              </div>
              <CaretRightIcon
                size={20}
                weight="regular"
                className="text-primary"
              />
            </div>
          </button>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-body-sm-emph text-primary">Edit styles</h3>

          <div className="flex flex-col gap-3">
            <StyleTab
              label="Background"
              onClick={() => onNavigate('background')}
              icon={
                <div
                  className="size-10 rounded-2xl border border-white shadow-elevation-200"
                  style={{ backgroundColor }}
                />
              }
            />

            <StyleTab
              label="Effects"
              onClick={() => onNavigate('effects')}
              icon={
                <div className="size-10 rounded-full border border-primary flex items-center justify-center">
                  <PlusIcon
                    size={20}
                    weight="regular"
                    className="text-primary"
                  />
                </div>
              }
            />

            <StyleTab
              label="Buttons"
              onClick={() => onNavigate('buttons')}
              icon={
                <div className="size-10 flex items-center justify-center">
                  <div
                    className="w-10 h-5 rounded-full shadow-elevation-200"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                  />
                </div>
              }
            />

            <StyleTab
              label="Fonts"
              onClick={() => onNavigate('fonts')}
              icon={
                <div className="size-10 bg-elevated rounded-sm shadow-elevation-100 flex items-center justify-center">
                  <span className="text-body-base text-primary">Aa</span>
                </div>
              }
            />

            <StyleTab
              label="Colors"
              onClick={() => onNavigate('colors')}
              icon={
                <div
                  className="size-10 rounded-full border border-white shadow-elevation-100 overflow-hidden relative"
                  style={{ backgroundColor: buttonTextColor }}
                >
                  <div
                    className="absolute left-0 top-0 w-1/2 h-full rounded-l-full"
                    style={{ backgroundColor }}
                  />
                </div>
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}
