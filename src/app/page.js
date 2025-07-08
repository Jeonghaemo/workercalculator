// app/page.js
export const metadata = {
  title: "근로·급여 계산기 모음",
  description:
    "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직, 연장·야간·휴일수당, 실업급여, 성과급, 통상임금, 소득세 등 각종 급여와 세금 계산기를 한 곳에서 쉽고 빠르게 이용하세요.",
  keywords:
    "연봉 계산기, 시급 계산기, 월급 계산, 주휴수당, 퇴직금, 실수령액, 4대 보험, 출산휴가, 육아휴직, 연차수당, 통상임금, 실업급여, 성과급, 소득세, 퇴직소득세, 2025 세금, 근로소득, 워커 계산기",
  openGraph: {
    title: "근로·급여 계산기 모음",
    description:
      "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직, 연장·야간·휴일수당, 실업급여, 성과급, 통상임금, 소득세 등 각종 급여와 세금 계산기를 한 곳에서 쉽고 빠르게 이용하세요.",
    url: "https://workercalculator.damoapick.co.kr",
    siteName: "근로·급여 계산기 모음",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
};


import Link from "next/link";

const pages = [
  {
    href: "/salary",
    title: "연봉(월급) 계산기",
    desc: "연봉, 월급, 부양가족 등 입력 시 실수령액 자동 계산",
    icon: "💰",
  },
  {
    href: "/hourly",
    title: "시급 계산기",
    desc: "근무시간, 시급 입력 시 월급, 연봉, 주휴수당 자동 계산",
    icon: "⏱️",
  },
  {
    href: "/weekly-bonus",
    title: "주휴수당 계산기",
    desc: "근무일수, 근무시간 입력 시 주휴수당 자동 계산",
    icon: "📆",
  },
  {
    href: "/annual-leave",
    title: "연차수당 계산기",
    desc: "근속기간, 연차일수 입력 시 연차수당 자동 계산",
    icon: "🌴",
  },
  {
  href: "/four-insurances",
  title: "4대보험 계산기",
  desc: "월급 입력 시 4대 보험료를 자동 계산",
  icon: "🛡️",
},
  {
    href: "/retirement",
    title: "퇴직금 계산기",
    desc: "근속기간, 평균임금 등 입력 시 퇴직금 자동 계산",
    icon: "🏦",
  },
  {
  href: "/retirementpension",
  title: "퇴직연금 계산기",
  desc: "퇴직 전 3개월 임금, 재직일수 등 입력 시 퇴직연금(퇴직금) 자동 계산",
  icon: "🏆",
},
  {
    href: "/ordinary",
    title: "통상임금 계산기",
    desc: "기본급, 각종 수당 입력 시 통상임금 자동 계산",
    icon: "📊",
  },
  {
    href: "/overtime",
    title: "연장/야간/휴일수당 계산기",
    desc: "근무시간, 시급 등 입력 시 각종 수당 자동 계산",
    icon: "⏰",
  },
  {
    href: "/unemployment",
    title: "실업급여 계산기",
    desc: "근속기간, 이직사유 등 입력 시 실업급여 자동 계산",
    icon: "🧳",
  },
  {
  href: "/performancepay",
  title: "성과급 계산기",
  desc: "기준급·지급률 입력 시 세전·세후 성과급 자동 계산",
  icon: "💰",
}
,
  {
    href: "/income-tax",
    title: "근로소득세 계산기",
    desc: "월급, 연봉 등 입력 시 원천징수 근로소득세 계산",
    icon: "🧾",
  },
  {
    href: "/retirement-tax",
    title: "퇴직소득세 계산기",
    desc: "퇴직금, 근속연수 등 입력 시 퇴직소득세 자동 계산",
    icon: "📑",
  },
  {
    href: "/maternity-leave",
    title: "출산휴가 급여 계산기",
    desc: "출산휴가 기간, 월급 등 입력 시 출산휴가 급여 자동 계산",
    icon: "🤱",
  },
  {
    href: "/parental-leave",
    title: "육아휴직 급여 계산기",
    desc: "육아휴직 기간, 월급 등 입력 시 육아휴직 급여 자동 계산",
    icon: "🍼",
  },
];
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* SEO: h1, 소개문구, 신뢰 강조 */}
      <section className="max-w-4xl mx-auto text-center mb-10 px-4">
        <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 mb-6">
  대한민국 근로자와 사업자를 위한 <span className="text-blue-700"><br />급여·근로·노무 계산기 모음</span>
</h1>
<p className="text-lg text-gray-700 mt-4">
  연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직, 연장·야간·휴일수당, 실업급여, 성과급, 통상임금, 소득세 등 각종 급여와 세금 계산기를 한 곳에서 쉽고 빠르게 이용하세요.<br />
  <br className="mt-4" />모든 계산기는 2025년 기준 최신 데이터와 최신 법령·실무 기준을 반영한 신뢰할 수 있는 계산기 입니다.
</p>
      </section>

      {/* 계산기 전체 목록 그리드 */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl my-10">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="block bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-100 hover:border-blue-500"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{page.icon}</span>
              <h2 className="text-xl font-bold text-gray-900">{page.title}</h2>
            </div>
            <p className="text-gray-500">{page.desc}</p>
          </Link>
        ))}
      </section>

      <footer className="mt-10 text-gray-400 text-sm">
        © 2025 근로·급여 계산기 | 최신 법령 반영 | 문의: diekgg@naver.com
      </footer>
    </main>
  );
}

