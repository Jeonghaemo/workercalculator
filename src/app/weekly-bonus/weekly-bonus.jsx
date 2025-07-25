"use client";
import { useState, useRef } from "react";
import PageGrid from "../components/PageGrid";
import Script from "next/script";
import Link from "next/link";
import AdsenseBox from "../components/AdsenseBox";
import MobileToolbar from "../components/MobileToolbar";
import KakaoShareButton from "../components/KakaoShareButton";

// 천 단위 콤마
const addComma = (value) => {
  if (!value && value !== 0) return "";
  return value.toLocaleString();
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

// 토글 버튼 그룹 컴포넌트 (파란색 강조 스타일)
function ToggleGroup({ value, options, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-6 py-2 rounded border font-semibold transition
            ${value === opt.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}
          `}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// 안내 박스
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
          <span className="font-bold">주휴수당 계산기</span>로 <span className="font-bold">주휴수당</span>과 <span className="font-bold">예상 주급</span>을 간편하게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">주휴수당</span>은 <span className="font-bold">주 15시간 이상</span> 근무하고, 소정 근로일수를
          <Tooltip text={`소정근로일수란?\n\n근로계약, 취업규칙 등에서 정한 '근로자가 일하기로 정해진 날'의 수를 의미합니다.\n\n예: 주 5일 근무라면, 월~금 5일이 소정근로일수입니다.\n법정 휴일, 회사 지정 휴무일, 결근일 등은 소정근로일수에서 제외됩니다.`} />
          개근한 경우에만 지급됩니다.
        </li>
        <li>
          실제 지급액은 근무일수, 결근 여부, 회사 규정 등에 따라 달라질 수 있습니다.
        </li>
        <li>
          시급 및 일급은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/hourly"
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

// 계산방법 박스
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
          <b>임금 입력:</b>
          <span className="ml-1">
            시급 또는 일급을 선택하고 금액을 입력하세요. (예: 2025년 최저시급 10,030원)
          </span>
        </li>
        <li>
          <b>1일 근무시간 입력:</b>
          <span className="ml-1">
            하루 기준 실제 근무시간을 입력하세요. (예: 8시간)
          </span>
        </li>
        <li>
          <b>1주 근무일수 입력:</b>
          <span className="ml-1">
            한 주 기준 실제 근무일수를 입력하세요. (예: 5일)
          </span>
        </li>
        <li>
          <b>주휴수당 적용 여부 선택:</b>
          <span className="ml-1">
            주 15시간 이상 근무 시 주휴수당을 받을 수 있습니다. 본인 상황에 맞게 적용/미적용을 선택하세요.
          </span>
        </li>
        <li>
          <b>세금 공제 방식 선택:</b>
          <span className="ml-1">
            4대 보험(근로자 부담) 또는 3.3% 원천징수(사업소득자) 중 선택하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 주휴수당, 주급, 월급, 세후 금액 등이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">주휴수당 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>시급 환산:</b>
          <span className="ml-1">
            <b>시급</b>은 입력값 그대로, <b>일급</b>은 <b>일급 ÷ 1일 근무시간</b>으로 시급 환산<br />
            예시: 일급 80,240원, 1일 8시간 → 80,240 ÷ 8 = 10,030원
          </span>
        </li>
        <li>
          <b>주휴수당 발생 조건:</b>
          <span className="ml-1">
            1주일 근로시간(1일 근무시간 × 1주 근무일수)이 <b>15시간 이상</b>일 때 주휴수당 발생<br />
            예시: 1일 5시간, 주 3일 근무 → 5 × 3 = 15시간 → 주휴수당 발생
          </span>
        </li>
        <li>
          <b>주휴수당(주):</b>
          <span className="ml-1">
            <b>1일 근무시간 × 시급</b> (주 15시간 이상 &amp; 적용 선택 시)<br />
            예시: 8시간 × 10,030원 = 80,240원
          </span>
        </li>
        <li>
          <b>주급(세전):</b>
          <span className="ml-1">
            <b>일급 × 1주 근무일수 + 주휴수당</b><br />
            예시: 일급 80,240원 × 5일 + 80,240원 = 481,440원
          </span>
        </li>
        <li>
          <b>월급(세전):</b>
          <span className="ml-1">
            <b>주급 × 4.345</b> (1개월 평균 주수)<br />
            예시: 481,440원 × 4.345 = 2,090,441원
          </span>
        </li>
        <li>
          <b>세금 공제:</b>
          <span className="ml-1">
            <b>4대 보험</b> : 국민연금(4.5%), 건강보험(3.545%), 장기요양(0.508%), 고용보험(0.9%)<br />
            <b>3.3% 원천징수</b> : 주급 또는 월급의 3.3% 공제<br />
            예시: 월급 2,090,441원, 4대 보험 선택 시 → 2,090,441 × 0.906 = 1,894,940원
          </span>
        </li>
        <li>
          <b>세후 금액:</b>
          <span className="ml-1">
            주급(세전) 또는 월급(세전)에서 선택한 세금 공제액을 차감한 금액<br />
            예시: 월급 2,090,441원 - 195,501원(4대 보험) = 1,894,940원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 4.345는 1년(52주)을 월 단위로 환산한 평균 주 수입니다.<br />
        ※ 주휴수당은 주 15시간 미만 근무 시 발생하지 않습니다.<br />
        ※ 실제 지급액은 근로계약, 사업장 상황에 따라 달라질 수 있습니다.
      </div>
    </div>
  );
}

function WeeklyHolidayPayFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">주휴수당 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 주휴수당이란 무엇인가요?</div>
          <div>
            <b>주휴수당</b>은 근로기준법에 따라 1주일 동안 소정근로일을 모두 출근한 근로자에게 지급되는 유급휴일수당입니다. 즉, 일하지 않아도 받는 하루치 임금으로, 사용자는 근로자에게 1주에 평균 1회 이상의 유급휴일을 보장해야 하며, 이 유급휴일에 해당하는 임금을 별도로 지급해야 합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 주휴수당의 지급 조건 및 기준은 어떻게 되나요?</div>
          <div>
            <b>주휴수당 조건 및 기준</b>은 다음과 같습니다. 1주일에 소정근로시간이 15시간 이상이고, 근로계약서상 정해진 근무일을 모두 개근해야 지급 대상이 됩니다. 사업장 규모(5인 미만 포함)와 관계없이 적용되며, 감시적·단속적 근로자 등 일부 예외를 제외하고 대부분의 근로자가 해당됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 주휴수당 계산법은 어떻게 되나요?</div>
          <div>
            주휴수당은 근로시간에 따라 계산법이 다릅니다. 주 40시간 이상 근무자는 <b>1일 소정근로시간 × 시급</b>으로, 주 15시간 이상 40시간 미만 근무자는 <b>(1주 소정근로시간 ÷ 5) × 시급</b> 또는 <b>(1주 소정근로시간 × 8 ÷ 40) × 시급</b> 방식으로 산정합니다. 주휴수당은 최저임금 기준을 반드시 충족해야 하며, 1일 최대 8시간까지만 인정됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 주휴수당 지급에서 제외되는 경우도 있나요?</div>
          <div>
            제외되는 경우도 있습니다. 1주 소정근로시간이 15시간 미만인 근로자, 결근·지각 등으로 개근 요건을 충족하지 못한 경우, 감시적·단속적 근로자 등은 <b>주휴수당 지급 대상에서 제외</b>됩니다. 근로계약서상 근무일수, 실제 출근 기록을 반드시 확인해야 합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 주휴수당을 지급하지 않으면 어떤 문제가 발생하나요?</div>
          <div>
            주휴수당은 근로기준법상 의무사항으로, 미지급 시 2년 이하의 징역 또는 2천만원 이하의 벌금이 부과될 수 있습니다. 정기적으로 급여를 지급할 때 반드시 주휴수당을 포함해 산정해야 하며, 근로계약서와 임금명세서를 꼼꼼히 확인하는 것이 중요합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

// 주휴수당/주급/월급/세후 계산 함수
function calcWeeklyPay({
  wage,
  unit,
  hoursPerDay,
  daysPerWeek,
  bonusApply,
  taxType,
}) {
  // 시급 환산
  let hourly = 0;
  switch (unit) {
    case "hourly":
      hourly = wage;
      break;
    case "daily":
      hourly = wage / hoursPerDay;
      break;
    default:
      hourly = wage;
  }
  const totalWeeklyHours = hoursPerDay * daysPerWeek;
  const eligible = totalWeeklyHours >= 15;
  const weeklyBonus = eligible && bonusApply ? hourly * hoursPerDay : 0;
  const daily = hourly * hoursPerDay;
  const weekly = daily * daysPerWeek + (bonusApply ? weeklyBonus : 0);

  // 월급 환산 (주급 × 4.345)
  const monthly = weekly * 4.345;

  // 4대보험(국민연금, 건강보험, 장기요양, 고용보험) 단순 예시 계산
  const pension = monthly * 0.045;
  const health = monthly * 0.03545;
  const care = monthly * 0.00508;
  const employ = monthly * 0.009;
  const totalInsure = pension + health + care + employ;
  const weeklyInsure = totalInsure / 4.345;
  const monthlyAfterInsure = monthly - totalInsure;
  const weeklyAfterInsure = weekly - weeklyInsure;

  // 3.3% 원천징수(사업소득자)
  const tax33 = monthly * 0.033;
  const weeklyTax33 = weekly * 0.033;
  const monthlyAfter33 = monthly - tax33;
  const weeklyAfter33 = weekly - weeklyTax33;

  // 실제 세후 금액
  let weeklyAfterTax = weekly;
  let monthlyAfterTax = monthly;
  let taxDetail = null;
  if (taxType === "four") {
    weeklyAfterTax = weeklyAfterInsure;
    monthlyAfterTax = monthlyAfterInsure;
    taxDetail = {
      weeklyInsure: Math.round(weeklyInsure),
      pension: Math.round(pension / 4.345),
      health: Math.round(health / 4.345),
      care: Math.round(care / 4.345),
      employ: Math.round(employ / 4.345),
    };
  } else if (taxType === "33") {
    weeklyAfterTax = weeklyAfter33;
    monthlyAfterTax = monthlyAfter33;
    taxDetail = {
      weeklyTax33: Math.round(weeklyTax33),
    };
  }

  return {
    hourly: Math.round(hourly),
    daily: Math.round(daily),
    weekly: Math.round(weekly),
    weeklyBonus: Math.round(weeklyBonus),
    eligible,
    monthly: Math.round(monthly),
    weeklyAfterTax: Math.round(weeklyAfterTax),
    monthlyAfterTax: Math.round(monthlyAfterTax),
    taxType,
    ...taxDetail,
  };
}

export default function WeeklyBonusCalculator() {
  const [inputValue, setInputValue] = useState("10030");
  const [inputUnit, setInputUnit] = useState("hourly");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [bonusApply, setBonusApply] = useState("apply");
  const [taxType, setTaxType] = useState("four");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null); // 결과 스크롤용 ref

  // 숫자만 입력
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!inputValue || !hoursPerDay || !daysPerWeek) {
      setResult(null);
      return;
    }
    const wage = Number(inputValue);
    const res = calcWeeklyPay({
      wage,
      unit: inputUnit,
      hoursPerDay: Number(hoursPerDay),
      daysPerWeek: Number(daysPerWeek),
      bonusApply: bonusApply === "apply",
      taxType,
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
    setInputValue("10030");
    setInputUnit("hourly");
    setHoursPerDay("8");
    setDaysPerWeek("5");
    setBonusApply("apply");
    setTaxType("four");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        주휴수당·주급 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">근무 조건 입력</h3>
          <InputRow
            label="임금 입력"
            tooltip={`시급 또는 일급을 입력하고 단위를 선택하세요.\n2025년 최저시급: 10,030원`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleNum(setInputValue)}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="10030"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="border rounded px-2 py-2"
            >
              <option value="hourly">시급</option>
              <option value="daily">일급</option>
            </select>
            <span className="text-gray-500">단위</span>
          </InputRow>
          {inputValue && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(Number(inputValue))} {inputUnit === "daily" ? "원/일" : "원"}
            </div>
          )}
          <InputRow
            label="1일 근무시간"
            tooltip={`하루 기준 근무시간을 입력하세요.\n예: 8`}
          >
   <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*(\\.\\d{0,2})?$"
    value={hoursPerDay}
    onChange={e => {
      const v = e.target.value;
      if (/^\d*\.?\d{0,2}$/.test(v)) setHoursPerDay(v);
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="8.00"
  />
            <span className="text-gray-500">시간</span>
          </InputRow>
          <InputRow
            label="1주 근무일수"
            tooltip={`한 주 기준 실제 근무일수를 입력하세요.\n예: 5`}
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*(\\.\\d{0,1})?$"
    value={daysPerWeek}
    onChange={e => {
      const v = e.target.value;
      if (/^\d*\.?\d{0,1}$/.test(v)) setDaysPerWeek(v);
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="5.0"
  />
            <span className="text-gray-500">일</span>
          </InputRow>
          <InputRow
            label="주휴수당"
            tooltip={`주 15시간 이상 근무 시 발생하는 법정수당입니다.\n적용/미적용을 선택하세요.`}
          >
            <ToggleGroup
              value={bonusApply}
              onChange={setBonusApply}
              options={[
                { value: "not", label: "미적용" },
                { value: "apply", label: "적용" },
              ]}
            />
          </InputRow>
          <InputRow
            label="세금 공제 방식"
            tooltip={`4대 보험(근로자 부담) 또는 3.3% 원천징수(사업소득자) 중 선택하세요.`}
          >
            <ToggleGroup
              value={taxType}
              onChange={setTaxType}
              options={[
                { value: "four", label: "4대 보험" },
                { value: "33", label: "3.3% 원천징수" },
              ]}
            />
          </InputRow>
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
                <span>시급</span>
                <span className="font-semibold">{addComma(result.hourly)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>일급</span>
                <span className="font-semibold">{addComma(result.daily)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>주급(세전)</span>
                <span className="font-semibold">{addComma(result.weekly)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>월급(세전)</span>
                <span className="font-semibold">{addComma(result.monthly)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>주휴수당(주)</span>
                <span className="font-semibold">{addComma(result.weeklyBonus)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>주휴수당 적용 여부</span>
                <span className="font-semibold">{result.eligible && bonusApply === "apply" ? "적용" : "미적용"}</span>
              </div>
              <div className="border-t pt-5 mt-5 space-y-3">
                {result.taxType === "four" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span>4대 보험 공제액(주)</span>
                      <span className="font-semibold text-red-600">- {addComma(result.weeklyInsure)} 원</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>국민연금: {addComma(result.pension)}원</span>
                      <span>건강보험: {addComma(result.health)}원</span>
                      <span>장기요양: {addComma(result.care)}원</span>
                      <span>고용보험: {addComma(result.employ)}원</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <span>3.3% 원천징수(주)</span>
                    <span className="font-semibold text-red-600">- {addComma(result.weeklyTax33)} 원</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span>주급(세후)</span>
                  <span className="font-bold text-blue-600">{addComma(result.weeklyAfterTax)} 원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>월급(세후)</span>
                  <span className="font-bold text-blue-600">{addComma(result.monthlyAfterTax)} 원</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <KakaoShareButton />
          </div>
        </section>
      </div>
      <CalculationMethodBox />
      <WeeklyHolidayPayFAQBox />
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}
