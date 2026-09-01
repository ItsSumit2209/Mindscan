"use client";

import { useEffect, useRef } from "react";

export default function ChunkReload() {
  const reloaded = useRef(false);

  useEffect(() => {
    function tryReloadOnChunkError(event: Event | PromiseRejectionEvent) {
      if (reloaded.current) return;
      try {
        const errObj = "reason" in event ? event.reason : (event instanceof ErrorEvent ? event.error : null);
        const message = errObj?.message || (typeof event === "object" && "message" in event ? (event as any).message : "") || "";
        if (typeof message === "string" && /Loading chunk|ChunkLoadError|Failed to fetch RSC payload|net::ERR_ABORTED/.test(message)) {
          reloaded.current = true;
          const url = new URL(window.location.href);
          url.searchParams.set("_reload", String(Date.now()));
          setTimeout(() => window.location.replace(url.toString()), 200);
        }
      } catch (_e) {
        // ignore
      }
    }

    window.addEventListener("error", tryReloadOnChunkError);
    window.addEventListener("unhandledrejection", tryReloadOnChunkError);

    return () => {
      window.removeEventListener("error", tryReloadOnChunkError);
      window.removeEventListener("unhandledrejection", tryReloadOnChunkError);
    };
  }, []);

  return null;
}
