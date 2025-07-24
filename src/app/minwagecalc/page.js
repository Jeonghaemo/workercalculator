export const metadata = {
  title: "최저시급 (월급, 연봉) 계산기",
  description: "주 근로시간과 한달 근로시간을 입력하면 예상 월급 및 연봉을 자동 산출합니다. 2025년도 최저임금 시급 10,030원 기준, 주휴수당 포함 계산.",
  keywords: "최저시급표, 최저시급 계산기, 월급 계산기, 연봉 계산기, 주휴수당",
  openGraph: {
    title: "최저시급 (월급, 연봉) 계산기",
    description: "주 근로시간과 한달 근로시간을 입력하면 예상 월급 및 연봉을 자동 산출합니다. 2025년도 최저임금 시급 10,030원 기준, 주휴수당 포함 계산.",
    url: "https://workercalculator.damoapick.co.kr/minwagecalc",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import MinWageCalculator from "./minwagecalc";

export default function Page() {
  return <MinWageCalculator />;
}
