"use client";
import React, { useRef, useState, useEffect } from "react";
import PageGrid from "../components/PageGrid";
import Script from "next/script";
import Link from "next/link";
import AdsenseBox from "../components/AdsenseBox";
import MobileToolbar from "../components/MobileToolbar";


const MIN_WAGE = 10030;
const rows = Array.from({ length: 52 }, (_, i) => {
  const hour = i + 1;
  let weekHoliday = 0;
  if (hour >= 15) weekHoliday = Math.round((hour / 40) * 8 * 10) / 10;
  const monthHour = Math.round((hour + weekHoliday) * 4.345);
  const monthly = Math.round(monthHour * MIN_WAGE);
  return {
    weekHour: hour,
    weekHoliday,
    monthHour,
    monthly: monthly.toLocaleString() + "원",
    annual: (monthly * 12).toLocaleString() + "원",
  };
});

export default function MinWageCalculator() {
  const rowRefs = useRef([]);
  const [w, setW] = useState("");
  const [m, setM] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    let idx = null;
    if (w) idx = rows.findIndex(r => String(r.weekHour) === w);
    if (m) {
      const mi = rows.findIndex(r => String(r.monthHour) === m);
      if (mi !== -1) idx = mi;
    }
    setActive(idx >= 0 ? idx : null);
    if (idx >= 0 && rowRefs.current[idx]) {
      rowRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [w, m]);

  const mergedSpan = 14;
  // 소개 박스 컴포넌트
function IntroBox() {
  return (
    <div
      className="
        max-w-[1200px]
        mx-auto
        mt-6
        mb-8
        p-5
        bg-gray-100
        border border-gray-300
        rounded-md
        text-gray-800
        text-base
        leading-relaxed
        text-left
      "
      role="note"
    >
     <ul className="list-disc list-inside space-y-1">
        <li>
          <span className="font-bold">최저시급 (월급, 연봉) 계산기</span>로 <span className="font-bold">주 근로시간</span>과 <span className="font-bold">한달 근로시간</span>을 입력해 예상 월급여와 연봉을 빠르게 확인하세요.
        </li>
        <li>
          주휴수당 포함 계산 방식을 적용해 실질적인 급여 수준을 확인할 수 있습니다.
        </li>
        <li>
          <span className="font-bold">시급</span>을 기준으로 계산된 월급, 연봉은{' '}
          <Link
            href="https://workercalculator.damoapick.co.kr/salary"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            시급 계산기
          </Link>
          를 이용해보세요.
        </li>
      </ul>
       <li>
          <span className="font-bold"> 2025년도 최저임금은 시급 10,030원</span>{' '}입니다.
        </li>
    </div>
  );
};

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        최저시급 (월급, 연봉) 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
        {/* 입력폼 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="w-24 h-9 flex items-center justify-center border border-gray-300 rounded bg-white text-base font-medium">
            2025년
          </div>
          <input
            type="number"
            placeholder="주 근로시간"
            value={w}
            min={1}
            max={52}
            onChange={e => { setW(e.target.value.replace(/\D/g, "")); setM(""); }}
            className="w-40 h-9 px-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="한달 근로시간"
            value={m}
            min={1}
            max={250}
            onChange={e => { setM(e.target.value.replace(/\D/g, "")); setW(""); }}
            className="w-40 h-9 px-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {/* table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 text-sm">
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <thead className="bg-gray-100">
              <tr>
                {[
                  "주 근로 시간",
                  "=주근로시간/40×8",
                  "=(주근로+주휴)×4.345",
                  "=한달근무×10,030원",
                  "=월급×12개월",
                ].map((t, i) => (
                  <th
                    key={i}
                    className={
                      `border border-gray-200 px-2 py-3 text-center font-semibold ${
                        i === 0 ? "text-gray-700" : "text-red-600"
                      }`
                    }
                  >
                    {t}
                  </th>
                ))}
              </tr>
              <tr className="bg-white">
                {[
                  "주 근로 시간",
                  "주휴시간",
                  "한달 근무시간",
                  "예상 월 급여",
                  "예상 연봉",
                ].map((t, i) => (
                  <th
                    key={i}
                    className="border border-gray-200 px-2 py-2 text-center font-medium text-gray-800"
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) =>
                r.weekHour === 1 ? (
                  <tr
                    key={i}
                    ref={el => (rowRefs.current[i] = el)}
                    className={active === 0 ? "bg-blue-50" : ""}
                  >
                    <td className={`border border-gray-200 px-2 py-2 text-center font-medium ${String(w) === String(r.weekHour) ? "bg-blue-50" : ""}`}>{r.weekHour}</td>
                    <td rowSpan={mergedSpan} className="border border-gray-200 px-2 py-2 text-center text-gray-600">
                      주 15시간 미만은 주휴시간<br/>발생하지 않음
                    </td>
                    <td className={`border border-gray-200 px-2 py-2 text-center ${String(m) === String(r.monthHour) ? "bg-blue-50" : ""}`}>{r.monthHour}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{r.monthly}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{r.annual}</td>
                  </tr>
                ) : (
                  <tr
                    key={i}
                    ref={el => (rowRefs.current[i] = el)}
                    className={active === i ? "bg-blue-50" : ""}
                  >
                    <td className={`border border-gray-200 px-2 py-2 text-center font-medium ${String(w) === String(r.weekHour) ? "bg-blue-50" : ""}`}>{r.weekHour}</td>
                    {r.weekHour < 15 ? null : (
                      <td className="border border-gray-200 px-2 py-2 text-center">{r.weekHoliday}</td>
                    )}
                    <td className={`border border-gray-200 px-2 py-2 text-center ${String(m) === String(r.monthHour) ? "bg-blue-50" : ""}`}>{r.monthHour}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{r.monthly}</td>
                    <td className="border border-gray-200 px-2 py-2 text-center">{r.annual}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}

