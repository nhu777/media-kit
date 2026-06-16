'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import ColorsView from './ColorsView';
import DesignOverview from './DesignOverview';
import NestedViewHeader from './NestedViewHeader';
import ThemesView from './ThemesView';

export type DesignViewType =
  | 'overview'
  | 'background'
  | 'effects'
  | 'buttons'
  | 'fonts'
  | 'colors'
  | 'themes';

export default function DesignView() {
  const [currentView, setCurrentView] = useState<DesignViewType>('overview');

  const handleNavigate = (view: DesignViewType) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('overview');
  };

  const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col h-full">
      <NestedViewHeader title={title} onBack={handleBack} />
      <div className="flex flex-col gap-6 px-12 pb-16 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center h-40 bg-secondary rounded-lg">
          <p className="text-body-sm text-tertiary">Coming soon</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (currentView === 'overview') {
      return <DesignOverview onNavigate={handleNavigate} />;
    }

    if (currentView === 'colors') {
      return <ColorsView onBack={handleBack} />;
    }

    if (currentView === 'themes') {
      return <ThemesView onBack={handleBack} />;
    }

    if (currentView === 'background') {
      return <PlaceholderView title="Background" />;
    }

    if (currentView === 'buttons') {
      return <PlaceholderView title="Buttons" />;
    }

    if (currentView === 'fonts') {
      return <PlaceholderView title="Fonts" />;
    }

    if (currentView === 'effects') {
      return <PlaceholderView title="Effects" />;
    }

    return <DesignOverview onNavigate={handleNavigate} />;
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
