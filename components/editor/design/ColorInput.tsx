'use client';

import React, { useRef } from 'react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export default function ColorInput({
  label,
  value,
  onChange,
}: ColorInputProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between w-full">
      <span className="flex-1 text-body-sm text-primary">{label}</span>
      <div className="flex-1 h-12 flex items-center justify-between px-3 border border-primary rounded-md overflow-hidden">
        <input
          type="text"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="bg-transparent text-body-xs text-primary font-mono w-20 outline-none"
          placeholder="#000000"
        />
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="sr-only"
        />
        <div
          className="size-7 rounded-full shadow-elevation-100 shrink-0 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => colorInputRef.current?.click()}
        />
      </div>
    </div>
  );
}
