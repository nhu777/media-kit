// Re-export shared components for backward compatibility
export {
  EditorComposeBar,
  LinkBlock,
  LinkBlockMenuPopover,
  LinkEditor,
  MenuItem,
  PreviewFrame,
  PreviewMenuButton,
  PreviewPanel,
  ToolbarRail,
  useClickOutside,
} from './shared';

// Re-export from blocks
export { InsertLink } from './blocks';

// Re-export from layout
export { HeaderBar } from './layout';

// Types
export type { LinkEditorProps } from './edit-block';
export type { LinkBlockProps } from './link-block';
export type { Tool } from './shared';
export type { Link } from '@/lib/editorData';
