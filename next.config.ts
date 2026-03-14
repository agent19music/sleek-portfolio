import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev',
    },
    {
        protocol: 'https',
        hostname: 'pub-0a313ba028f9423cba4b9803d081b5db.r2.dev',
    }, 
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default withNextVideo(nextConfig);