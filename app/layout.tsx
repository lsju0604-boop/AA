/* ============================================
   layout.tsx - 루트 레이아웃 파일
   - 전체 페이지의 기본 구조(html, body)를 정의
   - Google Fonts (Geist) 폰트 적용
   - SEO 메타데이터 설정
   ============================================ */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Geist Sans 폰트 설정 (본문용) */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Geist Mono 폰트 설정 (코드용) */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* SEO 메타데이터 - 검색엔진에 표시될 정보 */
export const metadata: Metadata = {
  title: "딸깍 스튜디오 - AI 이미지 생성 서비스",
  description:
    "내 얼굴은 그대로, 원하는 모습으로 변신! 프리미엄 AI 모델링으로 놀라운 이미지를 생성하세요.",
};

/* 루트 레이아웃 컴포넌트 - 모든 페이지를 감싸는 최상위 레이아웃 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
