export const metadata = {
  title: "퇴직금 계산기",
  description: "월급, 재직일수, 평균임금 등 입력 시 퇴직금을 자동으로 계산합니다.",
  keywords: "퇴직금 계산기, 퇴직금, 평균임금, 급여 계산, 퇴직금 자동계산",
  openGraph: {
    title: "퇴직금 계산기",
    description: "월급, 재직일수, 평균임금 등 입력 시 퇴직금을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/retirement",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import SeverancePayCalculator from "./retirement";

export default function Page() {
  return <SeverancePayCalculator />;
}
