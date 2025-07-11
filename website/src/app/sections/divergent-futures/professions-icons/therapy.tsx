import React from 'react';

export const TherapyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 21a9 9 0 00-9-9 9 9 0 00-1.5 5.5" />
    <path d="M21 12a9 9 0 00-9-9 9 9 0 00-5.5 1.5" />
    <path d="M16.5 16.5a9 9 0 00-9-9" />
    <path d="M7.5 7.5a9 9 0 009 9" />
  </svg>
);
