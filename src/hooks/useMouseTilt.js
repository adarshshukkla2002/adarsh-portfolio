import { useCallback, useRef, useState } from "react";

/**
 * Track the pointer across an element and return rotation values
 * for a 3D tilt, plus the pointer position for a follow-glow.
 */
export function useMouseTilt({ max = 12 } = {}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const onMouseMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      setTilt({ x: (0.5 - py) * max * 2, y: (px - 0.5) * max * 2 });
      setGlow({ x: px * 100, y: py * 100 });
    },
    [max]
  );

  const onMouseEnter = useCallback(() => setActive(true), []);
  const onMouseLeave = useCallback(() => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return { ref, tilt, glow, active, handlers: { onMouseMove, onMouseEnter, onMouseLeave } };
}
