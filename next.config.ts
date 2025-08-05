import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   server : {
    host : true,
    port : 3000
   },
   images: {
    domains: [
      'popupdomination.com',
      'tse1.mm.bing.net',
      'tse2.mm.bing.net',
      'tse3.mm.bing.net',
      'tse4.mm.bing.net',
      'coderscoach.com',
      'wallpaperaccess.com',
      'content.altexsoft.com',
    ],
  },
  
};

export default nextConfig;
