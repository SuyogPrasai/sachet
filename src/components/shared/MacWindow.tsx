// components/common/MacWindow.tsx
import { PropsWithChildren, ReactNode } from "react";

export default function MacWindow({
  filename = "document.dat",
  children,
  extraHeader,
}: PropsWithChildren<{ filename?: string; extraHeader?: ReactNode }>) {
  return (
    <div className="mac-window">
      <div className="mac-window-header">
        <div className="mac-button close" />
        <div className="mac-button minimize" />
        <div className="mac-button maximize" />
        <span className="font-mono text-xs truncate">{filename}</span>
        {extraHeader}
      </div>
      {children}
    </div>
  );
}
