// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "근로·급여 계산기 모음",
    template: "%s | 근로·급여 계산기 모음",
  },
  description:
    "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직, 연장·야간·휴일수당, 실업급여, 성과급, 통상임금, 소득세 등 각종 급여와 세금 계산기를 한 곳에서 쉽게 이용하세요.",
  keywords:
    "연봉 계산기, 시급 계산기, 월급 계산, 주휴수당, 퇴직금, 실수령액, 4대 보험, 출산휴가, 육아휴직, 연차수당, 통상임금, 실업급여, 성과급, 소득세, 퇴직소득세, 2025 세금, 근로소득",
  openGraph: {
    title: "근로·급여 계산기 모음",
    description:
      "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직, 연장·야간·휴일수당, 실업급여, 성과급, 통상임금, 소득세 등 각종 급여와 세금 계산기를 한 곳에서 쉽게 이용하세요.",
    url: "https://workercalculator.damoapick.co.kr",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 애드센스 자동광고 스크립트 */}
        <Script
          id="adsense-auto"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4564123418761220"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="h-5" /> {/* 네비게이션바 위에 24px 여백 */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
