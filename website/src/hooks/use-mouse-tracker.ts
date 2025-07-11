
import { useState, useEffect } from 'react';

export const useMouseTracker = (ref: React.RefObject<Element>) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      if (!ref.current) return;
      const element = ref.current;
      const rect = element.getBoundingClientRect();

      setPoint({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    };

    const currentRef = ref.current;
    currentRef.addEventListener("mousemove", handlePointerMove as EventListener);

    return () => currentRef.removeEventListener("mousemove", handlePointerMove as EventListener);
  }, [ref]);

  return point;
}; 