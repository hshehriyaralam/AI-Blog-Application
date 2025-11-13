import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure '@' alias works in Vercel build too
    config.resolve.alias["@" ] = path.resolve(process.cwd(), "src");
    // Optional: also expose '@/app' alias explicitly (redundant but safe)
    config.resolve.alias["@/app"] = path.resolve(process.cwd(), "src/app");
    return config;
  },
};

export default nextConfig;