export const metadata = {
  title: "주휴수당 계산기",
  description: "근무일수, 근무시간 입력 시 주휴수당을 자동으로 계산합니다.",
  keywords: "주휴수당 계산기, 근무일수, 근무시간, 급여 계산, 2025 근로기준법",
  openGraph: {
    title: "주휴수당 계산기",
    description: "근무일수, 근무시간 입력 시 주휴수당을 자동으로 계산합니다.",
    url: "https://workercalculator.damoapick.co.kr/weekly-bonus",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import WeeklyBonusCalculator from "./weekly-bonus";

export default function Page() {
  return <WeeklyBonusCalculator />;
}
