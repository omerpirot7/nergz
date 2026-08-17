import type { NextConfig } from "next";
import os from "os";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Keep webpack cache outside OneDrive to avoid EBUSY/ENOENT lock errors on Windows.
      config.cache = {
        type: "filesystem",
        cacheDirectory: path.join(os.tmpdir(), "nergz-next-webpack-cache"),
      };
    }
    return config;
  },
};

export default nextConfig;
