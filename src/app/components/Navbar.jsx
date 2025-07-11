import Link from "next/link";

const pages = [
  {
    href: "/salary",
    title: "연봉 계산",
    icon: "💰",
  },
  {
    href: "/hourly",
    title: "시급 계산",
    icon: "⏱️",
  },
  {
    href: "/weekly-bonus",
    title: "주휴수당",
    icon: "📆",
  },
  {
    href: "/annual-leave",
    title: "연차수당",
    icon: "🌴",
  },
  {
    href: "/four-insurances",
    title: "4대 보험",
    icon: "🛡️",
  },
  {
    href: "/retirement",
    title: "퇴직금",
    icon: "🏦",
  },
  {
    href: "/retirementpension",
    title: "퇴직연금",
    icon: "🏆",
  },
  {
    href: "/ordinary",
    title: "통상임금",
    icon: "📊",
  },
  {
    href: "/overtime",
    title: "야간/휴일",
    icon: "⏰",
  },
  {
    href: "/unemployment",
    title: "실업급여",
    icon: "🧳",
  },
  {
    href: "/performancepay",
    title: "성과급",
    icon: "💰",
  },
  {
    href: "/income-tax",
    title: "근로소득",
    icon: "🧾",
  },
  {
    href: "/retirement-tax",
    title: "퇴직소득",
    icon: "📑",
  },
  {
    href: "/maternity-leave",
    title: "출산휴가",
    icon: "🤱",
  },
  {
    href: "/parental-leave",
    title: "육아휴직",
    icon: "🍼",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 px-4 py-2">
        <div className="flex flex-wrap gap-1">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex items-center gap-1 px-3 py-1 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition text-sm font-medium"
            >
              <span>{page.icon}</span>
              <span className="font-bold">{page.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

