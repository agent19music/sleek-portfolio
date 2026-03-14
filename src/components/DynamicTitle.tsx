"use client";

import { useEffect, useRef } from "react";

export function DynamicTitle() {
  const originalTitle = useRef<string>("");

  useEffect(() => {
    originalTitle.current = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Please come back 🥺";
      } else {
        document.title = originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle.current;
    };
  }, []);

  return null;
}
