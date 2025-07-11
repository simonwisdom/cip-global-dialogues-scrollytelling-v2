import { useRef, useEffect } from 'react';

export const useMousePosition = (ref: React.RefObject<Element>) => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mousePos.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove as EventListener);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove as EventListener);
      }
    };
  }, [ref]);

  return mousePos;
}; 