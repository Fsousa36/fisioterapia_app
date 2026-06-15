import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@fisiobase/types"]
};

export default nextConfig;
