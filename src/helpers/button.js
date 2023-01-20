import React from "react";

const button = (text, click) => {
  return (
    <svg className="control-button reset-array" onClick={() => click}>
      <g stroke="none" strokeWidth="1">
        <text
          fontFamily="BrandonText-BoldItalic, Brandon Text"
          fontSize="14"
          fontWeight="bold"
          letterSpacing="0.7"
          fill="#F0F1F2"
        >
          <tspan x="6.843" y="21">
            {text}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default button;
