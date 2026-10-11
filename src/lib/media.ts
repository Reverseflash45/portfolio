"use client";

import { useSyncExternalStore } from "react";

const tanpaLangganan = () => () => {};

/**
 * Nilai media query yang ikut berubah saat preferensi pengguna berubah.
 * Saat render server dan hidrasi memakai `server`, jadi tidak ada mismatch.
 */
export function useMedia(query: string, server = false): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** true setelah komponen berjalan di peramban (false saat render server/hidrasi). */
export function useMounted(): boolean {
  return useSyncExternalStore(
    tanpaLangganan,
    () => true,
    () => false,
  );
}
