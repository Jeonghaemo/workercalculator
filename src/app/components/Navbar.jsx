import Link from "next/link";

const pages = [
  { href: "/salary", title: "연봉 계산", icon: "💰" },
  { href: "/hourly", title: "시급 계산", icon: "⏱️" },
  { href: "/weekly-bonus", title: "주휴수당", icon: "📆" },
  { href: "/annual-leave", title: "연차수당", icon: "🌴" },
  { href: "/four-insurances", title: "4대 보험", icon: "🛡️" },
  { href: "/retirement", title: "퇴직금", icon: "🏦" },
  { href: "/retirementpension", title: "퇴직연금", icon: "🏆" },
  { href: "/ordinary", title: "통상임금", icon: "📊" },
  { href: "/overtime", title: "야간/휴일", icon: "⏰" },
  { href: "/unemployment", title: "실업급여", icon: "🧳" },
  { href: "/performancepay", title: "성과급", icon: "💰" },
  { href: "/income-tax", title: "근로소득", icon: "🧾" },
  { href: "/retirement-tax", title: "퇴직소득", icon: "📑" },
  { href: "/maternity-leave", title: "출산휴가", icon: "🤱" },
  { href: "/parental-leave", title: "육아휴직", icon: "🍼" },
];

// PC 버전: 2줄 네비게이션 (lg 이상에서만 보임)
export function NavbarDesktop() {
  return (
    <nav className="hidden lg:block w-full bg-white border-b border-gray-200 py-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-8 gap-y-0 gap-x-2">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="
                flex flex-col items-center justify-center
                py-2 rounded-lg hover:bg-blue-50 transition
                group
              "
            >
              <span className="text-xl mb-1">{page.icon}</span>
              <span className="text-base font-bold text-gray-800 group-hover:text-blue-700">
                {page.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

// 모바일 버전: 가로 스크롤 네비게이션 (lg 미만에서만 보임)
export function NavbarMobile() {
  return (
    <nav className="block lg:hidden w-full bg-white border-b border-gray-200 py-2">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap gap-2 px-2 whitespace-nowrap">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="
                flex flex-col items-center justify-center
                min-w-[72px] px-2 py-1 rounded-lg
                hover:bg-blue-50 transition
                group
              "
            >
              <span className="text-lg mb-0.5">{page.icon}</span>
              <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700">
                {page.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

// 통합 내보내기
export default function Navbar() {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
    </>
  );
}

const mainTools = [
  { href: "/salary", icon: "💰", label: "연봉" },
  { href: "/hourly", icon: "⏱️", label: "시급" },
  { href: "/weekly-bonus", icon: "📆", label: "주휴" },
  { href: "/four-insurances", icon: "🛡️", label: "4대보험" },
  { href: "/retirement", icon: "🏦", label: "퇴직금" },
];





