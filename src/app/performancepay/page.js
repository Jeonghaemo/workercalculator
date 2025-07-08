// performancepay/page.jsx

export const metadata = {
  title: "성과급 계산기",
  description: "기준급(연봉, 월급, 기본급)과 지급률(%)을 입력하면 세전·세후 성과급을 자동 계산합니다. 공제액, 실수령액, 성과급 산정 기준까지 한 번에 확인하세요.",
  keywords: "성과급, 성과급 계산기, 연봉, 월급, 지급률, 실수령액, 공제액, 급여 계산, 인센티브",
  openGraph: {
    title: "성과급 계산기",
    description: "기준급(연봉, 월급, 기본급)과 지급률(%)을 입력하면 세전·세후 성과급을 자동 계산합니다. 공제액, 실수령액, 성과급 산정 기준까지 한 번에 확인하세요.",
    url: "https://workercalculator.damoapick.co.kr/performancepay",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import BonusCalculator from "./performancepay";

export default function Page() {
  return <BonusCalculator />;
}
