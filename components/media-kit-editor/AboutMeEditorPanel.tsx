'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { PencilSimpleIcon, XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import {
  DEFAULT_CREATOR_CATEGORY_IDS,
  getCreatorCategoriesFromIds,
} from '@/components/media-kit/creatorCategoriesData';
import { cn } from '@/lib/utils';

import { AddCreatorCategoriesModal } from './AddCreatorCategoriesModal';
import { EditorSectionHeader } from './EditorSectionHeader';
import { EditorSwitch } from './EditorSwitch';

const CATEGORY_CHIP_TRANSITION = {
  duration: 0.24,
  ease: [0.32, 0.72, 0, 1] as const,
};

function SelectedCategoryChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        ...CATEGORY_CHIP_TRANSITION,
        layout: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
      }}
      className="inline-flex h-8 items-center gap-2 rounded-full bg-inverse px-3 text-body-sm-emph text-on-inverse-primary motion-reduce:transition-none"
    >
      {label}
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className="flex shrink-0 items-center justify-center"
      >
        <XIcon size={16} weight="regular" />
      </button>
    </motion.span>
  );
}

function FormLabel({
  label,
  hint,
  className,
}: {
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn('w-[176px] shrink-0', className)}>
      <p className="text-body-sm-emph text-primary">{label}</p>
      {hint ? <p className="text-body-xs text-secondary">{hint}</p> : null}
    </div>
  );
}

function TextField({
  value,
  placeholder,
  onChange,
}: {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={e => onChange?.(e.target.value)}
      className="h-11 w-full rounded-[12px] border border-secondary bg-elevated px-3 text-body-sm text-primary outline-none placeholder:text-secondary"
    />
  );
}

function MessageToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return <EditorSwitch enabled={enabled} onChange={onChange} />;
}

interface AboutMeEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
  selectedCreatorCategoryIds: string[];
  onCreatorCategoriesChange: (selectedIds: string[]) => void;
}

export function AboutMeEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
  selectedCreatorCategoryIds,
  onCreatorCategoriesChange,
}: AboutMeEditorPanelProps) {
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const [name, setName] = useState('Jean');
  const [bio, setBio] = useState(
    'Small artist sharing my music and interests in fashion! Send me any additional project details through this contact form or my email. Hoping to work with you!'
  );
  const [location, setLocation] = useState('New York, NY');
  const [email, setEmail] = useState('jeanliu@gmail.com');
  const [phone, setPhone] = useState('');
  const [messagesEnabled, setMessagesEnabled] = useState(true);

  const selectedCategories = getCreatorCategoriesFromIds(
    selectedCreatorCategoryIds
  );

  const removeCategory = (categoryId: string) => {
    onCreatorCategoriesChange(
      selectedCreatorCategoryIds.filter(id => id !== categoryId)
    );
  };

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="About me"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <FormLabel label="Profile picture" />
          <div className="flex min-w-0 flex-1 items-center justify-between rounded-[16px] border border-secondary bg-elevated py-3 pl-3 pr-4">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/media-kit/avatar.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <Button variant="secondary" size="sm" shape="capsule">
              Change
            </Button>
          </div>
        </div>

        <div className="flex items-center">
          <FormLabel label="Name" />
          <div className="min-w-0 flex-1">
            <TextField value={name} onChange={setName} />
          </div>
        </div>

        <div className="flex items-start">
          <FormLabel label="Bio" className="pt-2.5" />
          <div className="relative min-w-0 flex-1">
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={4}
              className="min-h-[100px] w-full resize-y rounded-[12px] border border-secondary bg-elevated px-3 py-2.5 text-body-sm text-primary outline-none"
            />
          </div>
        </div>

        <div className="flex items-center">
          <FormLabel label="Location" />
          <div className="min-w-0 flex-1">
            <TextField value={location} onChange={setLocation} />
          </div>
        </div>

        <div className="flex items-start">
          <FormLabel label="Creator categories" hint="Add up to 3" />
          <div className="flex min-w-0 flex-1 flex-wrap gap-2 rounded-[12px] border border-secondary bg-elevated px-3 py-3.5">
            <AnimatePresence initial={false} mode="popLayout">
              {selectedCategories.map(category => (
                <SelectedCategoryChip
                  key={category.id}
                  label={category.label}
                  onRemove={() => removeCategory(category.id)}
                />
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setCategoriesModalOpen(true)}
              className="inline-flex h-8 items-center gap-2 rounded-full bg-secondary px-3 text-body-sm-emph text-primary"
            >
              Edit
              <PencilSimpleIcon size={16} weight="regular" />
            </button>
          </div>
        </div>

        <div className="flex items-start">
          <FormLabel label="Contact" hint="Optional" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <TextField value={email} onChange={setEmail} />
            <TextField
              value={phone}
              placeholder="Phone number"
              onChange={setPhone}
            />
            <div className="rounded-[14px] border border-secondary bg-elevated p-4">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm-emph text-primary">
                    Let visitors message me
                  </p>
                  <p className="text-body-xs text-secondary">
                    Visitors will be able to message you directly from your
                    Linktree.
                  </p>
                </div>
                <MessageToggle
                  enabled={messagesEnabled}
                  onChange={setMessagesEnabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddCreatorCategoriesModal
        open={categoriesModalOpen}
        onOpenChange={setCategoriesModalOpen}
        selectedIds={selectedCreatorCategoryIds}
        onSave={onCreatorCategoriesChange}
      />
    </div>
  );
}
