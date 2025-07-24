// /app/four-insurances/page.js
export const metadata = {
  title: "4대 보험 계산기",
  description: "월급 입력 시 국민연금, 건강보험, 고용보험, 산재보험 등 4대 보험료를 자동 계산합니다. 2025년 기준 요율, 근로자/사업주 부담금, 총액, 기업규모별 고용보험 등 상세한 결과를 제공합니다.",
  keywords: "4대 보험 계산기, 국민연금, 건강보험, 고용보험, 산재보험, 2025년 4대 보험, 사회보험료 계산, 근로자 보험료, 사업주 보험료",
  openGraph: {
    title: "4대 보험 계산기",
    description: "월급 입력 시 국민연금, 건강보험, 고용보험, 산재보험 등 4대 보험료를 자동 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/four-insurances",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import FourInsuranceCalculator from "./four-insurances";

export default function Page() {
  return <FourInsuranceCalculator />;
}