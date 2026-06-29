'use client';

import {
  Canvas,
  ControlPanel,
  ControlsWrapper,
  EditorPanelNav,
  HeaderBar,
  PreviewWrapper,
  ProfilePreviewFrame,
} from '@/components/editor/layout';
import { ProfilePreview } from '@/components/editor/profile';
import {
  DndProvider,
  EditorPanelProvider,
  EditorThemeProvider,
  LinksProvider,
  PageProvider,
  ProfileHeaderProvider,
  SelectionProvider,
  useEditorPanel,
  useEditorTheme,
} from '@/components/editor/shared';

interface EditorClientProps {
  pageId: string;
}

function EditorShell() {
  const { activePanel, togglePanel } = useEditorPanel();
  const { getShellBackground } = useEditorTheme();

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: getShellBackground(),
      }}
    >
      <HeaderBar />
      <Canvas>
        <ControlsWrapper>
          <EditorPanelNav
            activePanel={activePanel}
            onPanelSelect={togglePanel}
          />
          <ControlPanel activeTool={activePanel} />
        </ControlsWrapper>
        <PreviewWrapper>
          <ProfilePreviewFrame>
            <ProfilePreview />
          </ProfilePreviewFrame>
        </PreviewWrapper>
      </Canvas>
    </div>
  );
}

export default function EditorClient({ pageId }: EditorClientProps) {
  return (
    <PageProvider initialPageId={pageId}>
      <EditorThemeProvider>
        <LinksProvider>
          <DndProvider>
            <SelectionProvider>
              <EditorPanelProvider>
                <ProfileHeaderProvider>
                  <EditorShell />
                </ProfileHeaderProvider>
              </EditorPanelProvider>
            </SelectionProvider>
          </DndProvider>
        </LinksProvider>
      </EditorThemeProvider>
    </PageProvider>
  );
}
