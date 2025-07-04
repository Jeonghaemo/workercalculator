"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 실업급여 지급일수 계산 (2025년 기준, 예시)
function getBenefitDays(age, insuredYear) {
  if (insuredYear < 1) return 0;
  if (insuredYear < 3) return 120;
  if (insuredYear < 5) return age < 50 ? 150 : 180;
  if (insuredYear < 10) return age < 50 ? 180 : 210;
  return age < 50 ? 210 : 270;
}

// 실업급여 계산 함수
function calcUnemploymentPay({ wage3m, days3m, age, insuredYear }) {
  const avgDailyWage = wage3m / days3m;
  let daily = avgDailyWage * 0.6;
  // 2025년 기준 상하한
  const MIN = 69040;
  const MAX = 77000;
  if (daily < MIN) daily = MIN;
  if (daily > MAX) daily = MAX;
  const benefitDays = getBenefitDays(age, insuredYear);
  const total = daily * benefitDays;
  return {
    avgDailyWage: Math.round(avgDailyWage),
    daily: Math.round(daily),
    benefitDays,
    total: Math.round(total),
  };
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

// InputRow
function InputRow({ label, tooltip, children }) {
  return (
    <div className="flex items-center gap-12 mb-4 min-h-[48px]">
      <label className="w-48 shrink-0 flex items-center text-gray-700 font-medium whitespace-nowrap">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex-1 flex items-center gap-2">{children}</div>
    </div>
  );
}

export default function UnemploymentCalculator() {
  const [wage3m, setWage3m] = useState("");
  const [days3m, setDays3m] = useState("90");
  const [age, setAge] = useState("30");
  const [insuredYear, setInsuredYear] = useState("3");
  const [result, setResult] = useState(null);

  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!wage3m || !days3m || !age || !insuredYear) {
      setResult(null);
      return;
    }
    const res = calcUnemploymentPay({
      wage3m: Number(wage3m),
      days3m: Number(days3m),
      age: Number(age),
      insuredYear: Number(insuredYear),
    });
    setResult(res);
  };

  const reset = () => {
    setWage3m("");
    setDays3m("90");
    setAge("30");
    setInsuredYear("3");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        실업급여(구직급여) 계산기
      </h1>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-12">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="3개월 총급여"
            tooltip="이직 전 3개월간 세전 총급여(상여·수당 포함)를 입력하세요."
          >
            <input
              type="text"
              value={wage3m}
              onChange={handleNum(setWage3m)}
              className="w-40 border rounded px-2 py-2 text-right"
              placeholder="예: 6,000,000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {wage3m && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(wage3m)} 원
            </div>
          )}
          <InputRow
            label="3개월 총일수"
            tooltip="이직 전 3개월간 실제 근무일수(기본 90일)를 입력하세요."
          >
            <input
              type="text"
              value={days3m}
              onChange={handleNum(setDays3m)}
              className="w-40 border rounded px-2 py-2 text-right"
              placeholder="90"
            />
            <span className="text-gray-500">일</span>
          </InputRow>
          <InputRow
            label="나이"
            tooltip="실업급여 신청일 기준 만 나이를 입력하세요."
          >
            <input
              type="text"
              value={age}
              onChange={handleNum(setAge)}
              className="w-40 border rounded px-2 py-2 text-right"
              placeholder="30"
            />
            <span className="text-gray-500">세</span>
          </InputRow>
          <InputRow
            label="고용보험 가입기간"
            tooltip="고용보험 누적 가입기간(년 단위, 예: 3)을 입력하세요."
          >
            <input
              type="text"
              value={insuredYear}
              onChange={handleNum(setInsuredYear)}
              className="w-40 border rounded px-2 py-2 text-right"
              placeholder="3"
            />
            <span className="text-gray-500">년</span>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>1일 평균임금</span>
                <span className="font-semibold">{addComma(result.avgDailyWage)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1일 실업급여</span>
                <span className="font-semibold">{addComma(result.daily)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>지급일수</span>
                <span className="font-semibold">{addComma(result.benefitDays)} 일</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">예상 총 실업급여</span>
                <span className="font-bold text-blue-700">{addComma(result.total)} 원</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <PageGrid />
    </main>
  );
}

