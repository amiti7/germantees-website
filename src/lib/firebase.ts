import { initializeApp, getApps } from "firebase/app";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

/**
 * Firebase configuration for Germantees.
 *
 * getApps().length check ensures we only initialize Firebase ONCE,
 * even if this file is imported from multiple places (which is common
 * in Next.js where modules can be re-evaluated).
 */
const firebaseConfig = {
  apiKey: "AIzaSyCS1NoK4C6Xd08MHyKCNm86x5IVXiODoC4",
  authDomain: "germantees-96.firebaseapp.com",
  projectId: "germantees-96",
  storageBucket: "germantees-96.firebasestorage.app",
  messagingSenderId: "914341498366",
  appId: "1:914341498366:web:1509417db1344ce40d84af",
  measurementId: "G-KR5Z69N6NR",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };

// ---------- Remote Config helper ----------

/**
 * Fetches a boolean flag from Firebase Remote Config.
 *
 * How it works:
 * 1. getRemoteConfig(app) — gets the Remote Config instance
 * 2. We set a minimumFetchIntervalMillis so it doesn't hit Firebase
 *    on every single page load (caches for 5 minutes in dev, 1 hour in prod)
 * 3. fetchAndActivate() — downloads the latest values from Firebase
 * 4. getValue() — reads the specific flag
 *
 * This only works in the BROWSER (client-side), because Remote Config
 * uses browser APIs internally. Server Components cannot call this.
 */
export async function getRemoteConfigFlag(key: string, defaultValue: boolean): Promise<boolean> {
  // Remote Config only works in the browser
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const remoteConfig = getRemoteConfig(app);

    // In development, fetch fresh values every 5 minutes
    // In production, Firebase defaults to 12 hours (we set 1 hour)
    remoteConfig.settings.minimumFetchIntervalMillis =
      process.env.NODE_ENV === "development" ? 5 * 60 * 1000 : 60 * 60 * 1000;

    // Set default values (used if fetch fails or flag doesn't exist yet)
    remoteConfig.defaultConfig = {
      [key]: defaultValue,
    };

    await fetchAndActivate(remoteConfig);
    return getValue(remoteConfig, key).asBoolean();
  } catch (error) {
    console.warn(`Remote Config fetch failed for "${key}", using default: ${defaultValue}`, error);
    return defaultValue;
  }
}
