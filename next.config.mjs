const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "**", // Match all HTTPS domains
      },
    ],
  },
};

module.exports = nextConfig;
