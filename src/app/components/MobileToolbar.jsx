// components/MobileToolbar.js
import Link from "next/link";

const mainTools = [
  { href: "/salary", icon: "💰", label: "연봉" },
  { href: "/hourly", icon: "⏱️", label: "시급" },
  { href: "/weekly-bonus", icon: "📆", label: "주휴" },
  { href: "/four-insurances", icon: "🛡️", label: "4대보험" },
  { href: "/retirement", icon: "🏦", label: "퇴직금" },
];

export default function MobileToolbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center py-1 lg:hidden">
      {mainTools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="flex flex-col items-center justify-center px-2 py-1 text-gray-600 hover:text-blue-600 transition"
        >
          <span className="text-xl">{tool.icon}</span>
          <span className="text-xs font-bold">{tool.label}</span>
        </Link>
      ))}
    </nav>
  );
}
