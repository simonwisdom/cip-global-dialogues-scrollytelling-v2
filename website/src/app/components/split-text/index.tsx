import React from 'react';

interface SplitTextProps {
  text: string;
}

const SplitText: React.FC<SplitTextProps> = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

export default SplitText; 