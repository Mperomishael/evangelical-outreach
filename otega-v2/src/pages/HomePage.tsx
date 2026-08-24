import React from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { Typewriter } from '../components/Typewriter';

// Quote icon (SVG)
const QuoteIcon = () => (
  <svg viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-6">
    <path d="M10 0H0V10H10V0ZM10 14H0V24H10V14ZM28 0H18V10H28V0ZM28 14H18V24H28V14Z" fill="#F1E5C6" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-row flex-nowrap gap-12 px-10 overflow-x-auto justify-center items-start
                    max-[899px]:flex-col max-[899px]:items-center max-[899px]:gap-8 max-[899px]:px-5">
      
      {/* ===== SCREEN 1 – Testimonial ===== */}
      <PhoneFrame delay={0.05}>
        <div className="h-full flex flex-col px-[19px] bg-[#1d191a] relative">
          {/* Header */}
          <div className="flex justify-between items-center pt-12 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-[46px] h-[46px] bg-[#F1E5C6] rounded-full flex items-center justify-center font-medium text-sm text-[#1d191a]">✝</div>
              <span className="text-[17px] font-normal text-white leading-5">Christ Family Church</span>
            </div>
            <div className="w-7 h-6 flex flex-col justify-between cursor-pointer">
              <span className="block h-[2px] bg-white rounded w-full" />
              <span className="block h-[2px] bg-white rounded w-[70%]" />
              <span className="block h-[2px] bg-white rounded w-full" />
            </div>
          </div>

          {/* Rotated sidebar */}
          <div className="absolute left-[-44px] top-[115px] -rotate-90 translate-x-[-60px] origin-top-left whitespace-nowrap pointer-events-none">
            <div className="text-sm font-medium text-white/50 tracking-[1.2px]">Anna Miller</div>
            <div className="text-sm font-normal text-white/30 tracking-[1.2px]">Community Member</div>
          </div>

          {/* Portrait */}
          <div className="absolute top-[120px] left-[125px] w-[240px] h-[300px] rounded-2xl overflow-hidden z-[2]">
            <img src="https://framerusercontent.com/images/7nIpqB1Y0QYgLe70j5NmdtK5Rk.png" alt="Anna Miller" className="w-full h-full object-cover" />
          </div>

          {/* Quote icon */}
          <div className="absolute left-[19px] top-[395px] z-[3] opacity-60">
            <QuoteIcon />
          </div>

          {/* Quote text with typewriter */}
          <div className="absolute left-[19px] top-[440px] w-[336px] text-[20px] font-normal leading-[27px] text-white/77 z-[3]">
            <Typewriter text="We want to be a family where people can connect and benefit from friendships in Christ." speed={32} delay={300} />
          </div>

          {/* Bottom white card */}
          <div className="absolute bottom-0 left-0 right-0 h-[245px] bg-white rounded-t-[30px] p-6 pb-5 flex flex-col justify-between z-[5]">
            <div>
              <div className="text-[36px] font-medium text-[#1a1a1a] tracking-[-0.5px] leading-[1.1]">Sunday Worship Service</div>
              <div className="text-[17px] font-normal text-[#888] mt-1">Dec 7th, 10–11:30am</div>
              <div className="flex items-center gap-2 text-[17px] font-medium text-[#1a1a1a] mt-1.5">
                Learn more <span className="text-xl transition-transform">→</span>
              </div>
            </div>
            <div className="absolute bottom-5 right-6 w-12 h-12 opacity-15 text-4xl text-center text-[#1a1a1a]">✦</div>
          </div>
        </div>
      </PhoneFrame>

      {/* ===== SCREEN 2 – Hero/Landing ===== */}
      <PhoneFrame delay={0.25}>
        <div className="h-full bg-[#1d191a] relative overflow-hidden">
          {/* Hero image with overlay */}
          <div className="absolute top-0 left-0 right-0 h-[472px] overflow-hidden">
            <img src="https://framerusercontent.com/images/G9ZdWZubRnpc37d5d7uUzqaBqiw.png" alt="Worship" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex justify-between items-center pt-12 px-[19px] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-[46px] h-[46px] bg-[#F1E5C6] rounded-full flex items-center justify-center font-medium text-sm text-[#1d191a]">✝</div>
              <span className="text-[17px] font-normal text-white leading-5">Christ Family Church</span>
            </div>
            <div className="w-7 h-6 flex flex-col justify-between cursor-pointer">
              <span className="block h-[2px] bg-white rounded w-full" />
              <span className="block h-[2px] bg-white rounded w-[70%]" />
              <span className="block h-[2px] bg-white rounded w-full" />
            </div>
          </div>

          {/* Avatars row */}
          <div className="absolute left-[19px] top-[442px] z-10 w-[149px] h-[53px] rounded-[30px] overflow-hidden bg-black/30 backdrop-blur flex items-center justify-center gap-1 text-xs text-white/70">
            <span>✦</span>
            <span className="flex gap-0.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="block w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="block w-1.5 h-1.5 rounded-full bg-white/40" />
            </span>
            <span className="font-light text-[11px] opacity-60">+12</span>
          </div>

          {/* Headline with typewriter */}
          <div className="absolute top-[520px] left-[19px] right-[19px] z-10 text-[52px] font-light leading-[52px] tracking-[-2.5px] text-[#F1E5C6]">
            <Typewriter text="Take a step toward the light" speed={38} delay={200} />
          </div>

          {/* Subtext with typewriter */}
          <div className="absolute top-[620px] left-[19px] right-[19px] z-10 text-[21px] font-normal leading-[27px] text-white/60">
            <Typewriter text="Discover faith, hope, and a home for your soul" speed={32} delay={800} />
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-8 left-[19px] right-[19px] h-[52px] bg-[#F1E5C6] rounded-[30px] flex items-center justify-center gap-3 text-[21px] font-medium text-[#1d191a] z-10">
            Join us <span className="text-2xl">→</span>
          </div>
        </div>
      </PhoneFrame>

      {/* ===== SCREEN 3 – Sermons/Events ===== */}
      <PhoneFrame delay={0.45}>
        <div className="h-full bg-white relative overflow-hidden">
          {/* Hero top */}
          <div className="absolute top-0 left-[-20px] w-[415px] h-[345px] overflow-hidden">
            <img src="https://framerusercontent.com/images/Q7jLZsObox26xQCiWPAVYWzTsYs.png" alt="Preacher" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Play button */}
          <div className="absolute top-[175px] left-1/2 -translate-x-1/2 w-[65px] h-[65px] bg-[#F1E5C6] rounded-full z-10 flex items-center justify-center text-3xl text-[#1d191a] shadow-lg">
            ▶
          </div>

          {/* Header */}
          <div className="relative z-10 flex justify-between items-center pt-5 px-[19px] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#F1E5C6] rounded-full flex items-center justify-center font-medium text-xs text-[#1d191a]">✝</div>
              <span className="text-[15px] font-normal text-white leading-[18px]">Christ Family Church</span>
            </div>
            <div className="w-[26px] h-5 flex flex-col justify-between cursor-pointer">
              <span className="block h-[2px] bg-white rounded w-full" />
              <span className="block h-[2px] bg-white rounded w-[70%]" />
              <span className="block h-[2px] bg-white rounded w-full" />
            </div>
          </div>

          {/* Dark band */}
          <div className="absolute top-[343px] left-0 right-0 h-[220px] bg-[#1d191a] z-[4] rounded-t-[30px]" />

          {/* Body section */}
          <div className="absolute top-[343px] left-0 right-0 bottom-0 bg-white rounded-t-[30px] z-[5] px-[19px] pt-5 pb-3 overflow-y-auto">
            <div className="text-[38px] font-normal tracking-[-0.8px] text-white relative z-[6] pt-2 mb-4">
              Upcoming
            </div>

            <div className="relative z-[6] flex flex-col gap-[22px] pb-5">
              {/* Event 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-[68px] h-[90px] rounded-[18px] bg-white flex flex-col items-center justify-center py-2 flex-shrink-0">
                  <span className="text-[34px] font-medium text-[#1a1a1a] leading-none">14</span>
                  <span className="text-[18px] font-normal text-[#1a1a1a] leading-[1.2]">Dec</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[21px] font-normal leading-[26px] text-[#1a1a1a]">Luke 1 | A Story From Zechariah</div>
                  <div className="text-[17px] font-normal text-[#999] mt-0.5">6:30 – 8:00 pm</div>
                </div>
              </div>
              {/* Event 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-[68px] h-[90px] rounded-[18px] bg-[#F1E5C6] flex flex-col items-center justify-center py-2 flex-shrink-0">
                  <span className="text-[34px] font-medium text-[#1a1a1a] leading-none">21</span>
                  <span className="text-[18px] font-normal text-[#1a1a1a] leading-[1.2]">Dec</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[21px] font-normal leading-[26px] text-[#1a1a1a]">Romans 15 | Living For Christ Alone</div>
                  <div className="text-[17px] font-normal text-[#999] mt-0.5">8:30 – 10:00 am</div>
                </div>
              </div>
              {/* Event 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-[68px] h-[90px] rounded-[18px] bg-[#F1E5C6] flex flex-col items-center justify-center py-2 flex-shrink-0">
                  <span className="text-[34px] font-medium text-[#1a1a1a] leading-none">28</span>
                  <span className="text-[18px] font-normal text-[#1a1a1a] leading-[1.2]">Dec</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[21px] font-normal leading-[26px] text-[#1a1a1a]">Romans 9 | The Sovereignty Of God</div>
                  <div className="text-[17px] font-normal text-[#999] mt-0.5">5:30 – 7:00 pm</div>
                </div>
              </div>
              {/* Event 4 (faded) */}
              <div className="flex gap-4 items-start opacity-50">
                <div className="w-[68px] h-[90px] rounded-[18px] bg-[#F1E5C6] flex flex-col items-center justify-center py-2 flex-shrink-0">
                  <span className="text-[34px] font-medium text-[#1a1a1a] leading-none">4</span>
                  <span className="text-[18px] font-normal text-[#1a1a1a] leading-[1.2]">Jan</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[21px] font-normal leading-[26px] text-[#1a1a1a]">John 3 | Born Again</div>
                  <div className="text-[17px] font-normal text-[#999] mt-0.5">—</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>

    </div>
  );
}
