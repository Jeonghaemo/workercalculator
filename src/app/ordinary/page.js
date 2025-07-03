export const metadata = {
  title: "통상임금 계산기",
  description: "기본급, 각종 수당 입력 시 통상임금을 자동으로 계산합니다.",
  keywords: "통상임금 계산기, 통상임금, 기본급, 수당, 급여 계산",
  openGraph: {
    title: "통상임금 계산기",
    description: "기본급, 각종 수당 입력 시 통상임금을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/ordinary",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import OrdinaryCalculator from "./OrdinaryCalculator";

export default function Page() {
  return <OrdinaryCalculator />;
}
