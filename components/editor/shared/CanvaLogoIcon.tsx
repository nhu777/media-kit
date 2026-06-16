import * as React from 'react';

interface CanvaLogoIconProps {
  className?: string;
  size?: number;
}

export function CanvaLogoIcon({ className, size = 24 }: CanvaLogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_canva)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24Z"
          fill="#7D2AE7"
        />
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24Z"
          fill="url(#paint0_radial_canva)"
        />
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24Z"
          fill="url(#paint1_radial_canva)"
        />
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24Z"
          fill="url(#paint2_radial_canva)"
        />
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24Z"
          fill="url(#paint3_radial_canva)"
        />
        <path
          d="M17.1807 14.4617C17.0816 14.4617 16.9945 14.5453 16.9038 14.7279C15.8797 16.8047 14.1107 18.2741 12.0637 18.2741C9.69681 18.2741 8.23105 16.1375 8.23105 13.1857C8.23105 8.18573 11.0169 5.29481 13.4639 5.29481C14.6073 5.29481 15.3055 6.01339 15.3055 7.15684C15.3055 8.51396 14.5345 9.2325 14.5345 9.71115C14.5345 9.92599 14.6681 10.0561 14.9332 10.0561C15.9979 10.0561 17.2475 8.83268 17.2475 7.10434C17.2475 5.4285 15.7889 4.1967 13.3421 4.1967C9.29815 4.1967 5.70422 7.9458 5.70422 13.1332C5.70422 17.1485 7.99712 19.8019 11.5349 19.8019C15.29 19.8019 17.4613 16.0659 17.4613 14.8532C17.4613 14.5847 17.3239 14.4617 17.1807 14.4617Z"
          fill="white"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_canva"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.63579 21.2716) rotate(-49.4156) scale(18.562)"
        >
          <stop stopColor="#6420FF" />
          <stop offset="1" stopColor="#6420FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_canva"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.3537 2.72842) rotate(54.7035) scale(20.9321)"
        >
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#00C4CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_canva"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.63579 21.2716) rotate(-45.1954) scale(18.3373 8.43356)"
        >
          <stop stopColor="#6420FF" />
          <stop offset="1" stopColor="#6420FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_canva"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(9.81472 3.23369) rotate(66.5198) scale(18.8951 31.6535)"
        >
          <stop stopColor="#00C4CC" stopOpacity="0.725916" />
          <stop offset="0.0001" stopColor="#00C4CC" />
          <stop offset="1" stopColor="#00C4CC" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_canva">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
