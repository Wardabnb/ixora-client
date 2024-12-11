import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000", // le port de ton backend, ajuste si nécessaire
        pathname: "/static/**", // le chemin de tes images
      },
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
