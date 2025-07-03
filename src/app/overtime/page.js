export const metadata = {
  title: "연장/야근/휴일수당 계산기",
  description: "근무시간, 시급 등 입력 시 각종 수당을 자동으로 계산합니다.",
  keywords: "연장수당, 야근수당, 휴일수당, 시급, 근무시간, 급여 계산",
  openGraph: {
    title: "연장/야근/휴일수당 계산기",
    description: "근무시간, 시급 등 입력 시 각종 수당을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/overtime",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import OvertimeCalculator from "./OvertimeCalculator";

export default function Page() {
  return <OvertimeCalculator />;
}
