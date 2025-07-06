// app/page.js
export const metadata = {
  title: "근로·급여 계산기 모음",
  description: "연봉, 시급, 주휴수당, 퇴직금, 출산휴가·육아휴직 등 각종 급여와 세금 계산기를 한 곳에서 쉽게 이용하세요.",
};
import Link from "next/link";

const pages = [
  {
    href: "/salary",
    title: "연봉(월급) 실수령액 계산기",
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
      <h1 className="text-3xl font-bold mb-6">근로·급여 계산기 모음</h1>
      <p className="mb-8 text-gray-600">필요한 계산기를 선택하세요.</p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl my-10">
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
      </div>
      <footer className="mt-10 text-gray-400 text-sm">
        © 2025 근로·급여 계산기
      </footer>
    </main>
  );
}

