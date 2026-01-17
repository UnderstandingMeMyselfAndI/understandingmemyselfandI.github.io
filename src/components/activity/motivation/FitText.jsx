import { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const FitText = ({ text, containerRef }) => {
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(100);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (textRef.current && containerRef.current) {
        console.log('container width', containerRef.current.offsetWidth);
        const containerWidth = containerRef.current.offsetWidth;
        let newFontSize = 100;
        textRef.current.style.fontSize = `${newFontSize}px`;

        while (
          textRef.current.scrollWidth > containerWidth &&
          newFontSize > 10
        ) {
          newFontSize--;
          textRef.current.style.fontSize = `${newFontSize}px`;
        }
        setFontSize(newFontSize);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, text]);

  return (
    <span
      ref={textRef}
      style={{ fontSize: `${fontSize}px`, whiteSpace: 'nowrap' }}
    >
      {text}
    </span>
  );
};

FitText.propTypes = {
  text: PropTypes.string.isRequired,
  containerRef: PropTypes.object.isRequired,
};

export default FitText;
