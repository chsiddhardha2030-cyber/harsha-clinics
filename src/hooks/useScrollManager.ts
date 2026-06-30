import { useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export function useScrollManager() {
  const router = useRouter();
  const location = useRouterState({ select: (s) => s.location });

  // 1. Save scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sessionStorage.getItem("lock_scroll_save") === "true") return;
      const key = window.history.state?.key;
      if (key) {
        sessionStorage.setItem(`scroll_${key}`, window.scrollY.toString());
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intercept before navigation to reset scroll for forward actions
  useEffect(() => {
    return router.subscribe("onBeforeNavigate", () => {
      const key = window.history.state?.key;
      const isPush = router.history.action === "PUSH";

      if (key && isPush) {
        // Save current scroll position before we transition away
        sessionStorage.setItem(`scroll_${key}`, window.scrollY.toString());
        sessionStorage.setItem("lock_scroll_save", "true");
        
        // Reset scroll position to top instantly
        document.documentElement.classList.add("no-smooth-scroll");
        window.scrollTo(0, 0);

        setTimeout(() => {
          sessionStorage.removeItem("lock_scroll_save");
          document.documentElement.classList.remove("no-smooth-scroll");
        }, 100);
      }
    });
  }, [router]);

  // 3. Restore scroll position when a page mounts / path changes
  useEffect(() => {
    if (location.pathname === "/specialties") {
      // Never restore scroll position for Specialties page
      return;
    }
    const key = window.history.state?.key;
    if (!key) return;

    const saved = sessionStorage.getItem(`scroll_${key}`);
    if (saved === null) return;

    const targetScrollY = parseInt(saved, 10);
    if (isNaN(targetScrollY)) return;

    let isUserScrolling = false;
    const stopRestoration = () => {
      isUserScrolling = true;
    };

    window.addEventListener("wheel", stopRestoration, { passive: true });
    window.addEventListener("touchmove", stopRestoration, { passive: true });
    window.addEventListener("keydown", stopRestoration, { passive: true });

    const restore = () => {
      if (isUserScrolling) return;
      window.scrollTo(0, targetScrollY);
    };

    // Restore immediately
    restore();

    // Watch body height changes to adjust scroll (handles content shifting/lazy-loading layout)
    const ro = new ResizeObserver(() => {
      if (!isUserScrolling) {
        restore();
      }
    });
    ro.observe(document.body);

    // Watch image loads specifically
    const handleImageLoad = () => {
      if (!isUserScrolling) {
        restore();
      }
    };

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleImageLoad);
      }
    });

    // Cleanup restoration listeners for this path
    return () => {
      window.removeEventListener("wheel", stopRestoration);
      window.removeEventListener("touchmove", stopRestoration);
      window.removeEventListener("keydown", stopRestoration);
      ro.disconnect();
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [location.pathname, location.state]); // Trigger when route changes
}
