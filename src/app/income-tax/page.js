export const metadata = {
  title: "근로소득세 계산기",
  description: "월급, 연봉 등 입력 시 원천징수 근로소득세, 4대보험 등 공제액을 자동 계산합니다. 근로소득세율, 소득공제, 실수령액 등 세금 관련 정보도 함께 제공합니다.",
  keywords: "근로소득세 계산기, 소득세, 월급, 연봉, 세금 계산",
  openGraph: {
    title: "근로소득세 계산기",
    description: "월급, 연봉 등 입력 시 원천징수 근로소득세를 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/income-tax",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import IncomeTaxCalculator from "./income-tax";

export default function Page() {
  return <IncomeTaxCalculator />;
}
