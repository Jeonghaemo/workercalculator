"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마 함수
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 근속 개월 수 계산 (입사일, 퇴사일)
function calcMonthsDiff(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const years = e.getFullYear() - s.getFullYear();
  const months = e.getMonth() - s.getMonth();
  const days = e.getDate() - s.getDate();
  let totalMonths = years * 12 + months;
  if (days >= 15) totalMonths += 1; // 15일 이상이면 한달 추가
  return totalMonths > 0 ? totalMonths : 0;
}

// 근속연수공제 계산
function calcServiceDeduct(years) {
  if (years <= 5) return 1000000 * years;
  if (years <= 10) return 5000000 + 2000000 * (years - 5);
  if (years <= 20) return 15000000 + 2500000 * (years - 10);
  return 40000000 + 3000000 * (years - 20);
}

// 차등공제 계산
function calcDiffDeduct(convertedSalary) {
  if (convertedSalary <= 8000000) return convertedSalary;
  if (convertedSalary <= 70000000) return 8000000 + (convertedSalary - 8000000) * 0.6;
  if (convertedSalary <= 100000000) return 45200000 + (convertedSalary - 70000000) * 0.55;
  if (convertedSalary <= 300000000) return 61700000 + (convertedSalary - 100000000) * 0.45;
  return 151700000 + (convertedSalary - 300000000) * 0.35;
}

const TAX_TABLE = [
  { std: 0, rate: 0.06, minus: 0 },
  { std: 14000000, rate: 0.15, minus: 1260000 },
  { std: 50000000, rate: 0.24, minus: 5760000 },
  { std: 150000000, rate: 0.35, minus: 15440000 },
  { std: 300000000, rate: 0.38, minus: 19940000 },
  { std: 500000000, rate: 0.40, minus: 25940000 },
  { std: 1000000000, rate: 0.42, minus: 35940000 },
  { std: 2000000000, rate: 0.45, minus: 65400000 },
];

// 세금 계산
function calcTax(taxBase) {
  let tax = 0;
  for (let i = TAX_TABLE.length - 1; i >= 0; i--) {
    if (taxBase > TAX_TABLE[i].std) {
      tax = taxBase * TAX_TABLE[i].rate - TAX_TABLE[i].minus;
      break;
    }
  }
  return tax > 0 ? Math.floor(tax) : 0;
}

// 툴팁 컴포넌트
function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative ml-1 inline-block align-middle">
      <button
        type="button"
        className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs font-bold leading-none"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        tabIndex={-1}
        aria-label="설명 툴팁"
      >
        ?
      </button>
      {show && (
        <span className="absolute z-10 left-6 top-0 w-80 bg-white text-gray-900 text-base rounded px-4 py-3 shadow-xl border border-gray-300 whitespace-pre-line">
          {text}
        </span>
      )}
    </span>
  );
}

// InputRow 컴포넌트
function InputRow({ label, tooltip, children }) {
  return (
    <div className="flex items-center gap-3 mb-4 min-h-[48px]">
      <label className="w-48 shrink-0 flex items-center text-gray-700 font-medium">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex-1 flex items-center gap-2">{children}</div>
    </div>
  );
}

export default function RetirementTaxCalculator() {
  const [joinDate, setJoinDate] = useState("");
  const [retireDate, setRetireDate] = useState("");
  const [retirementPay, setRetirementPay] = useState("");
  const [nonTaxIncome, setNonTaxIncome] = useState("0");
  const [result, setResult] = useState(null);

  // 숫자만 입력
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!joinDate || !retireDate || !retirementPay) {
      setResult(null);
      return;
    }
    const totalMonths = calcMonthsDiff(joinDate, retireDate);
    const years = Math.floor(totalMonths / 12);
    if (years <= 0) {
      setResult(null);
      return;
    }
    const pay = Number(retirementPay);
    const nonTax = Number(nonTaxIncome);
    const taxablePay = Math.max(pay - nonTax, 0);
    const serviceDeduct = calcServiceDeduct(years);
    const convertedSalary = ((taxablePay - serviceDeduct) / years) * 12;
    const diffDeduct = calcDiffDeduct(convertedSalary);
    const taxBase = Math.max(convertedSalary - diffDeduct, 0);
    const calculatedTax = calcTax(taxBase);
    const finalTax = Math.floor((calculatedTax * years) / 12);

    setResult({
      years,
      taxablePay,
      serviceDeduct,
      convertedSalary,
      diffDeduct,
      taxBase,
      calculatedTax,
      finalTax,
    });
  };

  const reset = () => {
    setJoinDate("");
    setRetireDate("");
    setRetirementPay("");
    setNonTaxIncome("0");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 max-w-[1200px] mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">퇴직소득세 계산기</h1>
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow label="입사일" tooltip="근무를 시작한 날짜를 선택하세요.">
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="w-40 border rounded px-2 py-2"
              max={new Date().toISOString().split("T")[0]}
            />
          </InputRow>
          <InputRow label="퇴사일" tooltip="퇴직일을 선택하세요.">
            <input
              type="date"
              value={retireDate}
              onChange={(e) => setRetireDate(e.target.value)}
              className="w-40 border rounded px-2 py-2"
              max={new Date().toISOString().split("T")[0]}
              min={joinDate || undefined}
            />
          </InputRow>
          <InputRow label="퇴직금액(세전)" tooltip="퇴직 시 받은 총 금액을 입력하세요.">
            <input
              type="text"
              value={retirementPay}
              onChange={handleNum(setRetirementPay)}
              className="w-full border rounded px-2 py-2 text-right"
              placeholder="예: 100,000,000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {retirementPay && (
            <div className="text-blue-600 font-bold text-right mb-2">
              입력값: {addComma(retirementPay)} 원
            </div>
          )}
          <InputRow label="비과세 소득액" tooltip="퇴직금 중 비과세되는 금액을 입력하세요. (예: 장해보상금)">
            <input
              type="text"
              value={nonTaxIncome}
              onChange={handleNum(setNonTaxIncome)}
              className="w-full border rounded px-2 py-2 text-right"
              placeholder="0"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          <div className="flex gap-2 mt-8">
            <button
              onClick={handleCalc}
              className="flex-1 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              계산하기
            </button>
            <button
              onClick={reset}
              className="flex-1 py-3 rounded border font-semibold"
            >
              초기화
            </button>
          </div>
        </section>

        {/* 우측 결과 */}
        <section className="w-full lg:w-1/2 pt-10 lg:pt-0">
          <h3 className="font-semibold text-lg mb-6">계산 결과</h3>
          {result ? (
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-semibold">근속연수</td>
                  <td className="py-2 text-right">{addComma(result.years)} 년</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">퇴직소득금액</td>
                  <td className="py-2 text-right">{addComma(result.taxablePay)} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">근속연수공제</td>
                  <td className="py-2 text-right">{addComma(result.serviceDeduct)} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">환산급여</td>
                  <td className="py-2 text-right">{addComma(Math.round(result.convertedSalary))} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">차등공제</td>
                  <td className="py-2 text-right">{addComma(Math.round(result.diffDeduct))} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">과세표준</td>
                  <td className="py-2 text-right">{addComma(Math.round(result.taxBase))} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">산출세액</td>
                  <td className="py-2 text-right">{addComma(result.calculatedTax)} 원</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">최종 퇴직소득세</td>
                  <td className="py-2 text-right font-bold text-blue-700">{addComma(result.finalTax)} 원</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <PageGrid />
    </main>
  );
}
