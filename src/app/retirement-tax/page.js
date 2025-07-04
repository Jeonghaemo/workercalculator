export const metadata = {
  title: "퇴직소득세 계산기",
  description: "퇴직금, 근속연수 등 입력 시 퇴직소득세를 자동으로 계산합니다.",
  keywords: "퇴직소득세 계산기, 퇴직소득세, 퇴직금, 근속연수, 세금 계산",
  openGraph: {
    title: "퇴직소득세 계산기",
    description: "퇴직금, 근속연수 등 입력 시 퇴직소득세를 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/retirement-tax",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import RetirementTaxCalculator from "./retirement-tax";

export default function Page() {
  return <RetirementTaxCalculator />;
}
