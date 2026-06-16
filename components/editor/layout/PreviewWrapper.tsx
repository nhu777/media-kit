'use client';

import { BlockToolbarProvider } from '@/components/editor/profile/BlockToolbarContext';
import { useEditorTheme } from '@/components/editor/shared';

interface PreviewWrapperProps {
  children: React.ReactNode;
}

export default function PreviewWrapper({ children }: PreviewWrapperProps) {
  const { getPreviewBackground } = useEditorTheme();

  return (
    <div
      className="relative flex h-full min-w-0 flex-1 items-center justify-center overflow-clip px-2 py-6 rounded-t-2xl"
      style={{ background: getPreviewBackground() }}
    >
      <BlockToolbarProvider>{children}</BlockToolbarProvider>
    </div>
  );
}
