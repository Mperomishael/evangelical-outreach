import type { ReactNode, CSSProperties } from 'react';
import { useInView } from '../hooks/useInView';

type Variant = 'up' | 'fade' | 'left' | 'right' | 'scale';

interface Props {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
}

const variants: Record<Variant, string> = {
  up: 'reveal-up',
  fade: 'reveal-fade',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`${variants[variant]} ${inView ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
