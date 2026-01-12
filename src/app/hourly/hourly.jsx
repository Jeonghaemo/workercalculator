"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import PageGrid from "../components/PageGrid";
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
          <span className="font-bold">시급 계산기</span>로 <span className="font-bold">예상 월급</span>과 <span className="font-bold">연봉</span>을 빠르게 확인해보세요.
        </li>
        <li>
          근무일수, 근무시간, 각종 수당을 입력하면 <span className="font-bold">월 실수령액</span>까지 계산할 수 있습니다.
        </li>
        <li>
          <span className="font-bold">시급, 일급, 주급, 월급, 연봉</span>으로 변환하여 계산해보세요.
        </li>
        <li>
          월급/연봉 기준 계산은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/salary"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            연봉 계산기
          </Link>
          에서 확인하세요.
        </li>
        <li className="font-semibold text-blue-700">
          2026년 최저시급은 <b>10,320원</b>입니다.
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
          <b>급여 단위 선택 및 입력:</b>
          <span className="ml-1">
            시급, 일급, 주급, 월급, 연봉 중 해당하는 급여 단위를 선택하고 금액을 입력하세요.
            (예: 월급 근로자는 월급, 아르바이트는 시급)
          </span>
        </li>
        <li>
          <b>1일 근무시간 및 한 달 근무일수 입력:</b>
          <span className="ml-1">
            하루 근무시간(예: 8시간)과 한 달 기준 근무일수(예: 22일)를 입력하세요.
            (주 5일제라면 22일이 일반적입니다)
          </span>
        </li>
        <li>
          <b>주휴수당 포함 여부 선택:</b>
          <span className="ml-1">
            주 15시간 이상 근무 시 주휴수당을 포함할 수 있습니다. 본인 상황에 맞게 포함/제외를 선택하세요.
          </span>
        </li>
        <li>
          <b>세금 적용 선택:</b>
          <span className="ml-1">
            4대보험(9.4%) 또는 원천징수(3.3%) 등 세금 공제 방식을 선택할 수 있습니다.
          </span>
        </li>
        <li>
          <b>수습 여부 선택:</b>
          <span className="ml-1">
            수습기간(최대 3개월)에는 시급의 90%만 지급할 수 있습니다. 해당 시 '예'를 선택하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목을 입력한 뒤 <b>계산하기</b> 버튼을 누르면, 시급·일급·주급·월급·연봉이 자동 계산되어 표시됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">시급 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>기준 시급 환산</b>
          <ul className="list-disc list-inside ml-5">
            <li>시급: 입력값 그대로 사용<br />예시: 시급 10,320원 입력 시 → 10,320원</li>
            <li>일급: <b>일급 ÷ 1일 근무시간</b><br />예시: 일급 82,560원, 1일 8시간 → 82,560 ÷ 8 = 10,320원</li>
            <li>주급: <b>주급 ÷ (1일 근무시간 × 한 달 근무일수 ÷ 4.345)</b><br />예시: 주급 412,800원, 1일 8시간, 22일 → 412,800 ÷ (8 × 22 ÷ 4.345) ≈ 10,320원</li>
            <li>월급: <b>월급 ÷ (1일 근무시간 × 한 달 근무일수)</b><br />예시: 월급 1,816,320원, 8시간, 22일 → 1,816,320 ÷ (8 × 22) = 10,320원</li>
            <li>연봉: <b>연봉 ÷ (1일 근무시간 × 한 달 근무일수 × 12)</b><br />예시: 연봉 21,795,840원, 8시간, 22일 → 21,795,840 ÷ (8 × 22 × 12) = 10,320원</li>
          </ul>
        </li>
        <li>
          <b>주휴수당</b>
          <ul className="list-disc list-inside ml-5">
            <li>
              주 15시간 이상 근무 시, 1주일에 1일치 임금(1일 근무시간 × 시급)이 주휴수당으로 추가됩니다.<br />
              예시: 1일 8시간, 시급 10,320원 → 8 × 10,320 = 82,560원(주휴수당)
            </li>
          </ul>
        </li>
        <li>
          <b>각 단위별 환산</b>
          <ul className="list-disc list-inside ml-5">
            <li>일급: <b>시급 × 1일 근무시간</b><br />예시: 10,320 × 8 = 82,560원</li>
<li>주급: <b>일급 × (한 달 근무일수 ÷ 4.345) + 주휴수당</b><br />예시: 82,560 × (22 ÷ 4.345) + 82,560 ≈ 500,585원</li>
<li>월급: <b>시급 × 1일 근무시간 × 한 달 근무일수 + 주휴수당 × 4.345</b><br />예시: 10,320 × 8 × 22 + 82,560 × 4.345 ≈ 2,175,043원</li>
<li>연봉: <b>월급 × 12</b><br />예시: 2,175,043 × 12 ≈ 26,100,516원</li>

          </ul>
        </li>
        <li>
          <b>세금 공제</b>
          <li>4대보험: 9.4% 차감, 원천징수: 3.3% 차감, 선택에 따라 적용<br />
예시: 월급 2,112,768원, 4대보험 선택 시 → 2,112,768 × 0.906 = 1,914,170원</li>

        </li>
        <li>
          <b>수습기간</b>
          <ul className="list-disc list-inside ml-5">
            <li>수습기간(최대 3개월)에는 시급의 90%만 적용<br />예시: 시급 10,320원 → 10,320 × 0.9 = 9,288원</li>
          </ul>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 4.345는 1년(52주)을 월 단위로 환산한 평균 주 수입니다.<br />
        ※ 주휴수당은 주 15시간 미만 근무 시 발생하지 않습니다.
      </div>
    </div>
  );
}

function HourlyWageFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">시급 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 시급 계산법은 어떻게 되나요?</div>
          <div>
            <b>시급 계산법</b>은 기본적으로 <b>근무시간 × 시급</b>으로 일급을 구하고, 주급·월급·연봉으로 환산할 수 있습니다. <b>통상시급</b>은 월급, 상여금, 각종 수당을 모두 포함한 총임금을 총 근로시간으로 나누어 계산합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 2026년 최저시급과 월급, 연봉 시급은 얼마인가요?</div>
          <div>
  2026년 <b>최저시급</b>은 <b>10,320원</b>입니다.
  주 40시간 근무(주휴 포함, 월 209시간 기준)으로 환산하면 월급은 약 <b>2,156,880원</b>,
  연봉은 약 <b>25,882,560원</b>입니다.
  실제 월급·연봉 환산값은 근무일수/주휴 포함 여부에 따라 달라질 수 있습니다.
</div>

        </div>
        <div>
          <div className="font-bold mb-1">Q 주휴수당은 시급 계산에 어떻게 반영되나요?</div>
          <div>
            <b>주휴수당</b>은 주 15시간 이상 근무 시 지급되며, 1주 소정근로시간(최대 40시간)의 비율에 따라 계산됩니다. 예를 들어, 주 20시간 근로자는 (20÷40)×8×시급으로 주휴수당을 산정합니다. 주휴수당이 포함된 시급을 계산할 때는 반드시 근로계약서와 임금명세서를 확인하세요.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 알바 시급에서 3.3% 세금은 뭔가요?</div>
          <div>
            <b>3.3%</b>는 프리랜서·사업소득자로 신고할 때 원천징수되는 소득세(3%)와 지방소득세(0.3%)를 합친 금액입니다. 일반적인 아르바이트(근로계약)에서는 3.3%가 아니라 4대보험 및 소득세가 적용됩니다. 본인의 고용형태에 따라 세금 공제 방식이 다르니 주의해야 합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 야간근로 시 시급은 어떻게 계산하나요?</div>
          <div>
            <b>야간근로(밤 10시~익일 6시)</b>는 통상시급의 1.5배(50% 가산)를 적용해야 합니다. 예를 들어, 시급이 10,320원이라면 야간 시급은 15,480원이 됩니다. 야간근로수당은 근로기준법에 따라 별도로 지급되어야 합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 월급제, 연봉제 근로자의 시급은 어떻게 계산하나요?</div>
          <div>
            <b>월급 시급</b>은 <b>월급 ÷ (주 소정근로시간 + 주휴시간) × 4.345주</b>로 계산합니다. <b>연봉시급</b>은 연봉을 12로 나눠 월급으로 환산한 뒤 같은 방식으로 시급을 구하면 됩니다. 월급에 주휴수당이 포함되어 있는지도 반드시 확인하세요.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 시급 계산 시 세금과 4대보험은 어떻게 처리되나요?</div>
          <div>
            <b>시급</b>에서 세전 금액은 공제 전 금액이며, 실제 지급액(실수령액)은 소득세, 4대보험 등 공제 후 금액입니다. 알바·아르바이트의 경우 근로계약이면 4대보험이 적용되고, 프리랜서로 처리되면 3.3% 세금이 원천징수됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

// 급여 단위별 환산 함수
function convertSalary({ value, unit, hoursPerDay, daysPerMonth, includeWeeklyBonus }) {
  const weekPerMonth = 4.345;
  let hourly = 0;

  switch (unit) {
    case "hourly":
      hourly = value;
      break;
    case "daily":
      hourly = value / hoursPerDay;
      break;
    case "weekly":
      hourly = value / (hoursPerDay * (daysPerMonth / weekPerMonth));
      break;
    case "monthly":
      hourly = value / (hoursPerDay * daysPerMonth);
      break;
    case "yearly":
      hourly = value / (hoursPerDay * daysPerMonth * 12);
      break;
    default:
      hourly = value;
  }

  const daysPerWeek = daysPerMonth / weekPerMonth;
  const eligibleWeeklyBonus = daysPerWeek * hoursPerDay >= 15;
  const weeklyBonus = includeWeeklyBonus && eligibleWeeklyBonus ? hourly * hoursPerDay : 0;

  const daily = hourly * hoursPerDay;
  const weekly = daily * daysPerWeek + (includeWeeklyBonus ? weeklyBonus : 0);
  const monthly = hourly * hoursPerDay * daysPerMonth + (includeWeeklyBonus ? weeklyBonus * weekPerMonth : 0);
  const yearly = monthly * 12;

  return {
    hourly: Math.round(hourly),
    daily: Math.round(daily),
    weekly: Math.round(weekly),
    monthly: Math.round(monthly),
    yearly: Math.round(yearly),
    weeklyBonus: Math.round(weeklyBonus),
    eligibleWeeklyBonus,
  };
}

// 세금 차감 함수
function applyTax(amount, taxType) {
  if (taxType === "none") return amount;
  if (taxType === "insurance") return Math.round(amount * 0.906); // 4대보험 9.4%
  if (taxType === "withholding") return Math.round(amount * 0.967); // 원천징수 3.3%
  return amount;
}

// 토글 버튼 그룹 컴포넌트
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

export default function HourlyCalculator() {
  // 입력 상태
  const [inputValue, setInputValue] = useState("10320");
  const [inputUnit, setInputUnit] = useState("hourly");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerMonth, setDaysPerMonth] = useState("22");
  const [includeWeeklyBonus, setIncludeWeeklyBonus] = useState("include");
  const [taxType, setTaxType] = useState("none");
  const [isProbation, setIsProbation] = useState("no");
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!inputValue || !hoursPerDay || !daysPerMonth) {
      setResult(null);
      return;
    }
    let value = Number(inputValue);
    if (isProbation === "yes" && inputUnit === "hourly") value = Math.floor(value * 0.9);

    const res = convertSalary({
      value,
      unit: inputUnit,
      hoursPerDay: Number(hoursPerDay),
      daysPerMonth: Number(daysPerMonth),
      includeWeeklyBonus: includeWeeklyBonus === "include",
    });

    const taxed = {
      hourly: applyTax(res.hourly, taxType),
      daily: applyTax(res.daily, taxType),
      weekly: applyTax(res.weekly, taxType),
      monthly: applyTax(res.monthly, taxType),
      yearly: applyTax(res.yearly, taxType),
    };

    setResult({
      ...res,
      taxed,
    });
     setTimeout(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);
};
  


  const reset = () => {
    setInputValue("10320");
    setInputUnit("hourly");
    setHoursPerDay("8");
    setDaysPerMonth("22");
    setIncludeWeeklyBonus("include");
    setTaxType("none");
    setIsProbation("no");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        시급 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">급여 및 근무 조건 입력</h3>
          <InputRow
            label="급여 입력"
            tooltip={`시급, 일급, 주급, 월급, 연봉 중 하나를 입력하고 단위를 선택하세요.`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleNum(setInputValue)}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="10320"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="border rounded px-2 py-2"
            >
              <option value="hourly">시급</option>
              <option value="daily">일급</option>
              <option value="weekly">주급</option>
              <option value="monthly">월급</option>
              <option value="yearly">연봉</option>
            </select>
            <span className="text-gray-500">단위</span>
          </InputRow>
          {inputValue && (
            <div style={{ color: "#3b82f6", fontWeight: "bold", textAlign: "right", marginBottom: 8 }}>
              입력값: {addComma(Number(inputValue))} {inputUnit === "yearly" ? "원/년" : "원"}
            </div>
          )}

          <InputRow
            label="1일 근무시간"
            tooltip={`하루 기준 근무시간을 입력하세요.\n예: 8`}
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\d*(\.\d{0,2})?$"
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
            label="한 달 근무일수"
            tooltip={`한 달 기준 실제 근무일수를 입력하세요.\n(평균 22일, 주 5일 근무 기준)\n주휴수당 계산 등에도 사용됩니다.`}
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\d*(\.\d{0,1})?$"
    value={daysPerMonth}
    onChange={e => {
      const v = e.target.value;
      if (/^\d*\.?\d{0,1}$/.test(v)) setDaysPerMonth(v);
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="22.0"
  />
            <span className="text-gray-500">일</span>
          </InputRow>
          <InputRow
            label="주휴수당"
            tooltip={`주 15시간 이상 근무 시 발생하는 법정수당입니다.\n포함/제외를 선택하세요.`}
          >
            <ToggleGroup
              value={includeWeeklyBonus}
              onChange={setIncludeWeeklyBonus}
              options={[
                { value: "exclude", label: "제외" },
                { value: "include", label: "포함" },
              ]}
            />
          </InputRow>
          <InputRow
            label="세금 적용"
            tooltip={`4대보험(9.4%) 또는 원천징수(3.3%)를 선택할 수 있습니다.`}
          >
            <ToggleGroup
              value={taxType}
              onChange={setTaxType}
              options={[
                { value: "none", label: "없음" },
                { value: "insurance", label: "4대보험(9.4%)" },
                { value: "withholding", label: "3.3%" },
              ]}
            />
          </InputRow>
          <InputRow
            label="수습 여부"
            tooltip={`수습기간에는 시급의 90%만 지급할 수 있습니다.`}
          >
            <ToggleGroup
              value={isProbation}
              onChange={setIsProbation}
              options={[
                { value: "no", label: "아니오" },
                { value: "yes", label: "예" },
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>시급</span>
                <span className="font-semibold">{addComma(result.taxed.hourly)} 원</span>
              </div>
              <div className="flex justify-between">
                <span>일급</span>
                <span className="font-semibold">{addComma(result.taxed.daily)} 원</span>
              </div>
              <div className="flex justify-between">
                <span>주급</span>
                <span className="font-semibold">{addComma(result.taxed.weekly)} 원</span>
              </div>
              <div className="flex justify-between">
                <span>월급</span>
                <span className="font-semibold">{addComma(result.taxed.monthly)} 원</span>
              </div>
              <div className="flex justify-between">
                <span>연봉</span>
                <span className="font-semibold">{addComma(result.taxed.yearly)} 원</span>
              </div>
              {includeWeeklyBonus === "include" && (
                <>
                  <div className="flex justify-between">
                    <span>주휴수당(주)</span>
                    <span className="font-semibold">{addComma(result.weeklyBonus)} 원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주휴수당 적용 여부</span>
                    <span className="font-semibold">{result.eligibleWeeklyBonus ? "적용" : "미적용"}</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <KakaoShareButton />
          </div>
        </section>
      </div>
      <AdsenseBox />
      <CalculationMethodBox />
      <HourlyWageFAQBox />
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}

