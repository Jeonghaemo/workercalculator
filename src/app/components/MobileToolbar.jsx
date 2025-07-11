import Link from "next/link";

const mainTools = [
  { href: "/salary", icon: "💰", label: "연봉" },
  { href: "/hourly", icon: "⏱️", label: "시급" },
  { href: "/retirement", icon: "🏦", label: "퇴직금" },
  { href: "/unemployment", icon: "🧳", label: "실업급여" },
  { href: "/weekly-bonus", icon: "📆", label: "주휴" },
  { href: "/four-insurances", icon: "🛡️", label: "4대보험" },
  { href: "/retirementpension", icon: "🏆", label: "퇴직연금" },
  { href: "/ordinary", icon: "📊", label: "통상임금" },
  { href: "/annual-leave", icon: "🌴", label: "연차수당" },
  { href: "/overtime", icon: "⏰", label: "야간/휴일" },
  { href: "/performancepay", icon: "💰", label: "성과급" },
  { href: "/income-tax", icon: "🧾", label: "근로소득" },
  { href: "/retirement-tax", icon: "📑", label: "퇴직소득" },
  { href: "/maternity-leave", icon: "🤱", label: "출산휴가" },
  { href: "/parental-leave", icon: "🍼", label: "육아휴직" },
];

export default function MobileToolbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg py-1 lg:hidden">
      <div className="overflow-x-auto">
        <div className="flex flex-nowrap gap-1 px-2 whitespace-nowrap">
          {mainTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex flex-col items-center justify-center min-w-[64px] px-2 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <span className="text-xl">{tool.icon}</span>
              <span className="text-xs font-bold">{tool.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
