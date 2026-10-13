/** Public assets follow Vite's deployment base, including subdirectory hosting. */
export function assetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
