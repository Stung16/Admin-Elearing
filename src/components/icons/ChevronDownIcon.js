import React from "react";
export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
      initial={{
        transform: "translate3d(0px,0,0) rotatez(0deg)"
      }}
      animate={{
        transform: [
          "translate3d(0px,0,0) rotatez(0deg)",
          "translate3d(0px,0,0) rotatez(0deg)",
          "translate3d(25px,0,0) rotatez(-60deg)"
        ]
      }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 100
      }}
    />
  </svg>
);