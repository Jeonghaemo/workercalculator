"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마
const addComma = (value) => (value || value === 0 ? Number(value).toLocaleString() : "");

// 2025년 4대 보험 요율 (예시, 실제 요율은 최신 공시 참고)
const RATES = {
  국민연금: { worker: 0.045, employer: 0.045 },
  건강보험: { worker: 0.03545, employer: 0.03545 },
  장기요양: { worker: 0.01389, employer: 0.01389 }, // 건강보험료의 13.89%
  고용보험: {
    "150미만": { worker: 0.009, employer: 0.009 },
    "150이상": { worker: 0.009, employer: 0.0135 },
    "1000미만": { worker: 0.009, employer: 0.0135 },
    "1000이상": { worker: 0.009, employer: 0.0165 },
  },
};

const COMPANY_OPTIONS = [
  { value: "150미만", label: "150인 미만 기업" },
  { value: "150이상", label: "150인 이상 (우선지원 대상기업)" },
  { value: "1000미만", label: "150인 이상 1,000인 미만 기업" },
  { value: "1000이상", label: "1,000인 이상 기업, 국가·지자체" },
];

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
          <b>월 급여 입력:</b>
          <span className="ml-1">
            세전 월급(기본급 등)을 입력하세요. (예: 2,000,000원)
          </span>
        </li>
        <li>
          <b>기업 규모 선택:</b>
          <span className="ml-1">
            근무 중인 사업장 규모에 맞게 선택하세요. 고용보험 요율이 달라집니다.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 4대 보험료 총액, 근로자/사업주 부담금이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">4대 보험 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>국민연금:</b>
          <span className="ml-1">
            월급 × 9% (근로자 4.5% + 사업주 4.5%)<br />
            예시: 월급 2,000,000원 → 2,000,000 × 9% = 180,000원<br />
            근로자 90,000원 / 사업주 90,000원
          </span>
        </li>
        <li>
          <b>건강보험:</b>
          <span className="ml-1">
            월급 × 7.09% (근로자 3.545% + 사업주 3.545%)<br />
            예시: 월급 2,000,000원 → 2,000,000 × 7.09% = 141,800원<br />
            근로자 70,900원 / 사업주 70,900원
          </span>
        </li>
        <li>
          <b>장기요양보험:</b>
          <span className="ml-1">
            건강보험료 × 12.95% (근로자 50% + 사업주 50%)<br />
            예시: 건강보험료 70,900원 → 70,900 × 12.95% ≈ 9,186원<br />
            근로자 4,593원 / 사업주 4,593원
          </span>
        </li>
        <li>
          <b>고용보험:</b>
          <span className="ml-1">
            월급 × 고용보험 요율(기업 규모별 상이, 예: 0.9% 근로자/사업주 각)<br />
            예시: 월급 2,000,000원 → 2,000,000 × 0.9% = 18,000원<br />
            근로자 18,000원 / 사업주 18,000원
          </span>
        </li>
        <li>
          <b>합계:</b>
          <span className="ml-1">
            각 항목별 근로자/사업주 부담금 합산<br />
            예시(근로자): 90,000 + 70,900 + 4,593 + 18,000 = 183,493원<br />
            예시(사업주): 90,000 + 70,900 + 4,593 + 18,000 = 183,493원<br />
            총액: 366,986원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 2025년 기준 요율 적용. 실제 산재보험은 업종별로 별도 산정.<br />
        ※ 국민연금·건강보험은 최저/최고 기준소득월액이 적용될 수 있습니다.<br />
        ※ 계산 결과는 참고용이며, 실지급액은 사업장/근로자 상황에 따라 달라질 수 있습니다.
      </div>
    </div>
  );
}



// 보험 계산 함수
function calcInsurances(salary, companyType) {
  const 국민연금 = salary * (RATES.국민연금.worker + RATES.국민연금.employer);
  const 국민연금_worker = salary * RATES.국민연금.worker;
  const 국민연금_employer = salary * RATES.국민연금.employer;

  const 건강보험 = salary * (RATES.건강보험.worker + RATES.건강보험.employer);
  const 건강보험_worker = salary * RATES.건강보험.worker;
  const 건강보험_employer = salary * RATES.건강보험.employer;

  // 장기요양은 건강보험료 산정 후 적용
  const 장기요양 = 건강보험 * (RATES.장기요양.worker + RATES.장기요양.employer);
  const 장기요양_worker = 건강보험_worker * RATES.장기요양.worker;
  const 장기요양_employer = 건강보험_employer * RATES.장기요양.employer;

  // 고용보험
  const 고용보험율 = RATES.고용보험[companyType];
  const 고용보험 = salary * (고용보험율.worker + 고용보험율.employer);
  const 고용보험_worker = salary * 고용보험율.worker;
  const 고용보험_employer = salary * 고용보험율.employer;

  // 합계
  const total = {
    total: 국민연금 + 건강보험 + 장기요양 + 고용보험,
    worker: 국민연금_worker + 건강보험_worker + 장기요양_worker + 고용보험_worker,
    employer: 국민연금_employer + 건강보험_employer + 장기요양_employer + 고용보험_employer,
  };

  return {
    국민연금: [국민연금, 국민연금_worker, 국민연금_employer],
    건강보험: [건강보험, 건강보험_worker, 건강보험_employer],
    장기요양: [장기요양, 장기요양_worker, 장기요양_employer],
    고용보험: [고용보험, 고용보험_worker, 고용보험_employer],
    합계: [total.total, total.worker, total.employer],
  };
}

export default function FourInsuranceCalculator() {
  const [salary, setSalary] = useState("");
  const [companyType, setCompanyType] = useState("150미만");
  const [result, setResult] = useState(null);

  // 입력 처리
  const handleSalary = (e) => setSalary(e.target.value.replace(/[^0-9]/g, ""));

  // 계산
  const handleCalc = () => {
    const monthly = Number(salary);
    if (!monthly || monthly < 1) {
      setResult(null);
      return;
    }
    setResult(calcInsurances(monthly, companyType));
  };

  const reset = () => {
    setSalary("");
    setCompanyType("150미만");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">4대 보험 계산기</h1>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
  <h3 className="font-semibold text-lg mb-6">급여 입력</h3>
  <InputRow
    label="월 급여"
    tooltip={`세전 월급(기본급 등)을 입력하세요.\n예: 2,000,000`}
  >
    <input
      type="text"
      value={salary}
      onChange={handleSalary}
      className="w-40 border rounded px-2 py-2 text-right"
      min={0}
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder="2,000,000"
    />
    <span className="text-gray-500">원</span>
  </InputRow>
  {salary && (
    <div
      style={{
        color: "#3b82f6",
        fontWeight: "bold",
        textAlign: "right",
        marginBottom: 8,
      }}
    >
      입력값: {addComma(Number(salary))} 원
    </div>
  )}

  <InputRow
    label="기업 규모"
    tooltip={`고용보험 요율은 사업장 규모에 따라 다릅니다.\n본인 사업장에 맞게 선택하세요.`}
  >
    <div className="flex flex-wrap gap-2">
      {COMPANY_OPTIONS.map(opt => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="companyType"
            value={opt.value}
            checked={companyType === opt.value}
            onChange={() => setCompanyType(opt.value)}
            className="accent-blue-600"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>국민연금</span>
                <span>
                  <b>총액</b> {addComma(Math.round(result["국민연금"][0]))}원 /
                  <span className="text-blue-700 ml-2">근로자 {addComma(Math.round(result["국민연금"][1]))}원</span> /
                  <span className="text-gray-700 ml-2">사업주 {addComma(Math.round(result["국민연금"][2]))}원</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>건강보험</span>
                <span>
                  <b>총액</b> {addComma(Math.round(result["건강보험"][0]))}원 /
                  <span className="text-blue-700 ml-2">근로자 {addComma(Math.round(result["건강보험"][1]))}원</span> /
                  <span className="text-gray-700 ml-2">사업주 {addComma(Math.round(result["건강보험"][2]))}원</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>건강보험(장기요양)</span>
                <span>
                  <b>총액</b> {addComma(Math.round(result["장기요양"][0]))}원 /
                  <span className="text-blue-700 ml-2">근로자 {addComma(Math.round(result["장기요양"][1]))}원</span> /
                  <span className="text-gray-700 ml-2">사업주 {addComma(Math.round(result["장기요양"][2]))}원</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>고용보험</span>
                <span>
                  <b>총액</b> {addComma(Math.round(result["고용보험"][0]))}원 /
                  <span className="text-blue-700 ml-2">근로자 {addComma(Math.round(result["고용보험"][1]))}원</span> /
                  <span className="text-gray-700 ml-2">사업주 {addComma(Math.round(result["고용보험"][2]))}원</span>
                </span>
              </div>
              <div className="flex justify-between font-bold border-t pt-3 mt-3">
                <span>합계</span>
                <span>
                  <b>총액</b> {addComma(Math.round(result["합계"][0]))}원 /
                  <span className="text-blue-700 ml-2">근로자 {addComma(Math.round(result["합계"][1]))}원</span> /
                  <span className="text-gray-700 ml-2">사업주 {addComma(Math.round(result["합계"][2]))}원</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <CalculationMethodBox />
      <PageGrid />
    </main>
  );
}
