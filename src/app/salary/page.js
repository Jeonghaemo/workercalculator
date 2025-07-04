// app/salary/page.js
export const metadata = {
  title: "연봉(월급) 실수령액 계산기",
  description: "연봉 또는 월급, 비과세액, 부양가족수 등을 입력하면 4대보험, 소득세, 지방소득세 등 각종 공제액을 반영한 실수령액을 자동 계산합니다. 연봉계산기, 실수령액, 근로소득세, 공제 내역 등 정확한 월급 확인이 가능합니다",
  keywords: "연봉 계산기, 실수령액, 월급 계산, 2025 세금, 근로소득, 소득세, 4대보험, 워커 계산기",
  openGraph: {
    title: "연봉(월급) 실수령액 계산기",
    description: "연봉, 월급, 부양가족, 비과세액 등 입력 시 2025년 기준 실수령액을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/salary",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import SalaryCalculator from "./Salary";

export default function Page() {
  return <SalaryCalculator />;
}









