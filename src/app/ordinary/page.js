export const metadata = {
  title: "통상임금 계산기",
  description: "기본급, 각종 수당, 상여금 등 입력 시 통상임금을 자동 산출합니다. 통상임금의 정의, 포함·제외 항목, 통상임금 계산법 등도 함께 안내합니다.",
  keywords: "통상임금 계산기, 통상임금, 기본급, 수당, 급여 계산",
  openGraph: {
    title: "통상임금 계산기",
    description: "기본급, 각종 수당, 상여금 등 입력 시 통상임금을 자동 산출합니다. 통상임금의 정의, 포함·제외 항목, 통상임금 계산법 등도 함께 안내합니다.",
    url: "https://workercalculator.damoapick.co.kr/ordinary",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};

import OrdinaryCalculator from "./ordinary";

export default function Page() {
  return <OrdinaryCalculator />;
}
