import React, { ReactElement } from "react";

interface AppProperties {
  type: "valid" | "danger";
}

export default function ValidIcon({ type }: AppProperties): ReactElement {
  const color = type === "valid" ? "#84CC16" : "#DC2626";
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.125 3.75L10.625 1.25M13.125 3.75H1.875H13.125ZM13.125 3.75L10.625 6.25L13.125 3.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 11.25L4.375 8.75M1.875 11.25H13.125H1.875ZM1.875 11.25L4.375 13.75L1.875 11.25Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
