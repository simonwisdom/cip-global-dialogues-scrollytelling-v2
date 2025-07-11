import React from 'react';

export const HealthcareIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M12 2L4 8v12h16V8L12 2z" />
    <path d="M12 22V12" />
    <path d="M20 12h-8" />
    <path d="M12 12H4" />
    <path d="M10 12h4v10h-4z" />
  </svg>
);
