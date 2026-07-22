import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine mouse pointer
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text') || '';
        setHoverText(text);
      } else if (target.closest('button, a, input, select, [role="button"]')) {
        setIsHovered(true);
        setHoverText('');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - (isHovered ? 24 : 6),
        y: position.y - (isHovered ? 24 : 6),
        width: isHovered ? 48 : 12,
        height: isHovered ? 48 : 12,
        scale: isHovered ? 1.2 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 28,
        mass: 0.1,
      }}
    >
      <div
        className={`w-full h-full rounded-full bg-coffee-caramel flex items-center justify-center transition-opacity duration-200 ${
          isHovered ? 'bg-opacity-80 shadow-lg' : 'bg-opacity-100'
        }`}
      >
        {hoverText && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-coffee-espresso whitespace-nowrap px-1">
            {hoverText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
