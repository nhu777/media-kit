import { redirect } from 'next/navigation';

import { DEFAULT_PAGE_ID } from '@/lib/editorData';

export default function EditorIndexPage() {
  redirect(`/editor/${DEFAULT_PAGE_ID}`);
}
