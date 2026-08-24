import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 30,
  delay = 0,
  className = '',
  showCursor = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, started]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && index < text.length && (
        <span className="typewriter-cursor" />
      )}
    </span>
  );
};
