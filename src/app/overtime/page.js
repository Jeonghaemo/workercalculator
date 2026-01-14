export const metadata = {
  title: "연장/야간/휴일수당 계산기",
  description: "근무시간, 시급, 연장·야간·휴일근로 입력 시 2026년 기준 각종 수당을 자동 계산합니다. 연장수당, 야근수당, 휴일수당 계산법과 근로기준법 기준을 반영합니다.",
  keywords: "연장수당, 야간수당, 휴일수당, 시급, 근무시간, 급여 계산",
  openGraph: {
    title: "연장/야간/휴일수당 계산기",
    description: "2026년 연장 근무, 야간 근무, 휴일 근무 수당 계산기 입니다. 근무시간, 시급 등 입력 시 각종 수당을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/overtime",
    siteName: "근로·급여 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import OvertimeCalculator from "./overtime";

export default function Page() {
  return <OvertimeCalculator />;
}
