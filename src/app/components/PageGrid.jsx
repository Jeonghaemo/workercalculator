import Link from "next/link";

const pages = [
  {
    href: "/salary",
    title: "연봉(월급) 실수령액 계산기",
    desc: "연봉, 월급, 부양가족, 비과세액 등 입력 시 실수령액 자동 계산",
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
    title: "연장/야근/휴일수당 계산기",
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

export default function PageGrid() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto my-10">
      {pages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className="block bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-100 hover:border-blue-500"
        >
          {/* 아이콘과 타이틀을 한 줄에 flex로 배치 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{page.icon}</span>
            <h2 className="text-xl font-bold text-gray-900">{page.title}</h2>
          </div>
          <p className="text-gray-500">{page.desc}</p>
        </Link>
      ))}
    </div>
  );
}


