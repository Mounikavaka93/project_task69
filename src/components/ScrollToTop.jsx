import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const node = document.getElementById(hash.slice(1));
      if (node) {
        const timer = window.setTimeout(() => {
          node.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 40);
        return () => window.clearTimeout(timer);
      }
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
