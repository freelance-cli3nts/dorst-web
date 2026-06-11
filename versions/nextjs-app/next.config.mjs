/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'dorst-web'
const basePath = isGithubPages ? `/${repoName}/nextjs-app` : ''

const nextConfig = {
  // Static export only for GitHub Pages preview — production runs on Vercel (SSR)
  ...(isGithubPages && { output: 'export' }),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: isGithubPages,
  },
}

export default nextConfig
