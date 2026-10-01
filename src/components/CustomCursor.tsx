import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hoverMedia = window.matchMedia('(hover: hover)');
    if (!hoverMedia.matches) return;

    setEnabled(true);
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      innerX = e.clientX;
      innerY = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.left = `${innerX}px`;
        innerRef.current.style.top = `${innerY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      outerX = lerp(outerX, innerX, 0.12);
      outerY = lerp(outerY, innerY, 0.12);
      if (outerRef.current) {
        outerRef.current.style.left = `${outerX}px`;
        outerRef.current.style.top = `${outerY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'a, button, input, textarea, [role="button"], .project-card, .stat-card, .glass-card, .cursor-pointer, [data-interactive="true"]'
        )
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={outerRef} className={`cursor-outer${hovered ? ' hovered' : ''}`} />
      <div ref={innerRef} className={`cursor-inner${hovered ? ' hovered' : ''}`} />
    </>
  );
}
