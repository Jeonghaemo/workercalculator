"use client";
import { useState, useRef } from "react";
import PageGrid from "../components/PageGrid";
import Link from "next/link";
import Script from "next/script";
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
          <span className="font-bold">연차수당 계산기</span>로 <span className="font-bold">미사용 연차수당</span>을 간편하게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">연차수당</span>은 <span className="font-bold">미사용 연차일수 × 1일 통상임금</span>으로 계산됩니다.
        </li>
        <li>
          <span className="font-bold">1일 통상임금</span>은 <span className="font-bold">월급 ÷ 월 소정근로시간 × 1일 근로시간</span>으로 산정합니다.
        </li>
        <li>
          통상임금은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/ordinary"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            통상임금 계산기
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

function AnnualLeaveFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">연차수당 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 연차수당은 언제, 어떤 기준으로 지급되나요?</div>
          <div>
            연차수당은 <b>연차휴가 발생 후 1년 이내에 사용하지 않은 연차</b>에 대해 <b>다음 연도 초에 일괄 지급</b>하는 것이 원칙입니다. 퇴직 시 미사용 연차가 남아 있다면 퇴직일 기준으로 정산하여 지급합니다. 지급기준은 근로기준법에 따라 회사마다 다를 수 있지만, 법정 기준을 반드시 따라야 합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 연차수당 계산 시 통상임금은 어떻게 산정하나요?</div>
          <div>
            <b>통상임금</b>은 <b>월급(기본급 + 고정수당 등) ÷ 1개월 소정근로시간 × 1일 근로시간</b>으로 계산합니다. 미사용 연차수당은 <b>연차 미사용일수 × 1일 통상임금</b>으로 산정합니다. 통상임금은 연차를 청구할 수 있는 마지막 달의 임금을 기준으로 산정하는 것이 원칙입니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 신입사원이나 1년 미만 근로자도 연차수당을 받을 수 있나요?</div>
          <div>
            받을 수 있습니다. <b>1년 미만 근로자도 1개월 개근 시 1일의 연차가 발생</b>하며, 사용하지 않은 경우 연차수당을 받을 수 있습니다. 다만, 출근율 80% 미만 등 일부 조건에서는 발생하지 않을 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 연차수당 지급 시 세금이 부과되나요?</div>
          <div>
            부과됩니다. 연차수당은 세금이 부과되는<b>근로소득</b>이며 회사가 원천징수 후 지급하는 것이 일반적입니다.
실제 공제 내역과 세율은 근로자의 연간 소득, 회사의 급여 시스템 등에 따라 다를 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 연차수당 지급기준이 회사마다 다를 수 있나요?</div>
          <div>
            일부 회사는 취업규칙이나 단체협약에 따라 지급 시기나 방식이 다를 수 있지만, <b>최소한 법정 기준(근로기준법)</b>은 반드시 준수해야 합니다. 회사 규정이 법정 기준보다 불리하면 법정 기준이 우선 적용됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 연차수당과 퇴직금은 별개인가요?</div>
          <div>
            <b>연차수당과 퇴직금은 별개</b>로 산정·지급됩니다. 퇴직 시 미사용 연차수당은 퇴직금과 별도로 지급받을 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnnualLeaveCalculator() {
  const [inputValue, setInputValue] = useState("10030");
  const [inputUnit, setInputUnit] = useState("hourly");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [leaveDays, setLeaveDays] = useState("5");
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
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
    setLeaveDays("5");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8 w-full">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        연차수당 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="임금 입력"
            tooltip={`시급, 일급 또는 월급을 입력하고 단위를 선택하세요.\n2025년 최저시급: 10,030원`}
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
          )}
          <InputRow
            label="미사용 연차일수"
            tooltip={`지급받을 연차(유급휴가) 미사용 일수를 입력하세요.`}
          >
             <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*(\\.\\d{0,2})?$"
    value={leaveDays}
    onChange={e => {
      const v = e.target.value;
      if (/^\d*\.?\d{0,2}$/.test(v)) setLeaveDays(v);
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="5.00"
  />
            <span className="text-gray-500">일</span>
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
             <div style={{ marginTop: 24, textAlign: "center" }}>
            <KakaoShareButton />
          </div>
        </section>
      </div>
      <AdsenseBox />
      <CalculationMethodBox />
      <AnnualLeaveFAQBox />
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}
