import React from 'react';

const TypewriterEffect = ({ words, className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting && currentCharIndex < currentWord.text.length) {
        setCurrentCharIndex(prev => prev + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setCurrentCharIndex(prev => prev - 1);
      } else if (!isDeleting && currentCharIndex === currentWord.text.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex(prev => (prev + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentWordIndex, words]);

  return (
    <div className={className}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`${word.className || ''} ${
            idx === currentWordIndex ? 'inline' : 'hidden'
          }`}
        >
          {word.text.substring(0, currentCharIndex)}
          {idx === currentWordIndex && (
            <span className="animate-pulse text-blue-500">|</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default TypewriterEffect;
