/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Cloudflare Pages serves this as plain static files. Every route is already
  // static or SSG, so there is nothing to give up by exporting.
  output: "export",

  // Static export has no image optimizer at request time, so next/image must
  // serve the files as-is. Source images are pre-compressed for that reason.
  images: { unoptimized: true },

  // Emit /about/index.html rather than /about.html so paths resolve on any host.
  trailingSlash: true,
};

export default nextConfig;
