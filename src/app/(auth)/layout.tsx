import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="grid min-h-svh place-content-center">{children}</div>;
}
