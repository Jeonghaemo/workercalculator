"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

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
            입력한 시급 × 1일 근무시간
          </span>
        </li>
        <li>
          <b>일급 기준 통상임금:</b>
          <span className="ml-1">
            입력한 일급 그대로 사용
          </span>
        </li>
        <li>
          <b>월급 기준 통상임금:</b>
          <span className="ml-1">
            (입력한 월급 + 통상적 수당)  
            <br />
            1일 통상임금 = 월급 ÷ 월평균 근무일수(21.75일)  
            <br />
            시급 통상임금 = 월급 ÷ 월 소정근로시간
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
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
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
              className="w-40 border rounded px-2 py-2 text-right"
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
                className="w-40 border rounded px-2 py-2 text-right"
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
                  className="w-40 border rounded px-2 py-2 text-right"
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
                  className="w-40 border rounded px-2 py-2 text-right"
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
      <PageGrid />
    </main>
  );
}

