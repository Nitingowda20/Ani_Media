import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Disable the default scroll restoration behavior of the browser
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to the top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // Force scroll to top on initial load/refresh
  useEffect(() => {
    const onLoad = () => window.scrollTo(0, 0);
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad); // Cleanup after component unmount
    };
  }, []);

  return null;
};

export default ScrollToTop;
