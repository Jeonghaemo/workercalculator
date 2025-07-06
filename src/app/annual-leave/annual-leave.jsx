"use client";
import { useState } from "react";
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

// 연차수당 계산 함수
function calcAnnualLeavePay({ wage, unit, hoursPerDay, leaveDays }) {
  let dailyPay = 0;
  switch (unit) {
    case "hourly":
      dailyPay = wage * hoursPerDay;
      break;
    case "daily":
      dailyPay = wage;
      break;
    case "monthly":
      // 월급 ÷ (주평균근무일수 × 4.345)
      dailyPay = wage / (5 * 4.345); // 기본값: 주5일제
      break;
    default:
      dailyPay = wage * hoursPerDay;
  }
  const total = dailyPay * leaveDays;
  return {
    dailyPay: Math.round(dailyPay),
    total: Math.round(total),
  };
}

export default function AnnualLeaveCalculator() {
  const [inputValue, setInputValue] = useState("10030");
  const [inputUnit, setInputUnit] = useState("hourly");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [leaveDays, setLeaveDays] = useState("5");
  const [result, setResult] = useState(null);

  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!inputValue || !hoursPerDay || !leaveDays) {
      setResult(null);
      return;
    }
    const wage = Number(inputValue);
    const res = calcAnnualLeavePay({
      wage,
      unit: inputUnit,
      hoursPerDay: Number(hoursPerDay),
      leaveDays: Number(leaveDays),
    });
    setResult(res);
  };

  const reset = () => {
    setInputValue("10030");
    setInputUnit("hourly");
    setHoursPerDay("8");
    setLeaveDays("5");
    setResult(null);
  };

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
          <b>임금 단위 선택 및 입력:</b> 
          <span className="ml-1">
            시급, 일급, 월급 중 본인에게 해당하는 급여 단위를 선택하고 해당 금액을 입력하세요. 
            (예: 시급 근로자는 시급, 월급 근로자는 월급)
          </span>
        </li>
        <li>
          <b>1일 근무시간 입력:</b>
          <span className="ml-1">
            시급을 선택한 경우, 하루에 실제로 일하는 시간을 입력하세요. (예: 8시간)
          </span>
        </li>
        <li>
          <b>미사용 연차일수 입력:</b>
          <span className="ml-1">
            지급받을 연차(유급휴가) 미사용 일수를 입력하세요. (예: 5일)
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목을 입력한 뒤 <b>계산하기</b> 버튼을 누르면, 1일 연차수당과 총 연차수당이 자동으로 계산되어 표시됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">연차수당 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>1일 연차수당 계산</b>
          <ul className="list-disc list-inside ml-5">
            <li>
              시급: <b>시급 × 1일 근무시간</b><br />
              예시: 시급 10,300원, 1일 8시간 → 10,300 × 8 = 82,400원
            </li>
            <li>
              일급: <b>입력한 일급 그대로 사용</b><br />
              예시: 일급 82,400원 입력 시 → 82,400원
            </li>
            <li>
              월급: <b>월급 ÷ (주평균근무일수 × 4.345)</b> (주5일제 기준 21.725)<br />
              예시: 월급 2,152,700원, 8시간 근무, 주5일 → 2,152,700 ÷ 21.725 ≈ 99,126원
            </li>
          </ul>
        </li>
        <li>
          <b>총 연차수당</b> = 1일 연차수당 × 미사용 연차일수<br />
          예시: 1일 연차수당 99,126원, 미사용 연차 7일 → 99,126 × 7 = 693,882원
        </li>
        <li>
          <b>1년 미만 신입사원 비례산정 예시</b><br />
          월급 3,000,000원, 8개월 근무, 1년 기준 연차 15일<br />
          비례 연차: 8/12 × 15 = 10일<br />
          1일 연차수당: 3,000,000 ÷ 30 = 100,000원<br />
          총 연차수당: 100,000 × 10 = 1,000,000원
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 4.345는 1년(52주)을 월 단위로 환산한 평균 주 수입니다.<br />
        ※ 연차수당은 연차를 사용하지 않은 책임이 근로자에게 없을 때 지급됩니다.<br />
        ※ 지급 기준일의 마지막 달 임금을 기준으로 산정합니다.
      </div>
    </div>
  );
}


  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        연차수당 계산기
      </h1>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="임금 입력"
            tooltip={`시급, 일급 또는 월급을 입력하고 단위를 선택하세요.\n2025년 최저시급: 10,030원`}
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
              <option value="monthly">월급</option>
            </select>
            <span className="text-gray-500">단위</span>
          </InputRow>
          {inputUnit === "hourly" && (
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
          )}
          <InputRow
            label="미사용 연차일수"
            tooltip={`지급받을 연차(유급휴가) 미사용 일수를 입력하세요.`}
          >
            <input
              type="text"
              value={leaveDays}
              onChange={handleNum(setLeaveDays)}
              className="w-40 border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="5"
            />
            <span className="text-gray-500">일</span>
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
                <span>1일 연차수당</span>
                <span className="font-semibold">{addComma(result.dailyPay)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>총 연차수당</span>
                <span className="font-bold text-blue-700">{addComma(result.total)} 원</span>
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
