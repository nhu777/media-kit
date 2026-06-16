'use client';

import {
  CaretDownIcon,
  CheckIcon,
  EyesIcon,
  GlobeIcon,
  InstagramLogoIcon,
  SlidersHorizontalIcon,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';

import { useClickOutside } from './useClickOutside';

type AudienceSegment =
  | 'Everyone'
  | 'Australia'
  | 'Europe'
  | 'Instagram Traffic';

const segmentIcons: Record<AudienceSegment, typeof EyesIcon> = {
  Everyone: EyesIcon,
  Australia: GlobeIcon,
  Europe: GlobeIcon,
  'Instagram Traffic': InstagramLogoIcon,
};

interface PreviewMenuButtonProps {
  value?: AudienceSegment;
  onChange?: (segment: AudienceSegment) => void;
}

export default function PreviewMenuButton({
  value = 'Everyone',
  onChange,
}: PreviewMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] =
    useState<AudienceSegment>(value);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const handleSelect = (segment: AudienceSegment) => {
    setSelectedSegment(segment);
    onChange?.(segment);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        onClick={() => setIsOpen(v => !v)}
        className="h-[32px] flex items-center gap-1.5 pl-4 pr-2.5 bg-elevated rounded-full shadow-elevation-100"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {(() => {
          const Icon = segmentIcons[selectedSegment];
          return <Icon size={14} weight="regular" className="text-primary" />;
        })()}
        <span className="text-body-sm-emph text-secondary">
          {selectedSegment}
        </span>
        <CaretDownIcon size={14} weight="bold" className="text-primary" />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="absolute z-20 w-[260px] left-1/2 -translate-x-1/2 rounded-xl bg-elevated shadow-elevation-400 p-3"
        >
          <div className="flex flex-col gap-[1px]">
            {(
              [
                'Everyone',
                'Australia',
                'Europe',
                'Instagram Traffic',
              ] as AudienceSegment[]
            ).map(segment => {
              const Icon = segmentIcons[segment];
              return (
                <button
                  key={segment}
                  role="menuitem"
                  onClick={() => handleSelect(segment)}
                  className="w-full flex items-center gap-4 rounded-full p-2 text-body-sm text-primary hover:bg-secondary"
                >
                  <Icon size={20} weight="regular" />
                  <span className="flex-1 text-left">{segment}</span>
                  {selectedSegment === segment && (
                    <CheckIcon size={20} weight="bold" />
                  )}
                </button>
              );
            })}
            <button
              role="menuitem"
              className="w-full flex items-center gap-4 rounded-full p-2 text-body-sm text-green-800 hover:bg-secondary"
            >
              <SlidersHorizontalIcon size={20} weight="regular" />
              <span className="flex-1 text-left">Manage audience rules</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
