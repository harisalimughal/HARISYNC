import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

const MARKERS = [
  { id: 'pakistan', name: 'Pakistan', location: [30.3753, 69.3451] as [number, number], size: 0.08 },
  { id: 'usa', name: 'United States', location: [37.0902, -95.7129] as [number, number], size: 0.08 },
  { id: 'uk', name: 'United Kingdom', location: [55.3781, -3.436] as [number, number], size: 0.08 },
  { id: 'morocco', name: 'Morocco', location: [31.7917, -7.0926] as [number, number], size: 0.08 },
  { id: 'australia', name: 'Australia', location: [-25.2744, 133.7751] as [number, number], size: 0.08 },
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({ visible: false, label: '', x: 0, y: 0 });
  const phiRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;
    let width = canvasRef.current.offsetWidth;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.05, 0.05, 0.1],
      markers: MARKERS,
    });

    let raf: number;
    const animate = () => {
      if (!pointerInteracting.current) phiRef.current += 0.003;
      globe.update({ phi: phiRef.current + pointerMovement.current, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);

    const attachHover = () => {
      const wrapper = wrapperRef.current!;
      const listeners: Array<() => void> = [];

      const processAnchors = () => {
        const anchors = Array.from(wrapper.querySelectorAll<HTMLDivElement>('div'));
        anchors.forEach((el) => {
          const styleText = (el.getAttribute('style') || el.style.cssText || '');
          const match = styleText.match(/anchor-name:\s*--cobe-([\w-]+)/);
          if (!match) return;
          const id = match[1];
          const marker = MARKERS.find((item) => item.id === id);
          if (!marker) return;

          if (el.getAttribute('data-tooltip-bound')) return;
          el.setAttribute('data-tooltip-bound', 'true');
          el.style.pointerEvents = 'auto';
          el.style.width = '18px';
          el.style.height = '18px';
          el.style.margin = '-9px 0 0 -9px';
          el.style.background = 'transparent';
          el.style.cursor = 'pointer';

          const onMouseEnter = (event: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            setTooltip({ visible: true, label: marker.name, x: event.clientX - rect.left, y: event.clientY - rect.top });
          };

          const onMouseMove = (event: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            setTooltip((current) => ({ ...current, x: event.clientX - rect.left, y: event.clientY - rect.top }));
          };

          const onMouseLeave = () => setTooltip((current) => ({ ...current, visible: false }));

          el.addEventListener('mouseenter', onMouseEnter);
          el.addEventListener('mousemove', onMouseMove);
          el.addEventListener('mouseleave', onMouseLeave);

          listeners.push(() => {
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
          });
        });
      };

      // Observe DOM changes and process anchors immediately
      const observer = new MutationObserver(processAnchors);
      observer.observe(wrapper, { childList: true, subtree: true });
      processAnchors();

      return () => {
        listeners.forEach((remove) => remove());
        observer.disconnect();
      };
    };

    const cleanupHover = attachHover();

    const canvas = canvasRef.current;
    const onDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerMovement.current * 200;
      canvas.style.cursor = 'grabbing';
    };
    const onUp = () => {
      pointerInteracting.current = null;
      canvas.style.cursor = 'grab';
    };
    const onMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) pointerMovement.current = (e.clientX - pointerInteracting.current) / 200;
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerout', onUp);
    canvas.addEventListener('pointermove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerout', onUp);
      canvas.removeEventListener('pointermove', onMove);
      cleanupHover();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto" ref={wrapperRef}>
      <canvas ref={canvasRef} className="w-full h-full cursor-grab" style={{ contain: 'layout paint size' }} />
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-10 rounded-full bg-black/90 px-3 py-1.5 text-xs text-white shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y + 12, transform: 'translate(-50%, -100%)' }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  );
}
