// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직 등 각종 급여와 세금 계산기를 한 곳에서 쉽게 이용하세요.",
  keywords:
    "연봉 계산기, 시급 계산기, 월급 계산, 주휴수당, 퇴직금, 실수령액, 4대 보험, 2025 세금, 근로소득, 소득세, 4대보험, 워커 계산기",
  openGraph: {
    title: "근로·급여 계산기 모음",
    description:
      "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직 등 각종 급여와 세금 계산기를 한 곳에서 쉽게 이용하세요.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

