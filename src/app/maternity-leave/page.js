export const metadata = {
  title: "출산휴가 급여 계산기",
  description: "출산휴가 기간, 통상임금 등 입력 시 출산휴가 급여를 자동 산출합니다. 출산휴가급여 상한액, 고용보험, 출산휴가 지원제도 등 관련 정보를 제공합니다.",
  keywords: "출산휴가 계산기, 출산휴가 급여, 출산휴가, 급여 계산",
  openGraph: {
    title: "출산휴가 급여 계산기",
    description: "출산휴가 기간, 통상임금 등 입력 시 출산휴가 급여를 자동 산출합니다. 출산휴가급여 상한액, 고용보험, 출산휴가 지원제도 등 관련 정보를 제공합니다.",
    url: "https://workercalculator.damoapick.co.kr/maternity-leave",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import MaternityLeaveCalculator from "./maternity-leave";

export default function Page() {
  return <MaternityLeaveCalculator />;
}
