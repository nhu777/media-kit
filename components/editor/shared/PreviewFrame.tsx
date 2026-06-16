'use client';

interface PreviewFrameProps {
  children?: React.ReactNode;
}

export default function PreviewFrame({ children }: PreviewFrameProps) {
  return (
    <div className="h-full aspect-[430/932] bg-elevated rounded-xl shadow-elevation-400 overflow-hidden flex flex-col">
      {children}
    </div>
  );
}
