import React from "react";

export const Monogram = ({ size = 56, className = "" }) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      data-testid="brand-monogram"
      style={{ width: size * 1.6, color: "#1A1A1A" }}
    >
      <div
        className="font-serif-display flex items-baseline"
        style={{ fontSize: size, lineHeight: 1, letterSpacing: "0.02em", fontWeight: 500 }}
      >
        <span>M</span>
        <span style={{ marginLeft: -size * 0.18 }}>H</span>
      </div>
      <div
        className="font-sans-body mt-2"
        style={{
          fontSize: size * 0.18,
          letterSpacing: "0.42em",
          color: "#1A1A1A",
          fontWeight: 500,
        }}
      >
        MAISON HUE
      </div>
    </div>
  );
};

export default Monogram;
