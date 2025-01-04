import { useState, useEffect } from 'react';

const useIntersectionObserver = (options = { threshold: 0.50 }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px', 
      threshold: options.threshold, 
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      console.log(entry.isIntersecting);
    }, observerOptions);

    const element = document.querySelector(options.selector); 

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.selector, options.threshold]);

  return isIntersecting;
};

export default useIntersectionObserver;