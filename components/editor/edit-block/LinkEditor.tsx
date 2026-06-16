'use client';

import React, { useState } from 'react';

import type { LinkType } from '@/lib/linkData';

// Details panels by link type
import {
  ClassicLinkDetails,
  InstagramLinkDetails,
  YouTubeLinkDetails,
} from './details';
// Panels
import { InsightsPanel, PrioritizePanel, RulesPanel } from './panels';
// Shell components
import { EditorHeader, EditorSideNav } from './shell';
import type { LinkEditorProps, LinkEditorTab } from './types';

/**
 * Returns the appropriate Details component for the given link type.
 */
function getDetailsComponent(linkType: LinkType) {
  switch (linkType) {
    case 'instagram':
      return InstagramLinkDetails;
    case 'youtube':
      return YouTubeLinkDetails;
    case 'music':
    case 'classic':
    case 'digitalProduct':
    default:
      return ClassicLinkDetails;
  }
}

export default function LinkEditor({
  linkType = 'classic',
  title = 'official merch store',
  url = 'https://www.flycatcherband.com/store',
  initialTab = 'details',
  onBack,
  closeMode = 'back',
  onTitleChange,
  // Instagram-specific props
  instagramUsername = 'flycatcherband',
  isConnected = true,
  interactionType: initialInteractionType = 'openProfile',
  onInteractionTypeChange,
  // Thumbnail props
  thumbnailUrl,
  thumbnailType = 'none',
  onThumbnailChange,
  layout = 'classic',
  onLayoutChange,
  // Favicon
  faviconUrl,
  // Suggested titles
  suggestedTitles,
}: LinkEditorProps) {
  const [activeTab, setActiveTab] = useState<LinkEditorTab>(initialTab);
  const [localTitle, setLocalTitle] = useState(title);

  const handleTitleChange = (newTitle: string) => {
    setLocalTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  // Get the appropriate details component for this link type
  const DetailsComponent = getDetailsComponent(linkType);

  // Build props for the details component
  const detailsProps = {
    title: localTitle,
    url,
    faviconUrl,
    onTitleChange: handleTitleChange,
    // Instagram-specific props (ignored by ClassicLinkDetails)
    instagramUsername,
    isConnected,
    interactionType: initialInteractionType,
    onInteractionTypeChange,
    // Thumbnail props
    thumbnailUrl,
    thumbnailType,
    onThumbnailChange,
    layout,
    onLayoutChange,
    // Suggested titles
    suggestedTitles,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Bar */}
      <EditorHeader linkType={linkType} onBack={onBack} closeMode={closeMode} />

      {/* Content wrapper */}
      <div className="flex flex-1 min-h-0">
        {/* Left Navigation */}
        <EditorSideNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Panel Content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          {activeTab === 'details' && <DetailsComponent {...detailsProps} />}
          {activeTab === 'prioritize' && <PrioritizePanel />}
          {activeTab === 'rules' && <RulesPanel />}
          {activeTab === 'insights' && <InsightsPanel />}
        </main>
      </div>
    </div>
  );
}
