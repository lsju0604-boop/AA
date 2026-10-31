/* ============================================
   page.tsx - 딸깍 스튜디오 메인 랜딩 페이지
   
   이 파일은 "use client"를 사용하는 클라이언트 컴포넌트입니다.
   왜냐하면 useState (상태관리)와 onClick (이벤트 핸들링)을
   사용해야 하기 때문입니다.
   
   구성 섹션:
   1. Header - 상단 네비게이션
   2. Hero - 메인 타이틀
   3. AI 이미지 생성 인터페이스
   4. Sample Gallery - 샘플 갤러리
   5. CTA - 행동 유도 섹션
   6. Footer - 하단 정보
   ============================================ */
"use client";

import { useState } from "react";
import Image from "next/image";

/* ============================================
   샘플 갤러리에서 사용할 이미지 데이터
   - 여성/남성/아이 각 카테고리별로
     원본 1장 + AI 생성 이미지 9장으로 구성
   - picsum.photos를 사용하여 실제 사진을 표시
   ============================================ */

/* 각 카테고리별 프롬프트 텍스트 (이미지 클릭 시 입력창에 자동 입력) */
const promptTexts: Record<string, string[]> = {
  woman: [
    "우아한 이브닝 드레스를 입고 정원에서 포즈를 취하는 모습",
    "전통 한복을 입고 고궁 앞에서 서 있는 모습",
    "세련된 비즈니스 정장을 입고 오피스에서 자신감 있는 모습",
    "해변에서 캐주얼한 여름 스타일의 모습",
    "스포티한 운동복을 입고 에너지 넘치는 모습",
    "보헤미안 스타일로 꽃밭에서 몽환적인 모습",
    "카페에서 가을 니트를 입고 따뜻한 분위기의 모습",
    "도시 거리에서 스트리트 패션을 입은 모습",
    "파티 드레스를 입고 화려한 무대 위의 모습",
  ],
  man: [
    "세련된 정장을 입고 도시 배경에서 포즈를 취하는 모습",
    "캐주얼한 데님 스타일로 카페에서 여유로운 모습",
    "스포츠 유니폼을 입고 경기장에서의 모습",
    "가죽 재킷을 입고 바이크 옆에 서 있는 모습",
    "해변에서 서핑보드와 함께 있는 여름 스타일",
    "겨울 코트를 입고 눈 오는 거리를 걷는 모습",
    "한복을 입고 전통 마을에서 포즈를 취하는 모습",
    "운동복을 입고 헬스장에서 운동하는 모습",
    "파일럿 유니폼을 입고 비행기 앞에서의 모습",
  ],
  child: [
    "동화 속 왕자/공주 의상을 입고 성 앞에서의 모습",
    "우주비행사 복장을 입고 우주선 앞에서의 모습",
    "슈퍼히어로 코스튬을 입고 도시를 배경으로 한 모습",
    "한복을 입고 추석 분위기에서 세배하는 모습",
    "축구 유니폼을 입고 축구장에서 공을 차는 모습",
    "예쁜 원피스를 입고 놀이공원에서 즐거운 모습",
    "해적 의상을 입고 보물 지도를 들고 있는 모습",
    "크리스마스 의상을 입고 트리 앞에서의 모습",
    "탐험가 복장을 입고 정글 모험을 하는 모습",
  ],
};

/* ============================================
   메인 페이지 컴포넌트
   ============================================ */
export default function Home() {
  /* ---- 상태 관리 ---- */
  /* activeTab: 현재 선택된 갤러리 탭 ("woman", "man", "child") */
  const [activeTab, setActiveTab] = useState<string>("woman");

  /* promptText: 프롬프트 입력창에 표시될 텍스트 */
  const [promptText, setPromptText] = useState<string>("");

  /* selectedModel: 선택된 AI 모델 */
  const [selectedModel, setSelectedModel] = useState<string>("플래시");

  /* selectedStyle: 선택된 이미지 스타일 */
  const [selectedStyle, setSelectedStyle] = useState<string>("자동");

  /* selectedRatio: 선택된 이미지 비율 */
  const [selectedRatio, setSelectedRatio] = useState<string>("1:1");

  /* ---- 갤러리 이미지 클릭 핸들러 ---- */
  /* AI 생성 이미지를 클릭하면 해당 프롬프트가 입력창에 자동으로 들어갑니다 */
  const handleImageClick = (index: number) => {
    const texts = promptTexts[activeTab];
    if (texts && texts[index]) {
      setPromptText(texts[index]);
      /* 페이지 상단의 프롬프트 입력창으로 스크롤 */
      document
        .getElementById("prompt-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ---- 탭별 라벨 텍스트 ---- */
  const tabLabels: Record<string, string> = {
    woman: "여성",
    man: "남성",
    child: "아이",
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* ================================================
          섹션 1: Header (상단 네비게이션 바)
          - 왼쪽: 로고
          - 가운데: 메뉴 링크들
          - 오른쪽: 시작하기 버튼
          ================================================ */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* 로고 영역 */}
          <div className="flex items-center gap-2">
            {/* 로고 아이콘 (에메랄드색 원) */}
            <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">딸</span>
            </div>
            <span className="font-bold text-lg text-gray-900">딸깍</span>
          </div>

          {/* 네비게이션 메뉴 (화면 넓을 때만 보임) */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#prompt-section"
              className="text-sm font-medium text-gray-600 hover:text-[#10b981] transition-colors"
            >
              이미지 생성
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#10b981] transition-colors"
            >
              내 갤러리
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#10b981] transition-colors"
            >
              요금제
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-[#10b981] transition-colors"
            >
              사용내역
            </a>
          </nav>

          {/* 시작하기 버튼 */}
          <button className="bg-[#10b981] hover:bg-[#059669] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors hover-lift">
            시작하기
          </button>
        </div>
      </header>

      {/* ================================================
          섹션 2: Hero (메인 타이틀 영역)
          - 큰 제목: "딸깍 스튜디오" + AI 배지
          - 부제: "내 얼굴은 그대로, 원하는 모습으로 변신!"
          ================================================ */}
      <section className="py-16 md:py-24 text-center bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* 제목 + AI 배지 */}
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              딸깍 스튜디오
            </h1>
            {/* AI 배지 - 30도 기울어진 에메랄드색 뱃지 */}
            <span className="ai-badge">AI</span>
          </div>

          {/* 부제목 */}
          <p className="mt-6 text-lg md:text-xl text-gray-500">
            내 얼굴은 그대로,{" "}
            <span className="text-gray-900 font-semibold">
              원하는 모습으로 변신!
            </span>
          </p>
        </div>
      </section>

      {/* ================================================
          섹션 3: AI 이미지 생성 인터페이스
          - 프롬프트 입력창 (텍스트 입력 + 이미지 업로드)
          - "생성하기" 버튼
          - 모델/스타일/비율 드롭다운 선택
          ================================================ */}
      <section
        id="prompt-section"
        className="py-12 bg-white border-t border-gray-100"
      >
        <div className="max-w-2xl mx-auto px-6">
          {/* 프롬프트 라벨 */}
          <div className="flex items-center gap-2 mb-3">
            {/* 사람 아이콘 (SVG) */}
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span className="text-sm font-semibold text-gray-700">
              프롬프트
            </span>
          </div>

          {/* 프롬프트 입력창 */}
          <div className="relative">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="원하시고 있는 사진을 정확한 후 원하는 스타일이나 콘셉트를 입력하세요"
              className="prompt-input w-full h-28 p-4 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-xl resize-none text-gray-800 placeholder-gray-400"
            />
            {/* 이미지 업로드 아이콘 버튼 (입력창 우측 하단) */}
            <button className="absolute right-3 bottom-3 p-2 text-gray-400 hover:text-[#10b981] transition-colors rounded-lg hover:bg-gray-100">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          {/* 생성하기 버튼 (검정색) */}
          <button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors hover-lift text-sm">
            생성하기
          </button>

          {/* 옵션 선택 드롭다운들 (모델 / 스타일 / 비율) */}
          <div className="flex gap-3 mt-4">
            {/* 모델 선택 */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                👤 모델
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="custom-select w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option>플래시</option>
                <option>프로</option>
                <option>울트라</option>
              </select>
            </div>

            {/* 스타일 선택 */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                🎨 스타일
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="custom-select w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option>자동</option>
                <option>사실적</option>
                <option>애니메이션</option>
                <option>수채화</option>
                <option>유화</option>
              </select>
            </div>

            {/* 비율 선택 */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                📐 비율
              </label>
              <select
                value={selectedRatio}
                onChange={(e) => setSelectedRatio(e.target.value)}
                className="custom-select w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option>1:1</option>
                <option>3:4</option>
                <option>4:3</option>
                <option>9:16</option>
                <option>16:9</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          섹션 4: SAMPLE GALLERY (샘플 갤러리)
          - 제목 + 부제
          - 여성/남성/아이 탭 전환
          - 원본 사진 (큰 이미지)
          - AI 생성 이미지 3x3 그리드
          ================================================ */}
      <section id="gallery" className="py-16 md:py-24 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto px-6">
          {/* 갤러리 제목 */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
              SAMPLE GALLERY
            </h2>
            <p className="mt-3 text-gray-500 text-base">
              프리미엄 AI 모델이 만든 놀라운 변화
            </p>
          </div>

          {/* 카테고리 탭 (여성 / 남성 / 아이) */}
          <div className="flex justify-center gap-4 mb-10">
            {/* 각 탭을 순회하며 버튼을 생성합니다 */}
            {(["woman", "man", "child"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeTab === tab
                    ? "border-[#10b981] shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* 탭 이미지 - 카테고리별 다른 이미지 사용 */}
                <Image
                  src={
                    tab === "woman"
                      ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                      : tab === "man"
                        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        : "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop&crop=face"
                  }
                  alt={tabLabels[tab]}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* 탭 라벨 (하단에 오버레이) */}
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center font-medium">
                  {tabLabels[tab]}
                </span>
              </button>
            ))}
          </div>

          {/* 메인 콘텐츠 영역: 원본 + AI 이미지 그리드 */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ---- 원본 사진 영역 ---- */}
            <div className="w-full lg:w-[340px] flex-shrink-0">
              {/* "원본사진" 배지 */}
              <div className="inline-block bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                원본 사진
              </div>
              {/* 원본 이미지 */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={
                    activeTab === "woman"
                      ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=667&fit=crop&crop=face"
                      : activeTab === "man"
                        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=667&fit=crop&crop=face"
                        : "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=667&fit=crop&crop=face"
                  }
                  alt="원본 사진"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* ---- AI 생성 이미지 3x3 그리드 ---- */}
            <div className="flex-1">
              {/* "AI 생성 이미지" 배지 */}
              <div className="inline-block bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                AI 생성 이미지
              </div>
              {/* 3x3 이미지 그리드 */}
              <div className="grid grid-cols-3 gap-3">
                {/* 9개의 AI 이미지를 순회하며 표시 */}
                {Array.from({ length: 9 }).map((_, index) => {
                  /* 각 카테고리별로 다른 Unsplash 이미지를 사용 */
                  const womanImages = [
                    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
                  ];
                  const manImages = [
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop&crop=face",
                  ];
                  const childImages = [
                    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1502086223501-7ea363b65e1c?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1504349286082-37e0b4fc8234?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1475862013929-8affa6384eb5?w=200&h=200&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=200&h=200&fit=crop&crop=face",
                  ];

                  const images =
                    activeTab === "woman"
                      ? womanImages
                      : activeTab === "man"
                        ? manImages
                        : childImages;

                  return (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className="relative aspect-square rounded-xl overflow-hidden gallery-image shadow-sm hover:shadow-md"
                    >
                      <Image
                        src={images[index]}
                        alt={`AI 생성 이미지 ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          섹션 5: CTA (Call To Action - 행동 유도)
          - "지금 바로 시작해보세요" 메시지
          - "바로 시작하기 →" 버튼
          ================================================ */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          {/* 아이콘 */}
          <div className="w-14 h-14 bg-[#d1fae5] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">🤖</span>
          </div>
          {/* CTA 제목 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AI 패션 모델로
          </h2>
          <p className="text-lg text-gray-500 mb-2">
            오늘 사진과 프롬프트만으로 변신할 수 있습니다
          </p>
          <p className="text-sm text-gray-400 mb-8">
            지금 바로 시작해보세요
          </p>
          {/* CTA 버튼 */}
          <button className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors hover-lift text-base">
            바로 시작하기 →
          </button>
        </div>
      </section>

      {/* ================================================
          섹션 6: Footer (하단 정보)
          - 좌측: 회사 기본 정보
          - 우측: 이용약관, 개인정보처리방침, 저작권
          ================================================ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* 좌측: 회사 기본 정보 */}
            <div className="text-sm leading-7">
              <p className="text-white font-semibold mb-2">딸깍 스튜디오</p>
              <p>상호명: (주)딸깍</p>
              <p>대표: 홍길동</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 제2025-서울강남-00000호</p>
              <p>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
              <p>이메일: support@ttalkkak.com</p>
            </div>

            {/* 우측: 약관 및 저작권 */}
            <div className="text-sm text-right flex flex-col justify-between">
              <div className="flex gap-6 md:justify-end mb-4">
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  이용 약관
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  개인정보 처리 방침
                </a>
              </div>
              <p className="text-gray-500">
                © 2025 딸깍. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
