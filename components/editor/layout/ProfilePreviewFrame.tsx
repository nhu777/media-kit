'use client';

import { CheckIcon } from '@phosphor-icons/react';

import {
  useEditorPanel,
  useEditorTheme,
  useSelection,
} from '@/components/editor/shared';
import { Button } from '@/components/ui/button';

interface ProfilePreviewFrameProps {
  children?: React.ReactNode;
}

export default function ProfilePreviewFrame({
  children,
}: ProfilePreviewFrameProps) {
  const { backgroundColor, buttonTextColor } = useEditorTheme();
  const { isEditing, enteredWithPanelOpen, clearSelection } = useSelection();
  const { togglePanel } = useEditorPanel();

  const handleDone = () => {
    clearSelection();
    if (!enteredWithPanelOpen) {
      togglePanel('content');
    }
  };

  return (
    <div
      className="relative h-full w-full max-h-[800px] max-w-[400px] rounded-3xl shadow-elevation-400 overflow-hidden flex flex-col items-stretch justify-center shrink-0"
      style={{ backgroundColor }}
    >
      {isEditing && (
        <Button
          onClick={handleDone}
          variant="glass-secondary"
          size="icon"
          aria-label="Done editing"
          className="absolute top-4 right-4 z-10"
        >
          <CheckIcon size={20} weight="regular" className="text-primary" />
        </Button>
      )}
      {children || (
        <p className="text-body-base" style={{ color: buttonTextColor }}>
          Profile preview
        </p>
      )}
    </div>
  );
}
