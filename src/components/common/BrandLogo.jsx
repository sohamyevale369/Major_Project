import React from 'react';

/**
 * MediSafe AI Vector Emblem Mark
 * Combines:
 * 1. Deep forest green squircle crest
 * 2. Modern rounded medical cross
 * 3. Clinical ECG pulse wave (vitality & real-time monitoring)
 * 4. Glowing AI intelligence node & top sparkle
 */
export function MediSafeLogoMark({ size = 36, className = '' }) {
  const uniqueId = React.useId().replace(/:/g, '');
  const bgId = `msLogoBg-${uniqueId}`;
  const crossId = `msCrossGrad-${uniqueId}`;
  const pulseId = `msPulseGrad-${uniqueId}`;
  const glowId = `msGlow-${uniqueId}`;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id={bgId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E5034" />
            <stop offset="50%" stopColor="#235339" />
            <stop offset="100%" stopColor="#123321" />
          </linearGradient>

          <linearGradient id={crossId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EBF7EF" />
          </linearGradient>

          <linearGradient id={pulseId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="40%" stopColor="#10B981" />
            <stop offset="70%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>

          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Squircle Container */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill={`url(#${bgId})`}
          stroke="#386A4C"
          strokeWidth="1.5"
        />

        {/* Ambient Inner Shield Geometry */}
        <path
          d="M24 7L36 12V22C36 29.5 24 37 24 37C24 37 12 29.5 12 22V12L24 7Z"
          fill="none"
          stroke="#34D399"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.25"
        />

        {/* Medical Cross (Vertical Beam) */}
        <rect
          x="20"
          y="9"
          width="8"
          height="30"
          rx="4"
          fill={`url(#${crossId})`}
        />

        {/* Medical Cross (Horizontal Beam) */}
        <rect
          x="9"
          y="20"
          width="30"
          height="8"
          rx="4"
          fill={`url(#${crossId})`}
        />

        {/* Active Heartbeat ECG Wave */}
        <path
          d="M10 24H17L20.5 16L24.5 32L28 19.5L30.5 24H38"
          stroke={`url(#${pulseId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
        />

        {/* Central Neural Node */}
        <circle cx="24.5" cy="24" r="2.2" fill="#10B981" />
        <circle cx="24.5" cy="24" r="1.1" fill="#FFFFFF" />

        {/* Top-Right AI Intelligence Sparkle */}
        <path
          d="M37.5 5.5L38.6 8.5L41.6 9.6L38.6 10.7L37.5 13.7L36.4 10.7L33.4 9.6L36.4 8.5L37.5 5.5Z"
          fill="#34D399"
        />
      </svg>
    </div>
  );
}

/**
 * Complete MediSafe Brand Logo with Text
 */
export default function BrandLogo({
  size = 38,
  showTagline = true,
  showVersion = true,
  className = '',
  onClick
}) {
  const content = (
    <div className={`flex items-center gap-3 group text-left ${className}`}>
      <MediSafeLogoMark size={size} />

      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-lg sm:text-xl font-black tracking-tight text-[#18231C] group-hover:text-[#235339] transition-colors uppercase">
            MEDISAVE<span className="text-[#235339]">.AI</span>
          </span>
          {showVersion && (
            <span className="text-[10px] px-2 py-0.5 font-mono font-bold tracking-wider uppercase rounded-full bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0]">
              v2.0
            </span>
          )}
        </div>
        {showTagline && (
          <p className="text-[11px] text-[#6A746C] font-medium hidden sm:block">
            Explainable Medicine Safety & Clinical AI
          </p>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="focus:outline-none cursor-pointer"
        aria-label="MediSafe.ai Home"
      >
        {content}
      </button>
    );
  }

  return content;
}
