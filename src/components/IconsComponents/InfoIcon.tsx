import React, { ReactElement } from "react";

export default function InfoIcon(): ReactElement {
  return (
    <svg
      className="inline"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
        stroke="#84CC16"
        strokeWidth="2"
      />
      <path
        d="M8.125 4.75H8.5"
        stroke="#84CC16"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 7.75H8.5V11.5"
        stroke="#84CC16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11.5H10"
        stroke="#84CC16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
