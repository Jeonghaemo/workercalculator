// /app/hourly/page.js
export const metadata = {
  title: "시급 계산기",
  description: "시급, 근무시간, 근무일수 등 입력 시 예상 월급, 연봉, 주휴수당을 자동으로 계산합니다. 최저임금, 시급 계산법, 근로기준법, 주휴수당 등 시급 산정에 필요한 정보를 제공합니다.",
  keywords: "시급 계산기, 월급 계산, 연봉 환산, 주휴수당, 2025 최저임금, 근로계산기, 알바 계산기",
  openGraph: {
    title: "시급 계산기",
    description: "시급, 근무시간, 근무일수 등 입력 시 예상 월급, 연봉, 주휴수당을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/hourly",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import Hourly from "./hourly"; 

export default function Page() {
  return <Hourly />; 
}
