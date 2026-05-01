"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the component has mounted on the client.
 * Use to gate any output that depends on persisted (localStorage) state
 * to avoid SSR/CSR hydration mismatches.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
