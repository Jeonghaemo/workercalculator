"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 날짜 차이(일수) 계산
function getDaysDiff(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  return Math.floor((e - s) / (1000 * 60 * 60 * 24)) + 1;
}

// 간편계산 로직
function calcSimple({ annual, lastMonth, serviceDays }) {
  const monthAvg = annual ? annual / 12 : lastMonth;
  const dailyAvg = monthAvg / 30;
  const severance = dailyAvg * 30 * (serviceDays / 365);
  return {
    monthAvg: Math.round(monthAvg),
    dailyAvg: Math.round(dailyAvg),
    severance: Math.round(severance),
  };
}

// 상세계산 로직
function calcDetail({ base, bonus, leavePay, serviceDays }) {
  const monthAvg = Number(base) + Number(bonus) / 12 + Number(leavePay) / 12;
  const dailyAvg = monthAvg / 30;
  const severance = dailyAvg * 30 * (serviceDays / 365);
  return {
    base: Math.round(base),
    bonus: Math.round(bonus),
    leavePay: Math.round(leavePay),
    monthAvg: Math.round(monthAvg),
    dailyAvg: Math.round(dailyAvg),
    severance: Math.round(severance),
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

import Link from "next/link";

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
          <span className="font-bold">퇴직금 계산기</span>로 <span className="font-bold">예상 퇴직금</span>을 간편하게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">퇴직금</span>은 주 15시간 이상, 1년 이상 근무한 경우에만 지급됩니다.
        </li>
        <li>
          회사마다 <span className="font-bold">평균임금·통상임금 기준</span>이 다를 수 있어 실제 지급액과 차이가 있을 수 있습니다.
        </li>
        <li>
          퇴직금에 대한 소득세는{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/retirement-tax"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            퇴직소득세 계산기
          </Link>
          에서 확인하세요.
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
          <b>입사일/퇴사일 입력:</b>
          <span className="ml-1">
            근무 시작일과 종료일을 선택하면 자동으로 재직일수가 계산됩니다.
          </span>
        </li>
        <li>
          <b>간편계산/상세계산 선택:</b>
          <ul className="ml-4 mt-1 space-y-1">
            <li>
              <b className="text-blue-700">간편계산</b>: 연봉 또는 최종월급만 입력해 간단히 계산
            </li>
            <li>
              <b className="text-blue-700">상세계산</b>: 최근 3개월 기본급, 연간 상여금, 연차수당 등 실제 평균임금 기준으로 계산
            </li>
          </ul>
        </li>
        <li>
          <b>급여/수당 입력:</b>
          <span className="ml-1">
            선택한 방식에 따라 연봉, 월급 또는 최근 3개월 기본급·상여금·연차수당을 입력하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 1개월 평균임금, 1일 평균임금, 퇴직금이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">퇴직금 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>1개월 평균임금 산정</b>
          <ul className="list-disc list-inside ml-5">
            <li>
              <b>간편계산</b>: 연봉 ÷ 12 또는 최종월급<br />
              예시: 연봉 36,000,000원 → 36,000,000 ÷ 12 = 3,000,000원<br />
              예시: 최종월급 2,800,000원 입력 시 → 2,800,000원
            </li>
            <li>
              <b>상세계산</b>: (최근 3개월 기본급 + 연간 상여금/12 + 연차수당/12)<br />
              예시: 기본급 2,500,000원, 상여금 1,200,000원, 연차수당 600,000원 →<br />
              2,500,000 + 1,200,000/12 + 600,000/12 = 2,500,000 + 100,000 + 50,000 = 2,650,000원
            </li>
          </ul>
        </li>
        <li>
          <b>1일 평균임금 산정</b>
          <span className="ml-1">
            1개월 평균임금 ÷ 30<br />
            예시: 3,000,000 ÷ 30 = 100,000원
          </span>
        </li>
        <li>
          <b>퇴직금 산정</b>
          <span className="ml-1">
            1일 평균임금 × 30 × (재직일수 ÷ 365)<br />
            예시: 1일 평균임금 100,000원, 재직일수 730일(2년) →<br />
            100,000 × 30 × (730 ÷ 365) = 100,000 × 30 × 2 = 6,000,000원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 1년 미만 근속 시에도 퇴직금이 발생합니다.<br />
        ※ 평균임금은 퇴직 전 3개월간 지급된 임금(기본급, 상여금, 연차수당 등 포함) 기준입니다.<br />
        ※ 실제 지급액은 근로계약, 회사 규정, 법령에 따라 달라질 수 있습니다.
      </div>
    </div>
  );
}



// InputRow
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

export default function RetirementCalculator() {
  // 공통
  const [tab, setTab] = useState("simple");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [serviceDays, setServiceDays] = useState(0);

  // 간편계산 입력
  const [annual, setAnnual] = useState("");
  const [lastMonth, setLastMonth] = useState("");

  // 상세계산 입력
  const [base, setBase] = useState("");
  const [bonus, setBonus] = useState("");
  const [leavePay, setLeavePay] = useState("");

  // 결과
  const [simpleResult, setSimpleResult] = useState(null);
  const [detailResult, setDetailResult] = useState(null);

  // 날짜 입력시 재직일수 자동 계산
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    if (endDate && e.target.value) {
      const diff = getDaysDiff(e.target.value, endDate);
      setServiceDays(diff > 0 ? diff : 0);
    }
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    if (startDate && e.target.value) {
      const diff = getDaysDiff(startDate, e.target.value);
      setServiceDays(diff > 0 ? diff : 0);
    }
  };

  // 숫자만 입력
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  // 계산
  const handleSimpleCalc = () => {
    const annualNum = Number(annual);
    const lastMonthNum = Number(lastMonth);
    if ((!annualNum && !lastMonthNum) || !serviceDays) {
      setSimpleResult(null);
      return;
    }
    setSimpleResult(
      calcSimple({
        annual: annualNum,
        lastMonth: lastMonthNum,
        serviceDays: Number(serviceDays),
      })
    );
  };

  const handleDetailCalc = () => {
    if (!base || !serviceDays) {
      setDetailResult(null);
      return;
    }
    setDetailResult(
      calcDetail({
        base: Number(base),
        bonus: Number(bonus),
        leavePay: Number(leavePay),
        serviceDays: Number(serviceDays),
      })
    );
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setServiceDays(0);
    setAnnual("");
    setLastMonth("");
    setBase("");
    setBonus("");
    setLeavePay("");
    setSimpleResult(null);
    setDetailResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        퇴직금 계산기
      </h1>
      <IntroBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <div className="flex gap-2 mb-8">
            <button
              className={`px-8 py-3 text-lg rounded-t-lg border-b-2 font-bold transition ${
                tab === "simple"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab("simple")}
            >
              간편계산
            </button>
            <button
              className={`px-8 py-3 text-lg rounded-t-lg border-b-2 font-bold transition ${
                tab === "detail"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab("detail")}
            >
              상세계산
            </button>
          </div>
          <InputRow
            label="입사일"
            tooltip="근무를 시작한 날짜를 선택하세요."
          >
            <input
              type="date"
              value={startDate}
              onChange={handleStartDate}
              className="border rounded px-2 py-2"
              max={endDate || undefined}
            />
          </InputRow>
          <InputRow
            label="퇴사일"
            tooltip="근무를 종료한 날짜를 선택하세요."
          >
            <input
              type="date"
              value={endDate}
              onChange={handleEndDate}
              className="border rounded px-2 py-2"
              min={startDate || undefined}
            />
          </InputRow>
          <InputRow
            label="총 재직일수"
            tooltip="입사일과 퇴사일을 기준으로 자동 계산됩니다."
          >
            <input
              type="text"
              value={serviceDays}
              readOnly
              className="w-40 border rounded px-2 py-2 text-right bg-gray-50"
            />
            <span className="text-gray-500">일</span>
          </InputRow>
          {tab === "simple" ? (
            <>
              <InputRow
                label="연봉"
                tooltip="세전 연간 총 급여(연봉)를 입력하세요."
              >
                <input
                  type="text"
                  value={annual}
                  onChange={handleNum(setAnnual)}
                  className="w-40 border rounded px-2 py-2 text-right"
                  placeholder="예: 30,000,000"
                />
                <span className="text-gray-500">원</span>
              </InputRow>
              {annual && (
                <div className="text-right text-blue-600 font-bold mb-2">
                  입력값: {addComma(annual)} 원
                </div>
              )}
              <div className="text-gray-700 text-base font-semibold mb-2 ml-2">
                (또는 아래 월급만 입력)
              </div>
              <InputRow
                label="최종월급(세전)"
                tooltip="마지막 달의 세전 월급을 입력하세요."
              >
                <input
                  type="text"
                  value={lastMonth}
                  onChange={handleNum(setLastMonth)}
                  className="w-40 border rounded px-2 py-2 text-right"
                  placeholder="예: 2,500,000"
                />
                <span className="text-gray-500">원</span>
              </InputRow>
              {lastMonth && (
                <div className="text-right text-blue-600 font-bold mb-2">
                  입력값: {addComma(lastMonth)} 원
                </div>
              )}
            </>
          ) : (
            <>
              <InputRow
                label="기본급(월)"
                tooltip="최근 3개월간의 월 기본급(세전)을 입력하세요."
              >
                <input
                  type="text"
                  value={base}
                  onChange={handleNum(setBase)}
                  className="w-40 border rounded px-2 py-2 text-right"
                  placeholder="예: 2,500,000"
                />
                <span className="text-gray-500">원</span>
              </InputRow>
              {base && (
                <div className="text-right text-blue-600 font-bold mb-2">
                  입력값: {addComma(base)} 원
                </div>
              )}
              <InputRow
                label="연간 상여금"
                tooltip="1년 동안 받은 상여금 총액을 입력하세요."
              >
                <input
                  type="text"
                  value={bonus}
                  onChange={handleNum(setBonus)}
                  className="w-40 border rounded px-2 py-2 text-right"
                  placeholder="예: 1,000,000"
                />
                <span className="text-gray-500">원</span>
              </InputRow>
              {bonus && (
                <div className="text-right text-blue-600 font-bold mb-2">
                  입력값: {addComma(bonus)} 원
                </div>
              )}
              <InputRow
                label="연차수당"
                tooltip="1년 동안 받은 연차수당 총액을 입력하세요."
              >
                <input
                  type="text"
                  value={leavePay}
                  onChange={handleNum(setLeavePay)}
                  className="w-40 border rounded px-2 py-2 text-right"
                  placeholder="예: 500,000"
                />
                <span className="text-gray-500">원</span>
              </InputRow>
              {leavePay && (
                <div className="text-right text-blue-600 font-bold mb-2">
                  입력값: {addComma(leavePay)} 원
                </div>
              )}
            </>
          )}
          <div className="flex gap-2 mt-8">
            <button
              onClick={tab === "simple" ? handleSimpleCalc : handleDetailCalc}
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
          {tab === "simple" && simpleResult ? (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span>총 재직일수</span>
      <span className="font-semibold">{addComma(serviceDays)} 일</span>
    </div>
    <div className="flex items-center justify-between">
      <span>1개월 평균임금</span>
      <span className="font-semibold">{addComma(simpleResult.monthAvg)} 원</span>
    </div>
    <div className="flex items-center justify-between">
      <span>1일 평균임금</span>
      <span className="font-semibold">{addComma(simpleResult.dailyAvg)} 원</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-bold">퇴직금</span>
      <span className="font-bold text-blue-700">{addComma(simpleResult.severance)} 원</span>
    </div>
  </div>
) : tab === "detail" && detailResult ? (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span>총 재직일수</span>
      <span className="font-semibold">{addComma(serviceDays)} 일</span>
    </div>
    <div className="flex items-center justify-between">
      <span>기본급(월)</span>
      <span className="font-semibold">{addComma(detailResult.base)} 원</span>
    </div>
    <div className="flex items-center justify-between">
      <span>기타 수당(연간)</span>
      <span className="font-semibold">{addComma(detailResult.bonus + detailResult.leavePay)} 원</span>
    </div>
    <div className="flex items-center justify-between">
      <span>1개월 평균임금</span>
      <span className="font-semibold">{addComma(detailResult.monthAvg)} 원</span>
    </div>
    <div className="flex items-center justify-between">
      <span>1일 평균임금</span>
      <span className="font-semibold">{addComma(detailResult.dailyAvg)} 원</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-bold">퇴직금</span>
      <span className="font-bold text-blue-700">{addComma(detailResult.severance)} 원</span>
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
