"use client";
import { useState } from "react";
import Link from "next/link";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마 함수
const addComma = (value) => {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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

// 공제 계산 함수
function calcDeductions({ monthly, taxFree, family, children }) {
  const taxable = Math.max(0, monthly - taxFree);
  const pensionBase = Math.min(Math.max(taxable, 370000), 5900000);
  const pension = Math.round(pensionBase * 0.045);
  const healthBase = Math.min(Math.max(taxable, 279266), 110332300);
  const health = Math.round(healthBase * 0.03545);
  const care = Math.round(health * 0.1281);
  const employment = Math.round(taxable * 0.009);
  let incomeTax = 0;
  if (taxable > 1500000) incomeTax = Math.round(taxable * 0.01);
  if (taxable > 3000000) incomeTax = Math.round(taxable * 0.02);
  if (taxable > 5000000) incomeTax = Math.round(taxable * 0.03);
  incomeTax = Math.max(0, incomeTax - (family - 1) * 5000 - children * 2000);
  const localTax = Math.round(incomeTax * 0.1);
  const total = pension + health + care + employment + incomeTax + localTax;
  return { pension, health, care, employment, incomeTax, localTax, total, taxable };
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

export default function Salary() {
  const [mode, setMode] = useState("annual");
  const [salary, setSalary] = useState("20000000");
  const [taxFree, setTaxFree] = useState("200000");
  const [family, setFamily] = useState(1);
  const [children, setChildren] = useState(0);
  const [result, setResult] = useState(null);

  // 입력창에는 콤마 없이 숫자만
  const handleSalaryChange = (e) => {
    setSalary(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleTaxFreeChange = (e) => {
    setTaxFree(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    const salaryNum = Number(salary);
    const taxFreeNum = Number(taxFree);
    let monthly = mode === "annual" ? Math.round(salaryNum / 12) : salaryNum;
    const deductions = calcDeductions({
      monthly,
      taxFree: taxFreeNum,
      family: Number(family),
      children: Number(children),
    });
    setResult({ ...deductions, monthly });
  };

  const inc = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) + 1));
  const dec = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) - 1));

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        연봉(월급) 실수령액 계산기
      </h1>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">현재(희망)연봉, 월급 입력</h3>

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
          <div className="flex gap-2 mt-8">
            <button
              onClick={handleCalc}
              className="flex-1 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              계산하기
            </button>
            <button
              onClick={() => {
                setSalary("20000000");
                setTaxFree("200000");
                setFamily(1);
                setChildren(0);
                setResult(null);
              }}
              className="flex-1 py-3 rounded border font-semibold"
            >
              초기화
            </button>
          </div>
        </section>

        {/* 우측 결과 */}
        <section className="w-full lg:w-1/2 pt-10 lg:pt-0">
          <h3 className="font-semibold text-lg mb-6">세금 공제한 월 실수령액</h3>
          {result && (
            <>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">예상 소득액(월)</span>
                <span className="font-semibold">{addComma(String(result.monthly))} 원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">공제액 합계</span>
                <span className="font-semibold">{addComma(String(result.total))} 원</span>
              </div>
              <ul className="mb-4">
                <li className="flex justify-between">
                  <span>국민연금</span>
                  <span>{addComma(String(result.pension))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>건강보험</span>
                  <span>{addComma(String(result.health))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>장기요양</span>
                  <span>{addComma(String(result.care))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>고용보험</span>
                  <span>{addComma(String(result.employment))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>소득세</span>
                  <span>{addComma(String(result.incomeTax))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>지방소득세</span>
                  <span>{addComma(String(result.localTax))} 원</span>
                </li>
              </ul>
              <div className="bg-blue-50 rounded-lg p-6 mt-8 flex flex-col items-center">
                <span className="text-gray-700 mb-2">예상 실수령액(월)</span>
                <span className="text-3xl font-bold text-blue-700">
                  {addComma(String(result.monthly - result.total))}원
                </span>
              </div>
            </>
          )}
          {!result && (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      {/* 광고/기타 */}
      <PageGrid />
    </main>
  );
}


