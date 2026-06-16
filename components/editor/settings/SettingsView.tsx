'use client';

import { motion } from 'framer-motion';

export default function SettingsView() {
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
      <div className="h-[72px] flex items-center justify-center px-12 py-4 shrink-0">
        <h2 className="text-body-base-emph text-primary">Settings</h2>
      </div>
      <div className="flex-1 px-12 pb-12">
        <p className="text-body-sm text-tertiary">Settings here</p>
      </div>
    </motion.div>
  );
}
