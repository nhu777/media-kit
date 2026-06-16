'use client';

interface CanvasProps {
  children: React.ReactNode;
}

export default function Canvas({ children }: CanvasProps) {
  return (
    <main className="flex-1 flex gap-2 min-h-0 min-w-0 overflow-visible">
      {children}
    </main>
  );
}
