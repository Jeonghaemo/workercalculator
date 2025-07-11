"use client";
import { useState, useRef } from "react";
import PageGrid from "../components/PageGrid";
import Script from "next/script";
import Link from "next/link";
import AdsenseBox from "./AdsenseBox";

// 천 단위 콤마
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

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
          <span className="font-bold">통상임금 계산기</span>로 <span className="font-bold">시간급·일급·월급 통상임금</span>을 쉽게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">통상임금</span>은 <span className="font-bold">정기적·일률적·고정적으로 지급되는 임금</span>으로, 연장·야간·휴일근로수당, 연차수당, 퇴직금 등 각종 수당의 산정 기준이 됩니다.
        </li>
        <li>
          시급, 일급, 월급은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/salary"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            시급 계산기
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
          <b>임금 단위 선택:</b>
          <span className="ml-1">
            시급, 일급, 월급 중 본인 임금 단위를 선택하세요.
          </span>
        </li>
        <li>
          <b>임금 입력:</b>
          <span className="ml-1">
            선택한 단위에 맞는 세전 금액을 입력하세요.
          </span>
        </li>
        <li>
          <b>1일 근무시간 입력:</b>
          <span className="ml-1">
            시급 또는 일급 선택 시, 하루 실제 근무시간을 입력하세요. (예: 8시간)
          </span>
        </li>
        <li>
          <b>월 소정근로시간 입력:</b>
          <span className="ml-1">
            월급 선택 시, 월 소정근로시간(예: 209시간)을 입력하세요.
          </span>
        </li>
        <li>
          <b>통상적 수당 입력:</b>
          <span className="ml-1">
            월마다 정기적으로 지급되는 수당(식대, 직책수당 등)이 있으면 입력하세요. 없으면 0 또는 빈칸으로 두세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 시급, 일급, 월급 기준 통상임금이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">통상임금 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>시급 기준 통상임금:</b>
          <span className="ml-1">
            입력한 시급 × 1일 근무시간<br />
            예시: 시급 10,000원, 1일 8시간 → 10,000 × 8 = 80,000원
          </span>
        </li>
        <li>
          <b>일급 기준 통상임금:</b>
          <span className="ml-1">
            입력한 일급 그대로 사용<br />
            예시: 일급 80,000원 입력 시 → 80,000원
          </span>
        </li>
        <li>
          <b>월급 기준 통상임금:</b>
          <span className="ml-1">
            (입력한 월급 + 통상적 수당)<br />
            1일 통상임금 = 월급 ÷ 월평균 근무일수(21.75일)<br />
            예시: 월급 2,000,000원, 수당 100,000원 → (2,000,000 + 100,000) ÷ 21.75 = 96,552원<br />
            시급 통상임금 = 월급 ÷ 월 소정근로시간<br />
            예시: 월급 2,000,000원, 소정근로시간 209시간 → 2,000,000 ÷ 209 = 9,569원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 월평균 근무일수 21.75일은 주 5일 근무 기준입니다.<br />
        ※ 월 소정근로시간은 회사별 차이가 있을 수 있습니다.<br />
        ※ 계산 결과는 참고용이며, 실제 통상임금 산정은 근로계약 및 법령에 따라 달라질 수 있습니다.
      </div>
    </div>
  );
}

function OrdinaryWageFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">통상임금 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 통상임금이란 무엇인가요?</div>
          <div>
            통상임금은 근로자가 정기적이고 일률적으로 받는 임금으로, 근로기준법상 연장·야간·휴일근로수당 및 퇴직금 산정의 기준이 되는 중요한 임금입니다. 2025년 대법원 판결에 따라 상여금, 근속수당 등도 일정 조건을 충족하면 통상임금에 포함될 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 통상임금은 어떻게 계산하나요?</div>
          <div>
            통상임금 계산법은 기본급, 정기상여금, 각종 고정 수당을 합산한 월급을 기준으로 하며, 이를 시간급으로 환산할 때는 월 통상임금 금액을 월 통상임금 산정 기준시간(보통 월평균 소정근로시간)으로 나눕니다. 연장근로수당 등 법정수당 산정 시 이 통상임금이 기준이 됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 시급과 통상임금의 차이는 무엇인가요?</div>
          <div>
            시급은 근로자가 시간 단위로 받는 임금을 의미하며, 통상임금은 시급, 일급, 주급, 월급 등 다양한 임금 형태 중 근로기준법상 수당 산정 기준이 되는 임금을 말합니다. 통상임금은 시급보다 넓은 개념으로, 상여금 등도 포함될 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 상여금도 통상임금에 포함되나요?</div>
          <div>
            2025년부터는 정기적이고 일률적으로 지급되는 상여금은 통상임금에 포함될 가능성이 높아졌습니다. 특히 근로자가 일정 근무 조건을 충족했을 때 지급되는 상여금은 통상임금 산정에 반영해야 하므로, 회사의 취업규칙과 근로계약서를 꼼꼼히 확인하는 것이 중요합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

// 통상임금 계산 함수
function calcOrdinary({
  wage,
  unit,
  hoursPerDay,
  monthStdHours,
  allowance,
}) {
  let daily = 0, hourly = 0, monthly = 0;
  if (unit === "hourly") {
    hourly = wage;
    daily = wage * hoursPerDay;
    monthly = daily * 21.75; // 월평균 근무일수(주5일 기준)
  } else if (unit === "daily") {
    daily = wage;
    hourly = wage / hoursPerDay;
    monthly = wage * 21.75;
  } else if (unit === "monthly") {
    monthly = Number(wage) + Number(allowance || 0);
    daily = monthly / 21.75;
    hourly = monthly / monthStdHours;
  }
  return {
    hourly: Math.round(hourly),
    daily: Math.round(daily),
    monthly: Math.round(monthly),
  };
}

export default function OrdinaryCalculator() {
  const [unit, setUnit] = useState("hourly");
  const [wage, setWage] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [monthStdHours, setMonthStdHours] = useState("209");
  const [allowance, setAllowance] = useState("");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null); // 결과 스크롤용 ref

  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!wage || (unit !== "daily" && !hoursPerDay) || (unit === "monthly" && !monthStdHours)) {
      setResult(null);
      return;
    }
    const res = calcOrdinary({
      wage: Number(wage),
      unit,
      hoursPerDay: Number(hoursPerDay),
      monthStdHours: Number(monthStdHours),
      allowance: Number(allowance || 0),
    });
    setResult(res);

    // 계산 후 모바일에서 결과로 스크롤
    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const reset = () => {
    setUnit("hourly");
    setWage("");
    setHoursPerDay("8");
    setMonthStdHours("209");
    setAllowance("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        통상임금 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="임금 단위"
            tooltip={`시급, 일급, 월급 중 하나를 선택하세요.`}
          >
            <button
              type="button"
              className={`px-6 py-2 rounded border ${unit === "hourly" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
              onClick={() => setUnit("hourly")}
            >
              시급
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded border ${unit === "daily" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
              onClick={() => setUnit("daily")}
            >
              일급
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded border ${unit === "monthly" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
              onClick={() => setUnit("monthly")}
            >
              월급
            </button>
          </InputRow>
          <InputRow
            label={unit === "hourly" ? "시급" : unit === "daily" ? "일급" : "월급"}
            tooltip={`해당 임금 단위의 세전 금액을 입력하세요.`}
          >
            <input
              type="text"
              value={wage}
              onChange={handleNum(setWage)}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              placeholder={unit === "hourly" ? "10,030" : unit === "daily" ? "80,240" : "2,090,000"}
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {wage && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(wage)} 원
            </div>
          )}
          {(unit === "hourly" || unit === "daily") && (
            <InputRow
              label="1일 근무시간"
              tooltip="하루 근무시간(예: 8시간)을 입력하세요."
            >
              <input
                type="text"
                value={hoursPerDay}
                onChange={handleNum(setHoursPerDay)}
                className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
                placeholder="8"
              />
              <span className="text-gray-500">시간</span>
            </InputRow>
          )}
          {unit === "monthly" && (
            <>
              <InputRow
                label="월 소정근로시간"
                tooltip="월급제의 경우 월 소정근로시간(예: 209시간)을 입력하세요."
              >
                <input
                  type="text"
                  value={monthStdHours}
                  onChange={handleNum(setMonthStdHours)}
                  className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
                  placeholder="209"
                />
                <span className="text-gray-500">시간</span>
              </InputRow>
              <InputRow
                label="통상적 수당(월)"
                tooltip="월마다 정기적으로 지급되는 수당(식대, 직책수당 등)이 있다면 입력하세요. 없으면 0."
              >
                <input
                  type="text"
                  value={allowance}
                  onChange={handleNum(setAllowance)}
                  className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
                  placeholder="0"
                />
                <span className="text-gray-500">원</span>
              </InputRow>
              {allowance && (
                <div className="text-right text-blue-600 font-bold mb-2">
                  입력값: {addComma(allowance)} 원
                </div>
              )}
            </>
          )}
          <div className="flex gap-2 mt-8 w-full">
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
        <section ref={resultRef} className="w-full lg:w-1/2 pt-10 lg:pt-0 min-w-0">
          <h3 className="font-semibold text-lg mb-6">계산 결과</h3>
          {result ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>시급 기준 통상임금</span>
                <span className="font-semibold">{addComma(result.hourly)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>일급 기준 통상임금</span>
                <span className="font-semibold">{addComma(result.daily)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>월급 기준 통상임금</span>
                <span className="font-semibold">{addComma(result.monthly)} 원</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <CalculationMethodBox />
      <OrdinaryWageFAQBox />
      <PageGrid />
    </main>
  );
}



