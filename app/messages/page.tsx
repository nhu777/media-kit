'use client';

import { AppSidebar } from '@/components/AppSidebar';
import { SideNavColumn } from '@/components/home';

export default function MessagesPage() {
  return (
    <div className="h-screen flex bg-secondary overflow-hidden">
      <SideNavColumn />
      <main className="flex-1 flex gap-3 py-2 pr-2 min-h-0 overflow-hidden">
        <AppSidebar activePage="messages" />
        <div className="flex-1 h-full overflow-auto bg-primary rounded-[24px] shadow-elevation-100 p-10">
          <div className="flex flex-col gap-12 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2">
              <h1 className="flex-1 text-title-md text-primary">Messages</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
