'use client';

import { IconButton } from '@linktr.ee/arbor/IconButton';
import {
  ArrowCounterClockwiseIcon,
  EyeSlashIcon,
  ImageSquareIcon,
  MagicWandIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { createPortal } from 'react-dom';
import useMeasure from 'react-use-measure';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { CanvaLogoIcon } from './CanvaLogoIcon';
import { useOverlayContainer } from './OverlayContext';

export type ProfileImageType = 'empty' | 'image' | 'icon' | 'none';

export interface PopoverProfileImageProps {
  children: React.ReactNode;
  initialType?: ProfileImageType;
  imageUrl?: string;
  onSave?: (type: ProfileImageType, imageUrl?: string) => void;
  onOpenChange?: (open: boolean) => void;
  /** Side of the trigger where the popover will appear. Defaults to 'right'. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment of the popover relative to the trigger. Defaults to 'start'. */
  align?: 'start' | 'center' | 'end';
}

type TabType = 'image' | 'icon' | 'none';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[64px] flex-1 flex-col items-center justify-center gap-1 rounded-[16px] bg-elevated shadow-elevation-100 transition-all border border-transparent hover:border-inverse"
    >
      <div className="flex size-6 items-center justify-center">{icon}</div>
      <span className="text-body-xs text-primary">{label}</span>
    </button>
  );
}

export default function PopoverProfileImage({
  children,
  initialType = 'empty',
  imageUrl: thumbnailUrl,
  onSave,
  onOpenChange,
  side = 'right',
  align = 'start',
}: PopoverProfileImageProps) {
  const [open, setOpen] = React.useState(false);
  const [showEditOptions, setShowEditOptions] = React.useState(false);
  const overlayContainerRef = useOverlayContainer();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [measureRef, bounds] = useMeasure();

  const getTabFromType = (type: ProfileImageType): TabType => {
    if (type === 'empty') return 'image';
    return type;
  };

  const [selectedTab, setSelectedTab] = React.useState<TabType>(
    getTabFromType(initialType)
  );
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(
    thumbnailUrl
  );
  const cachedImageRef = React.useRef<string | undefined>(thumbnailUrl);
  const hasContent = !!imageUrl;

  React.useEffect(() => {
    if (!open) {
      setShowEditOptions(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      setSelectedTab(getTabFromType(initialType));
      // Restore image preference: use incoming thumbnail, otherwise keep cached upload
      const nextImage = thumbnailUrl ?? cachedImageRef.current;
      setImageUrl(nextImage);
      if (thumbnailUrl) {
        cachedImageRef.current = thumbnailUrl;
      }
      setShowEditOptions(false);
    }
  }, [open, initialType, thumbnailUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const url = event.target?.result as string;
        setImageUrl(url);
        cachedImageRef.current = url;
        setShowEditOptions(false);
        onSave?.('image', url);
        setOpen(false);
        onOpenChange?.(false);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(undefined);
    cachedImageRef.current = undefined;
    setShowEditOptions(false);
    onSave?.('empty');
  };

  const handleResetImage = () => {
    setImageUrl(undefined);
    cachedImageRef.current = undefined;
    setShowEditOptions(false);
    onSave?.('empty');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditClick = () => {
    setShowEditOptions(prev => !prev);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const overlay = open && (
    <div
      onClick={e => e.stopPropagation()}
      className={cn(
        'inset-0 z-40',
        overlayContainerRef?.current ? 'absolute' : 'fixed'
      )}
    />
  );

  const hasImage = !!imageUrl;

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {overlay && overlayContainerRef?.current
        ? createPortal(overlay, overlayContainerRef.current)
        : overlay}
      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        className={cn(
          'w-[360px] rounded-xl border-0 p-0 shadow-elevation-400',
          '!animate-none data-[state=open]:!animate-none data-[state=closed]:!animate-none'
        )}
        onClick={e => e.stopPropagation()}
        onInteractOutside={() => {
          // Explicitly handle outside interactions to ensure closing even without the overlay
          setOpen(false);
          onOpenChange?.(false);
        }}
      >
        <div className="flex flex-col gap-4 px-5 pb-2 pt-5">
          <h2 className="text-body-base-emph text-center text-primary">
            Profile image
          </h2>
          <Tabs
            value={selectedTab}
            onValueChange={value => {
              const newTab = value as TabType;
              setSelectedTab(newTab);
              if (hasContent) {
                if (newTab === 'none') {
                  // Preserve the uploaded image when hiding the profile image so the user can re-enable it
                  onSave?.('none', imageUrl);
                } else if (newTab === 'icon') {
                  onSave?.('icon');
                } else if (newTab === 'image') {
                  onSave?.('image', imageUrl);
                }
              }
            }}
          >
            <TabsList variant="segmented" className="w-full rounded-full">
              <TabsTrigger
                value="image"
                variant="segmented"
                className="rounded-full"
              >
                Image
              </TabsTrigger>
              <TabsTrigger
                value="icon"
                variant="segmented"
                className="rounded-full"
              >
                Icon
              </TabsTrigger>
              <TabsTrigger
                value="none"
                variant="segmented"
                className="rounded-full"
              >
                None
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          animate={{ height: bounds.height || 'auto' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div ref={measureRef} className="px-5 pb-5 pt-4">
            {selectedTab === 'image' && (
              <>
                {!hasImage ? (
                  <div className="flex gap-3">
                    <ActionButton
                      icon={
                        <ImageSquareIcon
                          size={24}
                          weight="regular"
                          className="text-primary"
                        />
                      }
                      label="Upload"
                      onClick={handleUploadClick}
                    />
                    <ActionButton
                      icon={<CanvaLogoIcon size={24} />}
                      label="Canva"
                      onClick={() => {}}
                    />
                    <ActionButton
                      icon={
                        <MagicWandIcon
                          size={24}
                          weight="regular"
                          className="text-primary"
                        />
                      }
                      label="AI"
                      onClick={() => {}}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="size-16 flex-shrink-0 overflow-hidden rounded-full">
                        <img
                          src={imageUrl}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Pencil toggle button */}
                        <button
                          type="button"
                          onClick={handleEditClick}
                          aria-label="Edit profile image"
                          aria-pressed={showEditOptions}
                          className={cn(
                            'flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors',
                            showEditOptions ? 'bg-inverse' : 'bg-tertiary'
                          )}
                        >
                          <PencilSimpleIcon
                            size={20}
                            weight="regular"
                            className={
                              showEditOptions
                                ? 'text-on-inverse-primary'
                                : 'text-primary'
                            }
                          />
                        </button>
                        <IconButton
                          variant="secondary"
                          size="sm"
                          icon={TrashSimpleIcon as any}
                          aria-label="Remove image"
                          onClick={handleRemoveImage}
                          className="!size-8 bg-tertiary"
                        />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {showEditOptions && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            duration: 0.2,
                            bounce: 0,
                          }}
                          style={{ overflow: 'hidden' }}
                          className="-mx-2 px-2"
                        >
                          <div className="flex flex-col gap-4 pb-2">
                            <div className="border-t border-tertiary" />

                            <div className="flex gap-3">
                              <ActionButton
                                icon={
                                  <ImageSquareIcon
                                    size={24}
                                    weight="regular"
                                    className="text-primary"
                                  />
                                }
                                label="Upload"
                                onClick={handleUploadClick}
                              />
                              <ActionButton
                                icon={<CanvaLogoIcon size={24} />}
                                label="Canva"
                                onClick={() => {}}
                              />
                              <ActionButton
                                icon={
                                  <MagicWandIcon
                                    size={24}
                                    weight="regular"
                                    className="text-primary"
                                  />
                                }
                                label="AI"
                                onClick={() => {}}
                              />
                              <ActionButton
                                icon={
                                  <ArrowCounterClockwiseIcon
                                    size={24}
                                    weight="regular"
                                    className="text-primary"
                                  />
                                }
                                label="Reset"
                                onClick={handleResetImage}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}

            {selectedTab === 'icon' && (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex size-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary"
                  aria-label="Select an icon"
                >
                  <ImageSquareIcon
                    size={24}
                    weight="regular"
                    className="text-primary"
                  />
                </button>
                <p className="text-body-sm text-primary">Select an icon</p>
              </div>
            )}

            {selectedTab === 'none' && (
              <div className="flex items-center gap-4">
                <div className="flex size-16 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <EyeSlashIcon
                    size={24}
                    weight="regular"
                    className="text-primary"
                  />
                </div>
                <p className="text-body-sm text-secondary">
                  No profile image will be displayed.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </PopoverContent>
    </Popover>
  );
}
