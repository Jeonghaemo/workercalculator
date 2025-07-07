"use client";
import { useState } from "react";
import Link from "next/link";
import PageGrid from "../components/PageGrid";

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
    <div className="flex items-center gap-3 mb-4 min-h-[48px]">
      <label className="w-48 shrink-0 flex items-center text-gray-700 font-medium">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="flex-1 flex items-center gap-2">{children}</div>
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
            <li>시급: 입력값 그대로 사용<br />예시: 시급 10,030원 입력 시 → 10,030원</li>
            <li>일급: <b>일급 ÷ 1일 근무시간</b><br />예시: 일급 80,240원, 1일 8시간 → 80,240 ÷ 8 = 10,030원</li>
            <li>주급: <b>주급 ÷ (1일 근무시간 × 한 달 근무일수 ÷ 4.345)</b><br />예시: 주급 401,200원, 1일 8시간, 22일 → 401,200 ÷ (8 × 22 ÷ 4.345) ≈ 10,030원</li>
            <li>월급: <b>월급 ÷ (1일 근무시간 × 한 달 근무일수)</b><br />예시: 월급 1,760,640원, 8시간, 22일 → 1,760,640 ÷ (8 × 22) = 10,030원</li>
            <li>연봉: <b>연봉 ÷ (1일 근무시간 × 한 달 근무일수 × 12)</b><br />예시: 연봉 21,127,680원, 8시간, 22일 → 21,127,680 ÷ (8 × 22 × 12) = 10,030원</li>
          </ul>
        </li>
        <li>
          <b>주휴수당</b>
          <ul className="list-disc list-inside ml-5">
            <li>
              주 15시간 이상 근무 시, 1주일에 1일치 임금(1일 근무시간 × 시급)이 주휴수당으로 추가됩니다.<br />
              예시: 1일 8시간, 시급 10,030원 → 8 × 10,030 = 80,240원(주휴수당)
            </li>
          </ul>
        </li>
        <li>
          <b>각 단위별 환산</b>
          <ul className="list-disc list-inside ml-5">
            <li>일급: <b>시급 × 1일 근무시간</b><br />예시: 10,030 × 8 = 80,240원</li>
            <li>주급: <b>일급 × (한 달 근무일수 ÷ 4.345) + 주휴수당</b><br />예시: 80,240 × (22 ÷ 4.345) + 80,240 ≈ 484,480원</li>
            <li>월급: <b>시급 × 1일 근무시간 × 한 달 근무일수 + 주휴수당 × 4.345</b><br />예시: 10,030 × 8 × 22 + 80,240 × 4.345 ≈ 2,112,768원</li>
            <li>연봉: <b>월급 × 12</b><br />예시: 2,112,768 × 12 = 25,353,216원</li>
          </ul>
        </li>
        <li>
          <b>세금 공제</b>
          <ul className="list-disc list-inside ml-5">
            <li>4대보험: 9.4% 차감, 원천징수: 3.3% 차감, 선택에 따라 적용<br />예시: 월급 2,112,768원, 4대보험 선택 시 → 2,112,768 × 0.906 = 1,914,170원</li>
          </ul>
        </li>
        <li>
          <b>수습기간</b>
          <ul className="list-disc list-inside ml-5">
            <li>수습기간(최대 3개월)에는 시급의 90%만 적용<br />예시: 시급 10,030원 → 10,030 × 0.9 = 9,027원</li>
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



// 급여 단위별 환산 함수 (daysPerMonth만 사용)
function convertSalary({ value, unit, hoursPerDay, daysPerMonth, includeWeeklyBonus }) {
  const weekPerMonth = 4.345;
  let hourly = 0;

  // 1. 기준 시급 환산
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

  // 2. 주휴수당 계산
  const daysPerWeek = daysPerMonth / weekPerMonth;
  const eligibleWeeklyBonus = daysPerWeek * hoursPerDay >= 15;
  const weeklyBonus = includeWeeklyBonus && eligibleWeeklyBonus ? hourly * hoursPerDay : 0;

  // 3. 환산
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
    <div className="flex border rounded overflow-hidden w-fit">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`px-5 py-2 text-sm font-semibold border-r last:border-r-0
            ${value === opt.value
              ? "bg-blue-200 text-blue-800 ring-1 ring-blue-300"
              : "bg-white text-blue-700 hover:bg-blue-50"}
            transition`}
          onClick={() => onChange(opt.value)}
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
  const [inputValue, setInputValue] = useState("10030");
  const [inputUnit, setInputUnit] = useState("hourly");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerMonth, setDaysPerMonth] = useState("22");
  const [includeWeeklyBonus, setIncludeWeeklyBonus] = useState("include");
  const [taxType, setTaxType] = useState("none");
  const [isProbation, setIsProbation] = useState("no");
  const [result, setResult] = useState(null);

  // 입력 숫자만
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  // 계산
  const handleCalc = () => {
    if (!inputValue || !hoursPerDay || !daysPerMonth) {
      setResult(null);
      return;
    }
    let value = Number(inputValue);
    // 수습기간이면 시급 90% 적용
    if (isProbation === "yes" && inputUnit === "hourly") value = Math.floor(value * 0.9);

    const res = convertSalary({
      value,
      unit: inputUnit,
      hoursPerDay: Number(hoursPerDay),
      daysPerMonth: Number(daysPerMonth),
      includeWeeklyBonus: includeWeeklyBonus === "include",
    });

    // 세금 적용
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
  };

  const reset = () => {
    setInputValue("10030");
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
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">급여 및 근무 조건 입력</h3>

          {/* 급여 입력 */}
          <InputRow
            label="급여 입력"
            tooltip={`시급, 일급, 주급, 월급, 연봉 중 하나를 입력하고 단위를 선택하세요.`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleNum(setInputValue)}
              className="w-40 border rounded px-2 py-2 text-right"
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

          {/* 근무 조건 */}
          <InputRow
            label="1일 근무시간"
            tooltip={`하루 기준 근무시간을 입력하세요.\n예: 8`}
          >
            <input
              type="text"
              value={hoursPerDay}
              onChange={handleNum(setHoursPerDay)}
              className="w-40 border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="8"
            />
            <span className="text-gray-500">시간</span>
          </InputRow>
          <InputRow
            label="한 달 근무일수"
            tooltip={`한 달 기준 실제 근무일수를 입력하세요.\n(평균 22일, 주 5일 근무 기준)\n주휴수당 계산 등에도 사용됩니다.`}
          >
            <input
              type="text"
              value={daysPerMonth}
              onChange={handleNum(setDaysPerMonth)}
              className="w-40 border rounded px-2 py-2 text-right"
              min={1}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="22"
            />
            <span className="text-gray-500">일</span>
          </InputRow>

          {/* 주휴수당 포함/미포함 토글 */}
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

          {/* 세금 적용 토글 */}
          <InputRow
            label="세금 적용"
            tooltip={`4대보험(9.4%) 또는 원천징수(3.3%)를 선택할 수 있습니다.`}
          >
            <ToggleGroup
              value={taxType}
              onChange={setTaxType}
              options={[
                { value: "none", label: "없음" },
                { value: "insurance", label: "9.4%" },
                { value: "withholding", label: "3.3%" },
              ]}
            />
          </InputRow>

          {/* 수습 여부 토글 */}
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
        </section>
      </div>
      <CalculationMethodBox />
      <PageGrid />
    </main>
  );
}
