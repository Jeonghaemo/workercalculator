// app/retirementpension/page.js

export const metadata = {
  title: "퇴직연금 계산기",
  description: "퇴직 전 3개월 임금, 재직일수 등 입력 시 2025년 기준 퇴직연금(퇴직금) 예상 수령액을 자동 계산합니다. 평균임금, 통상임금, 퇴직금 공식 등 최신 법령을 반영합니다.",
  keywords: "퇴직연금 계산기, 퇴직금 계산기, 평균임금, 통상임금, 퇴직금 공식, 퇴직연금, 근로자 퇴직급여, 2025 퇴직금",
  openGraph: {
    title: "퇴직연금 계산기",
    description: "퇴직 전 3개월 임금, 재직일수 등 입력 시 2025년 기준 퇴직연금(퇴직금) 예상 수령액을 자동 계산합니다. 평균임금, 통상임금, 퇴직금 공식 등 최신 법령을 반영합니다.",
    url: "https://workercalculator.damoapick.co.kr/retirementpension",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import RetirementPensionCalculator from "./retirementpension";

export default function Page() {
  return <RetirementPensionCalculator />;
}
