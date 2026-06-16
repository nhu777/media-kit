'use client';

import React from 'react';

import { useEditorTheme } from '@/components/editor/shared';

import ColorInput from './ColorInput';
import NestedViewHeader from './NestedViewHeader';

interface ColorsViewProps {
  onBack: () => void;
}

interface ColorOption {
  id: string;
  label: string;
}

const colorOptions: ColorOption[] = [
  { id: 'background', label: 'Background' },
  { id: 'buttonBackground', label: 'Button background' },
  { id: 'buttonText', label: 'Button text' },
  { id: 'pageText', label: 'Title text' },
];

export default function ColorsView({ onBack }: ColorsViewProps) {
  const {
    backgroundColor,
    setBackgroundColor,
    linkBlockBackground,
    setLinkBlockBackground,
    buttonTextColor,
    setButtonTextColor,
    pageTextColor,
    setPageTextColor,
  } = useEditorTheme();

  const getColorValue = (id: string): string => {
    if (id === 'background') {
      return backgroundColor;
    }
    if (id === 'buttonBackground') {
      return linkBlockBackground;
    }
    if (id === 'buttonText') {
      return buttonTextColor;
    }
    if (id === 'pageText') {
      return pageTextColor;
    }
    return '#FFFFFF';
  };

  const handleColorChange = (id: string, value: string) => {
    if (id === 'background') {
      setBackgroundColor(value);
    } else if (id === 'buttonBackground') {
      setLinkBlockBackground(value);
    } else if (id === 'buttonText') {
      setButtonTextColor(value);
    } else if (id === 'pageText') {
      setPageTextColor(value);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <NestedViewHeader title="Colors" onBack={onBack} />
      <div className="flex flex-col gap-6 px-12 pb-16 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {colorOptions.map(option => (
            <ColorInput
              key={option.id}
              label={option.label}
              value={getColorValue(option.id)}
              onChange={value => handleColorChange(option.id, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
