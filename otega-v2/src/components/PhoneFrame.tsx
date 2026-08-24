import React, { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  delay?: number;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="flex-shrink-0 w-[375px] h-[812px] iphone-shadow rounded-iphone border-2 border-[#2a2a2a] overflow-hidden relative bg-[#1d191a] phone-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-9 bg-black rounded-[18px] z-50" />
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-50" />
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};
