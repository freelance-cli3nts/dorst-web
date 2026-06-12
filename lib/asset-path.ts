/** Prefix public asset paths for GitHub Pages basePath (e.g. /dorst-web). */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${path}`
}
