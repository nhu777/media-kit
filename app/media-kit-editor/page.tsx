'use client';

import {
  MediaKitEditorSidebar,
  MediaKitEditorWorkspace,
} from '@/components/media-kit-editor';

export default function MediaKitEditorPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary">
      <MediaKitEditorSidebar />
      <div className="min-w-0 flex-1">
        <MediaKitEditorWorkspace />
      </div>
    </div>
  );
}
