"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 근로소득세 누진세율표 (2025년 기준)
const TAX_TABLE = [
  { std: 0, rate: 0.06, minus: 0 },
  { std: 14000000, rate: 0.15, minus: 1260000 },
  { std: 50000000, rate: 0.24, minus: 5760000 },
  { std: 88000000, rate: 0.35, minus: 15440000 },
  { std: 150000000, rate: 0.38, minus: 19940000 },
  { std: 300000000, rate: 0.40, minus: 25940000 },
  { std: 500000000, rate: 0.42, minus: 35940000 },
  { std: 1000000000, rate: 0.45, minus: 65400000 },
];

// 근로소득공제 (간이 공식)
function getEarnedIncomeDeduction(total) {
  if (total <= 8000000) return total * 0.8;
  if (total <= 70000000) return 6400000 + (total - 8000000) * 0.5;
  if (total <= 120000000) return 32400000 + (total - 70000000) * 0.15;
  if (total <= 150000000) return 39900000 + (total - 120000000) * 0.05;
  return 41400000 + (total - 150000000) * 0.02;
}

// 누진세 계산
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
      <label className="w-48 shrink-0 flex items-center text-gray-700 font-medium whitespace-nowrap">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex-1 flex items-center gap-2">{children}</div>
    </div>
  );
}

export default function IncomeTaxCalculator() {
  const [mode, setMode] = useState("annual");
  const [salary, setSalary] = useState("20000000");
  const [taxFree, setTaxFree] = useState("200000");
  const [family, setFamily] = useState(1);
  const [children, setChildren] = useState(0);
  const [result, setResult] = useState(null);

  // 입력값 처리
  const handleSalaryChange = (e) => {
    setSalary(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleTaxFreeChange = (e) => {
    setTaxFree(e.target.value.replace(/[^0-9]/g, ""));
  };

  // 계산
  const handleCalc = () => {
    const salaryNum = Number(salary);
    const taxFreeNum = Number(taxFree);
    let monthly = mode === "annual" ? Math.round(salaryNum / 12) : salaryNum;
    const annualIncome = monthly * 12;

    // 비과세 제외
    const taxableMonthly = Math.max(0, monthly - taxFreeNum);

    // 근로소득공제(연)
    const earnedDeduct = getEarnedIncomeDeduction(annualIncome);

    // 인적공제: 본인 포함 가족 1인당 150만원 + 8~20세 자녀 1인당 50만원 (연)
    const personalDeduct = family * 1500000 + children * 500000;

    // 과세표준
    const taxBase = Math.max(annualIncome - earnedDeduct - personalDeduct, 0);

    // 연간 근로소득세
    const annualTax = calcTax(taxBase);

    // 월 근로소득세
    const monthlyTax = Math.floor(annualTax / 12);

    // 월 지방소득세(근로소득세의 10%)
    const localTax = Math.floor(monthlyTax * 0.1);

    // 합계
    const totalTax = monthlyTax + localTax;

    setResult({
      taxableMonthly,
      monthlyTax,
      localTax,
      totalTax,
      monthly,
      annualGross: annualIncome,
      annualNet: (monthly - totalTax) * 12,
    });
  };

  // 증감 버튼
  const inc = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) + 1));
  const dec = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) - 1));

  // 리셋
  const reset = () => {
    setSalary("20000000");
    setTaxFree("200000");
    setFamily(1);
    setChildren(0);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        근로소득세 계산기
      </h1>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>

          {/* 1. 연봉/월급 선택 */}
          <InputRow
            label="연봉/월급 선택"
            tooltip={`연봉 또는 월급 중 입력할 급여 단위를 선택하세요.\n연봉 입력 시 12로 나눠 월급을 계산합니다.`}
          >
            <button
              onClick={() => setMode("annual")}
              className={`px-6 py-2 rounded border ${
                mode === "annual" ? "bg-blue-600 text-white border-blue-600" : "bg-white"
              }`}
            >
              연봉
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`px-6 py-2 rounded border ${
                mode === "monthly" ? "bg-blue-600 text-white border-blue-600" : "bg-white"
              }`}
            >
              월급
            </button>
          </InputRow>

          {/* 2. 연봉/월급 입력 */}
          <InputRow
            label={mode === "annual" ? "연봉" : "월급"}
            tooltip={`세전 금액을 입력하세요.\n(예: 연봉 2천만원, 월급 200만원 등)`}
          >
            <input
              type="text"
              value={salary}
              onChange={handleSalaryChange}
              className="w-46 border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="20000000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {salary && (
            <div style={{ color: "#3b82f6", fontWeight: "bold", textAlign: "right", marginBottom: 8 }}>
              입력값: {addComma(salary)} 원
            </div>
          )}

          {/* 3. 비과세액 */}
          <InputRow
            label="비과세액(식대포함)"
            tooltip={`비과세액은 소득세·4대보험 등 세금이 부과되지 않는 금액입니다.\n식대, 자가운전보조금 등 포함 가능 (기본값 20만원).`}
          >
            <input
              type="text"
              value={taxFree}
              onChange={handleTaxFreeChange}
              className="w-40 border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="200000"
            />
            <span className="text-gray-500">원</span>
            <span className="ml-2 text-blue-600 text-sm">(기본값 20만원)</span>
          </InputRow>

          {/* 4. 부양가족수 */}
          <InputRow
            label="부양가족수(본인포함)"
            tooltip={`소득세 공제에 반영되는 가족 수입니다.\n본인 포함, 배우자, 20세 이하 자녀, 60세 이상 부모 등.`}
          >
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={dec(setFamily, family, 1)}
              aria-label="감소"
            >−</button>
            <input
              type="text"
              value={family}
              readOnly
              className="w-16 border rounded px-2 py-2 text-center bg-gray-50"
            />
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={inc(setFamily, family, 1)}
              aria-label="증가"
            >+</button>
            <span className="text-gray-500">명</span>
          </InputRow>

          {/* 5. 8세~20세 자녀수 */}
          <InputRow
            label="8세~20세 자녀수"
            tooltip={`소득세 추가 공제 대상인 8세~20세 자녀 수를 입력하세요.`}
          >
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={dec(setChildren, children, 0)}
              aria-label="감소"
            >−</button>
            <input
              type="text"
              value={children}
              readOnly
              className="w-16 border rounded px-2 py-2 text-center bg-gray-50"
            />
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={inc(setChildren, children, 0)}
              aria-label="증가"
            >+</button>
            <span className="text-gray-500">명</span>
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
          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>근로소득세 기준액(월)</span>
                <span className="font-semibold text-red-600">{addComma(result.taxableMonthly)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>근로소득세</span>
                <span className="font-semibold">{addComma(result.monthlyTax)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>지방소득세</span>
                <span className="font-semibold">{addComma(result.localTax)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">합계</span>
                <span className="font-bold text-blue-700">{addComma(result.totalTax)} 원</span>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 mt-8 flex flex-col items-center">
                <span className="text-gray-700 mb-2">월 실수령액(예상)</span>
                <span className="text-3xl font-bold text-blue-700">
                  {addComma(result.monthly - result.totalTax)} 원
                </span>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">세전 연봉</span>
                  <span className="font-semibold">{addComma(result.annualGross)} 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">세후 연봉</span>
                  <span className="font-bold text-blue-700">{addComma(result.annualNet)} 원</span>
                </div>
              </div>
            </div>
          )}
          {!result && (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <PageGrid />
    </main>
  );
}



