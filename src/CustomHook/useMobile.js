import { useState, useEffect } from "react";

/**
 * useMobile - simple hook to detect viewport considered "mobile"
 *
 * @param {Object} options
 * @param {number} options.breakpoint - max width (px) to consider mobile. Default 768.
 * @returns {boolean} isMobile
 *
 * Usage:
 * const isMobile = useMobile(); // true if viewport width <= 768px
 * const isPhone = useMobile({ breakpoint: 480 });
 */
export default function useMobile({ breakpoint = 768 } = {}) {
  // SSR-safe initial value: assume false on server, then correct on mount
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prefer matchMedia when available
    const mq = window.matchMedia ? window.matchMedia(`(max-width: ${breakpoint}px)`) : null;

    const check = () => {
      if (mq) {
        setIsMobile(mq.matches);
      } else {
        setIsMobile(window.innerWidth <= breakpoint);
      }
    };

    // Listener for matchMedia
    if (mq && mq.addEventListener) {
      mq.addEventListener("change", check);
    } else if (mq && mq.addListener) {
      // older browsers
      mq.addListener(check);
    }

    // Fallback listeners for resize & orientation change
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    // run check once to sync
    check();

    return () => {
      if (mq && mq.removeEventListener) {
        mq.removeEventListener("change", check);
      } else if (mq && mq.removeListener) {
        mq.removeListener(check);
      }
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, [breakpoint]);

  return isMobile;
}
