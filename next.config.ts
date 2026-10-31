/* ============================================
   next.config.ts - Next.js 설정 파일
   
   - images.remotePatterns: 외부 이미지 URL을 허용
     (Unsplash 이미지를 사용하기 위해 필요)
   - turbopack: Tailwind CSS 빌드 설정
   ============================================ */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 외부 이미지 호스트 허용 설정 */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /* 캐시 컴포넌트 활성화 */
  cacheComponents: true,
  /* 부분 프리페칭 활성화 */
  partialPrefetching: true,
  /* Turbopack 빌드 도구 설정 (Tailwind CSS) */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
