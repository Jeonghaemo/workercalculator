export const metadata = {
  title: "실업급여 계산기",
  description: "근속기간, 이직사유 등 입력 시 실업급여를 자동으로 계산합니다.",
  keywords: "실업급여 계산기, 실업급여, 이직사유, 근속기간, 급여 계산",
  openGraph: {
    title: "실업급여 계산기",
    description: "근속기간, 이직사유 등 입력 시 실업급여를 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/unemployment",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import UnemploymentCalculator from "./unemployment";

export default function Page() {
  return <UnemploymentCalculator />;
}
