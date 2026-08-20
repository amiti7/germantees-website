"use client";

import { useState, useEffect } from "react";
import { getRemoteConfigFlag } from "@/lib/firebase";

/**
 * React hook to read a boolean feature flag from Firebase Remote Config.
 *
 * Usage:
 *   const { value: useBackend, loading } = useFeatureFlag("use_backend", false);
 *
 * - `value`   — the flag's current value (true/false)
 * - `loading` — true while fetching from Firebase, false once resolved
 *
 * While loading, `value` will be the defaultValue you provide.
 * If Firebase fetch fails, it also falls back to defaultValue.
 */
export function useFeatureFlag(key: string, defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRemoteConfigFlag(key, defaultValue)
      .then((flagValue) => setValue(flagValue))
      .finally(() => setLoading(false));
  }, [key, defaultValue]);

  return { value, loading };
}
