import { notFound } from 'next/navigation';

import { getPageById } from '@/lib/editorData';

import EditorClient from './EditorClient';

interface EditorPageProps {
  params: Promise<{ pageId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { pageId } = await params;

  const page = getPageById(pageId);
  if (!page) {
    notFound();
  }

  return <EditorClient pageId={pageId} />;
}
