/**
 * Literal mirrors of tokens.css, for the few places CSS variables cannot reach:
 * `<meta name="theme-color">` and the web manifest. Keep these in step with
 * --ivory-50, --night-950 and --forest-700 — they are the only hex values that
 * are allowed to live outside tokens.css.
 */
export const THEME_COLOR = {
  light: "#FBF8F3",
  dark: "#0A1016",
  brand: "#2E5B45",
} as const;
