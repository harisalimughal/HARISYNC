import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 350 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <defs>
          <filter id="shadow3d" x="-20%" y="-20%" width="160%" height="160%">
            {/* Hard extrusion for 3D look */}
            <feOffset dx="1" dy="1" in="SourceAlpha" result="o1" />
            <feOffset dx="2" dy="2" in="SourceAlpha" result="o2" />
            <feOffset dx="3" dy="3" in="SourceAlpha" result="o3" />
            <feOffset dx="4" dy="4" in="SourceAlpha" result="o4" />
            
            <feMerge result="ext">
              <feMergeNode in="o1" />
              <feMergeNode in="o2" />
              <feMergeNode in="o3" />
              <feMergeNode in="o4" />
            </feMerge>

            <feFlood floodColor="#020617" floodOpacity="1" result="color" />
            <feComposite operator="in" in="color" in2="ext" result="extFull" />
            
            <feMerge>
              <feMergeNode in="extFull" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="hariGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          <linearGradient id="syncGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        {/* HARI part */}
        <text
          x="0"
          y="75"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="65"
          fill="url(#hariGradient)"
          letterSpacing="-0.04em"
          filter="url(#shadow3d)"
        >
          HAR
        </text>
        
        {/* The 'I' with Arrow */}
        <g transform="translate(144, 25)" filter="url(#shadow3d)">
          {/* Stem of I */}
          <rect x="0" y="20" width="10" height="30" fill="#FFFFFF" />
          {/* Arrow head */}
          <path d="M 5 0 L 18 16 H -8 L 5 0 Z" fill="#38bdf8" />
          {/* Arrow connecting bit */}
          <rect x="1" y="14" width="8" height="10" fill="#38bdf8" />
        </g>

        {/* SYNC part */}
        <text
          x="168"
          y="75"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="65"
          fill="url(#syncGradient)"
          letterSpacing="-0.04em"
          filter="url(#shadow3d)"
        >
          SYNC
        </text>
      </svg>
    </div>
  );
};
