import React from "react";
export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
      initial={{
        transform: "translate3d(0px,0,0) rotatez(0deg)",
      }}
      animate={{
        transform: [
          "translate3d(0px,0,0) rotatez(0deg)",
          "translate3d(0px,0,0) rotatez(0deg)",
          "translate3d(25px,0,0) rotatez(-60deg)",
        ],
      }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 100,
      }}
    />
  </svg>
);
