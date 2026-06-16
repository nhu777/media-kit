'use client';

interface ControlsWrapperProps {
  children: React.ReactNode;
}

export default function ControlsWrapper({ children }: ControlsWrapperProps) {
  return <div className="shrink-0 flex items-center h-full">{children}</div>;
}
