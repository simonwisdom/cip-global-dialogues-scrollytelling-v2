import React from 'react';

export const TransportationIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v3c0 .6.4 1 1 1h2" />
    <path d="M19 17H5v-5a7 7 0 0114 0v5z" />
    <path d="M12 17H5" />
    <path d="M12 12v-2" />
  </svg>
);
