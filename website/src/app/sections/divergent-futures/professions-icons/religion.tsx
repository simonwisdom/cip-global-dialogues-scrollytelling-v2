import React from 'react';

export const ReligionIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M12 2l4 4-4 4-4-4 4-4z" />
    <path d="M12 10l4 4-4 4-4-4 4-4z" />
    <path d="M2 12l4-4 4 4-4 4-4-4z" />
    <path d="M22 12l-4 4-4-4 4-4 4 4z" />
  </svg>
);
