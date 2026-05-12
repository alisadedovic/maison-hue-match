import React from "react";

export const FeatureIcon = ({ name, className = "" }) => {
  const stroke = "#A88859";
  const sw = 1.4;
  const common = {
    width: 44,
    height: 44,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const Circle = () => (
    <circle cx="24" cy="24" r="22" stroke={stroke} strokeWidth={sw} fill="none" />
  );

  if (name === "leaf") {
    return (
      <svg {...common} className={className} data-testid="icon-leaf">
        <Circle />
        <path d="M16 31 C 16 22, 22 16, 32 16 C 32 26, 26 32, 16 31 Z" />
        <path d="M16 31 L 28 19" />
      </svg>
    );
  }
  if (name === "wave") {
    return (
      <svg {...common} className={className} data-testid="icon-wave">
        <Circle />
        <path d="M14 21 C 17 17, 20 25, 24 21 S 30 17, 34 21" />
        <path d="M14 28 C 17 24, 20 32, 24 28 S 30 24, 34 28" />
      </svg>
    );
  }
  if (name === "sparkle") {
    return (
      <svg {...common} className={className} data-testid="icon-sparkle">
        <Circle />
        <path d="M24 14 L25.2 21 L31 22.5 L25.2 24 L24 31 L22.8 24 L17 22.5 L22.8 21 Z" />
        <path d="M32 30 L32.6 32.2 L34.6 32.8 L32.6 33.4 L32 35.6 L31.4 33.4 L29.4 32.8 L31.4 32.2 Z" />
      </svg>
    );
  }
  return null;
};

export default FeatureIcon;
