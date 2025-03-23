import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay: number;
  
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState<string>(""); 
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => (prevText || "") + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      <p dangerouslySetInnerHTML={{ __html: currentText || "" }}></p>
    </span>
  );
};

export default Typewriter;
