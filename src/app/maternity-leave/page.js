export const metadata = {
  title: "출산휴가 급여 계산기",
  description: "출산휴가 기간, 월급 등 입력 시 출산휴가 급여를 자동으로 계산합니다.",
  keywords: "출산휴가 계산기, 출산휴가 급여, 출산휴가, 급여 계산",
  openGraph: {
    title: "출산휴가 급여 계산기",
    description: "출산휴가 기간, 월급 등 입력 시 출산휴가 급여를 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/maternity-leave",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import MaternityLeaveCalculator from "./maternity-leave";

export default function Page() {
  return <MaternityLeaveCalculator />;
}
