import React, { useEffect, useState } from 'react';
import { Button, useTheme } from '@chakra-ui/react';

export const MatrixText = ({ children }) => {
  const [displayText, setDisplayText] = useState('');
  const theme = useTheme();
  const originalText = children;

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const newText = originalText
        .split('')
        .map((char, idx) => (idx < index ? char : randomChars[Math.floor(Math.random() * randomChars.length)]))
        .join('');

      setDisplayText(newText);

      if (index < originalText.length) {
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Change every 100 milliseconds

    return () => clearInterval(interval);
  }, [originalText]);

  return (
    <span>
      {displayText}
    </span>
  );
};
