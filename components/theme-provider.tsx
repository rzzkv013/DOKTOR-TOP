"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

function readTheme(): Theme {
  const storedTheme = window.localStorage.getItem("medora-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToTheme(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", onChange);
  window.addEventListener("medora-theme-change", onChange);
  mediaQuery.addEventListener("change", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("medora-theme-change", onChange);
    mediaQuery.removeEventListener("change", onChange);
  };
}

function getServerTheme(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, getServerTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = readTheme() === "light" ? "dark" : "light";
    window.localStorage.setItem("medora-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new Event("medora-theme-change"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className="relative isolate min-h-screen">
        <div aria-hidden="true" className="animated-backdrop">
          <span className="backdrop-orb backdrop-orb-one" />
          <span className="backdrop-orb backdrop-orb-two" />
          <span className="backdrop-orb backdrop-orb-three" />
          <span className="backdrop-capsule backdrop-capsule-one" />
          <span className="backdrop-capsule backdrop-capsule-two" />
          <span className="backdrop-cross backdrop-cross-one" />
          <span className="backdrop-cross backdrop-cross-two" />
          <svg
            className="backdrop-heartbeat"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0 62h370l28-1 18-1 22-39 30 80 32-58 21 19h90l19-1 20-3 22-31 29 62 29-28h710" />
          </svg>
        </div>
        <div className="relative z-10 min-h-screen">{children}</div>
        <ThemeToggle />
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Kunduzgi rejimga o‘tish" : "Tungi rejimga o‘tish"}
      title={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
      className="theme-toggle fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-white/80 bg-white/90 text-teal-800 shadow-xl shadow-slate-900/15 backdrop-blur transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <Icon size={19} />
    </button>
  );
}
