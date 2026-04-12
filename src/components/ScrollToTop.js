import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset window scroll to the top on every route change.
// React Router v6 preserves the previous scroll position by default, which
// causes new pages to open halfway down if the user scrolled before navigating.
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
