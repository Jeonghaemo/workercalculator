export const metadata = {
  title: "연차수당 계산기",
  description: "근속기간, 연차일수 입력 시 연차수당을 자동으로 계산합니다.",
  keywords: "연차수당 계산기, 연차, 근속기간, 급여 계산, 연차수당",
  openGraph: {
    title: "연차수당 계산기",
    description: "근속기간, 연차일수 입력 시 연차수당을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/annual-leave",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import AnnualLeaveCalculator from "./annual-leave";

export default function Page() {
  return <AnnualLeaveCalculator />;
}
