import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

export default function useOffsetTop(top: number) {
  const [offsetTop, setOffSetTop] = useState(false);
  const isTop = top || 100;

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > isTop) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [isTop]);

  return offsetTop;
}

// Usage
// const offset = useOffSetTop(100);
