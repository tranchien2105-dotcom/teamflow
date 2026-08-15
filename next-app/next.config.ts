import type { NextConfig } from "next";

const apiUrl = new URL(
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
);

const nextConfig: NextConfig = {
    output: "standalone",

    images: {
        remotePatterns: [
            {
                protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
                hostname: apiUrl.hostname,
                port: apiUrl.port,
                pathname: "/storage/**",
            },
        ],
    },
};

export default nextConfig;