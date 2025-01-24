import { useMemo, useState, useEffect, useRef } from "react";

const useObserver = ({ options = {} } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const prevScrollY = useRef(window.scrollY); // Track previous scroll position

  const memoizedOptions = useMemo(
    () => options,
    [options.root, options.rootMargin, options.threshold]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > prevScrollY.current;

      if (entry.isIntersecting && isScrollingDown) {
        setIsVisible(true); // Trigger animation when scrolling down
      }

      prevScrollY.current = currentScrollY; // Update previous scroll position
    }, memoizedOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.disconnect();
    };
  }, [memoizedOptions]);

  return { ref: elementRef, isVisible };
};

export default useObserver;
