"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import PageGrid from "../components/PageGrid";
import Script from "next/script";
import AdsenseBox from "../components/AdsenseBox";

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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4 min-h-[48px] w-full">
      <label className="w-full sm:w-48 shrink-0 flex items-center text-gray-700 font-medium">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex-1 flex items-center gap-2 w-full">{children}</div>
    </div>
  );
}

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
          <span className="font-bold">연봉(월급) 실수령액 계산기</span>를 이용해 <span className="font-bold">내 월급 실수령액</span>을 확인해보세요.
        </li>
        <li>
          국민연금, 건강보험, 장기요양, 고용보험, 소득세, 지방소득세 등 <span className="font-bold">주요 공제액</span>을 반영합니다.
        </li>
        <li>
          <span className="font-bold">실제 지급액</span>은 사업장, 가족관계, 비과세 항목 등에 따라 달라질 수 있습니다.
        </li>
        <li>
          연말정산 및 추가 세액공제는 별도 적용될 수 있습니다.
        </li>
      </ul>
    </div>
  );
}

function CalculationMethodBox() {
  return (
    <div
      className="
        max-w-[1200px]
        mx-auto
        bg-blue-50
        border border-blue-300
        rounded-md
        p-6
        mb-10
        mt-8
        text-gray-800
        leading-relaxed
      "
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700">계산기 사용방법</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          <b>연봉/월급 선택:</b>
          <span className="ml-1">
            세전 연봉 또는 월급 중 입력할 단위를 선택하세요. 연봉을 입력하면 12로 나눠 월급을 자동 계산합니다.
          </span>
        </li>
        <li>
          <b>급여 입력:</b>
          <span className="ml-1">
            선택한 단위(연봉 또는 월급)에 맞는 세전 금액을 입력하세요. (예: 연봉 2,000만원, 월급 200만원)
          </span>
        </li>
        <li>
          <b>비과세액 입력:</b>
          <span className="ml-1">
            식대 등 세금이 부과되지 않는 비과세 금액을 입력하세요. (기본값 20만원, 필요시 조정)
          </span>
        </li>
        <li>
          <b>부양가족수(본인 포함):</b>
          <span className="ml-1">
            본인, 배우자, 20세 이하 자녀, 60세 이상 부모 등 소득세 공제 대상 가족 수를 입력하세요.
          </span>
        </li>
        <li>
          <b>8세~20세 자녀수:</b>
          <span className="ml-1">
            소득세 추가 공제 대상인 8세~20세 자녀 수를 입력하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 국민연금, 건강보험, 장기요양, 고용보험, 소득세, 지방소득세 등 공제액과 실수령액이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">연봉 실수령액 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>과세표준 산정:</b>
          <span className="ml-1">
            입력한 월급(또는 연봉/12)에서 비과세액을 차감한 금액을 기준으로 공제액을 계산합니다.<br />
            예시: 월급 2,000,000원, 비과세액 200,000원 → 과세표준 1,800,000원
          </span>
        </li>
        <li>
          <b>국민연금:</b>
          <span className="ml-1">
            과세표준(최소 370,000원, 최대 5,900,000원 범위 적용) × 4.5%<br />
            예시: 1,800,000 × 4.5% = 81,000원
          </span>
        </li>
        <li>
          <b>건강보험:</b>
          <span className="ml-1">
            과세표준(최소 279,266원, 최대 110,332,300원 범위 적용) × 3.545%<br />
            예시: 1,800,000 × 3.545% = 63,810원
          </span>
        </li>
        <li>
          <b>장기요양보험:</b>
          <span className="ml-1">
            건강보험료 × 12.81%<br />
            예시: 63,810 × 12.81% ≈ 8,176원
          </span>
        </li>
        <li>
          <b>고용보험:</b>
          <span className="ml-1">
            과세표준 × 0.9%<br />
            예시: 1,800,000 × 0.9% = 16,200원
          </span>
        </li>
        <li>
          <b>소득세(간이):</b>
          <span className="ml-1">
            과세표준 구간별로 1~3% 적용, 부양가족·자녀수에 따라 일부 공제<br />
            예시: 과세표준 1,800,000원 → 1% = 18,000원, 가족 3명(2명 추가) → 18,000 - 10,000 = 8,000원
          </span>
        </li>
        <li>
          <b>지방소득세:</b>
          <span className="ml-1">
            소득세의 10%<br />
            예시: 소득세 8,000원 × 10% = 800원
          </span>
        </li>
        <li>
          <b>실수령액 산정:</b>
          <span className="ml-1">
            월급(세전) - (공제액 합계) = 월 실수령액<br />
            예시: 2,000,000 - 169,986 = 1,830,014원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 본 계산기는 2025년 기준 공제율, 간이세액표를 참고하여 예시를 제공합니다.<br />
        ※ 실제 지급액은 사업장, 가족관계, 기타 공제항목에 따라 다를 수 있습니다.
      </div>
    </div>
  );
}

function SalaryFAQBox() {
  return (
    <div
      className="
        max-w-[1200px]
        mx-auto
        bg-blue-50
        border border-blue-300
        rounded-md
        p-6
        mb-10
        mt-8
        text-gray-800
        leading-relaxed
      "
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700">연봉 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 연봉 계산기에서 세전·세후 연봉은 무엇이 다른가요?</div>
          <div>
            <b>세전 연봉</b>은 4대보험, 소득세, 지방소득세 등 공제 전 금액이며, <b>세후 연봉</b>은 모든 공제액을 차감한 뒤 실제로 받는 <b>실수령액</b> 기준 연봉입니다. 2025년 기준, 세금과 4대보험 요율이 반영되어 계산됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 월급과 연봉의 관계는 어떻게 계산하나요?</div>
          <div>
            <b>연봉</b>은 월급(세전 기준) × 12개월(또는 13, 14개월 등 상여금 포함 지급 기준에 따라 다름)로 계산합니다. 월급에 상여금이 포함되어 있으면 연봉에 자동 반영됩니다. <b>월 실수령액</b>은 세후 월급을 의미합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 비과세액(식대 등)은 연봉 계산에 어떻게 반영되나요?</div>
          <div>
            <b>비과세액</b>은 소득세·4대보험 등에서 제외되는 금액입니다. 식대, 자가운전보조금 등 비과세 항목을 입력하면, 해당 금액만큼 세후 실수령액이 늘어납니다. 2025년 기준 월 20만원까지 비과세 식대가 인정됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 4대보험은 연봉 계산에 어떻게 적용되나요?</div>
          <div>
            <b>국민연금, 건강보험, 장기요양, 고용보험</b> 등 4대보험은 월급(세전)에서 각 보험별 요율을 곱해 산정하며, 연봉 계산 시 월별 공제액이 연간 합산되어 세후 연봉에 반영됩니다. 2025년 기준 요율이 적용됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 상여금(성과급)은 연봉에 포함되나요?</div>
          <div>
            <b>상여금</b>이 연봉에 포함되는지 여부는 회사 규정에 따라 다릅니다. 정기적으로 지급되는 상여금은 연봉에 포함되며, 별도 지급되는 성과급·인센티브는 연봉과 별개로 계산될 수 있습니다. 상여금이 연봉에 포함되면 월급에도 자동 반영됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 퇴직금은 연봉에 포함되나요?</div>
          <div>
            <b>퇴직금</b>은 법적으로 연봉과 별도로 산정·지급되며, 연봉 계산기에는 포함되지 않습니다. 단, 일부 회사는 연봉에 퇴직금을 포함해 표시하기도 하니, 실제 계약서를 반드시 확인하세요.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 2025년 연봉 계산기에서 달라진 점이 있나요?</div>
          <div>
            2025년 기준 <b>4대보험 요율</b>과 <b>소득세율</b>이 반영되어 있습니다. 비과세액 한도, 최저임금, 상여금 지급 기준 등도 최신 기준을 적용합니다. 매년 세법과 보험 요율이 바뀔 수 있으니 최신 정보를 확인하세요.
          </div>
        </div>
      </div>
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

  const resultRef = useRef(null); // 결과 스크롤용 ref

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
    // 세전/세후 연봉 추가
    const annualGross = monthly * 12;
    const annualNet = (monthly - deductions.total) * 12;
    setResult({ ...deductions, monthly, annualGross, annualNet });

    // 계산 후 모바일에서 결과로 스크롤
    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const inc = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) + 1));
  const dec = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) - 1));

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        연봉(월급) 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">현재(희망)연봉, 월급 입력</h3>
          <InputRow
            label="연봉/월급 선택"
            tooltip={`연봉 또는 월급 중 입력할 급여 단위를 선택하세요.\n연봉 입력 시 12로 나눠 월급을 계산합니다.`}
          >
            <button
              onClick={() => setMode("annual")}
              className={`px-6 py-2 rounded border ${mode === "annual" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
            >
              연봉
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`px-6 py-2 rounded border ${mode === "monthly" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
            >
              월급
            </button>
          </InputRow>
          <InputRow
            label={mode === "annual" ? "연봉" : "월급"}
            tooltip={`세전 금액을 입력하세요.\n(예: 연봉 2천만원, 월급 200만원 등)`}
          >
            <input
              type="text"
              value={salary}
              onChange={handleSalaryChange}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="20000000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {salary && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(salary)} 원
            </div>
          )}
          <InputRow
            label="비과세액(식대포함)"
            tooltip={`비과세액은 소득세·4대보험 등 세금이 부과되지 않는 금액입니다.\n식대, 자가운전보조금 등 포함 가능 (기본값 20만원).`}
          >
            <input
              type="text"
              value={taxFree}
              onChange={handleTaxFreeChange}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
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
              className="w-full max-w-[60px] border rounded px-2 py-2 text-center bg-gray-50"
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
              className="w-full max-w-[60px] border rounded px-2 py-2 text-center bg-gray-50"
            />
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={inc(setChildren, children, 0)}
              aria-label="증가"
            >+</button>
            <span className="text-gray-500">명</span>
          </InputRow>
          <div className="flex gap-2 mt-8 w-full">
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
        <section ref={resultRef} className="w-full lg:w-1/2 pt-10 lg:pt-0 min-w-0">
          <h3 className="font-semibold text-lg mb-6">계산 결과</h3>
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
              {/* 연봉 결과 추가 */}
              <div className="mt-8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">세전 연봉</span>
                  <span className="font-semibold">{addComma(String(result.annualGross))} 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">세후 연봉</span>
                  <span className="font-bold text-blue-700">{addComma(String(result.annualNet))} 원</span>
                </div>
              </div>
            </>
          )}
          {!result && (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <CalculationMethodBox />
      <SalaryFAQBox />
      <PageGrid />
    </main>
  );
}

