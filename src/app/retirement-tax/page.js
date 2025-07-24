export const metadata = {
  title: "퇴직소득세 계산기",
  description: "퇴직금, 근속연수, 비과세 소득 등 입력 시 퇴직소득세를 자동 계산합니다. 퇴직소득세율, 공제항목, 퇴직소득 과세표준 등 최신 세법 기준을 반영합니다.",
  keywords: "퇴직소득세 계산기, 퇴직소득세, 퇴직금, 근속연수, 세금 계산",
  openGraph: {
    title: "퇴직소득세 계산기",
    description: "퇴직금, 근속연수, 비과세 소득 등 입력 시 퇴직소득세를 자동 계산합니다. 퇴직소득세율, 공제항목, 퇴직소득 과세표준 등 최신 세법 기준을 반영합니다.",
    url: "https://workercalculator.damoapick.co.kr/retirement-tax",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import RetirementTaxCalculator from "./retirement-tax";

export default function Page() {
  return <RetirementTaxCalculator />;
}
