'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import ProfileHeaderOverview from './ProfileHeaderOverview';

export type ProfileHeaderViewType = 'overview' | 'settings';

export default function ProfileHeaderView() {
  const [currentView, setCurrentView] =
    useState<ProfileHeaderViewType>('overview');

  const handleNavigate = (view: ProfileHeaderViewType) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    if (currentView === 'overview') {
      return <ProfileHeaderOverview onNavigate={handleNavigate} />;
    }

    return <ProfileHeaderOverview onNavigate={handleNavigate} />;
  };

  return (
    <motion.div
      className="flex flex-col h-full w-[35rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
      exit={{
        opacity: 0,
        position: 'absolute',
        transition: { duration: 0.15 },
      }}
    >
      {renderContent()}
    </motion.div>
  );
}
