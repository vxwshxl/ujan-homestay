"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Light / dark / system, system by default. next-themes writes the class before
 * first paint, so there is never a flash of the wrong theme, and
 * `disableTransitionOnChange` stops every token from animating during a switch.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
