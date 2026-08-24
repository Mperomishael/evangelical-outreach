// Small shared UI atoms used across public pages.
import { Loader2, Inbox } from 'lucide-react';

export function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-24 px-5 sm:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-lime mb-4">
      {children}
    </div>
  );
}

export function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/50 gap-3">
      <Loader2 className="animate-spin" size={28} />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl">
      <Inbox className="text-white/20 mb-4" size={32} />
      <p className="text-white font-medium">{title}</p>
      <p className="text-white/50 text-sm mt-1 max-w-sm">{message}</p>
    </div>
  );
}
