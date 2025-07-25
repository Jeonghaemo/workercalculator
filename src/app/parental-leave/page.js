export const metadata = {
  title: "육아휴직 급여 계산기",
  description: "육아휴직 기간, 월급 등 입력 시 육아휴직 급여를 자동 계산합니다. 육아휴직 급여 상한·하한, 고용보험, 부모 동시 육아휴직 등 최신 정책을 반영합니다.",
  keywords: "육아휴직 계산기, 육아휴직 급여, 육아휴직, 급여 계산",
  openGraph: {
    title: "육아휴직 급여 계산기",
    description: "육아휴직 기간, 월급 등 입력 시 육아휴직 급여를 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/parental-leave",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import ParentalLeaveCalculator from "./parental-leave";

export default function Page() {
  return <ParentalLeaveCalculator />;
}
