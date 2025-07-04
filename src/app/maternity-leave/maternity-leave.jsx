"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 툴팁
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
          <b>통상임금(월) 입력:</b>
          <span className="ml-1">
            월 기준 통상임금을 입력하세요. (정기적·일률적으로 지급되는 기본급, 고정수당 등 포함)
            <br />※ 상한액: 월 2,100,000원
          </span>
        </li>
        <li>
          <b>휴가일수 선택:</b>
          <span className="ml-1">
            출산휴가 일수를 선택하세요.
            <br />- 단태아: 90일, 미숙아: 100일, 다태아: 120일
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 월별 지급액, 총 지급 개월수, 총 출산휴가급여가 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">출산휴가급여 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>월별 지급액 산정:</b>
          <span className="ml-1">
            <b>통상임금(월)</b>과 <b>월 상한액(2,100,000원)</b> 중 작은 금액을 월별 지급액으로 산정
          </span>
        </li>
        <li>
          <b>지급 개월수 산정:</b>
          <span className="ml-1">
            <b>휴가일수 ÷ 30</b> (예: 90일 → 3개월, 100일 → 약 3.33개월, 120일 → 4개월)
          </span>
        </li>
        <li>
          <b>총 출산휴가급여:</b>
          <span className="ml-1">
            <b>월별 지급액 × 지급 개월수</b>로 산정
          </span>
        </li>
        <li>
          <b>상한액 적용:</b>
          <span className="ml-1">
            통상임금(월)이 2,100,000원을 초과할 경우 월별 지급액은 2,100,000원으로 제한
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 출산휴가급여는 고용보험에 가입된 근로자만 신청 가능하며, 실제 지급액은 고용노동부 심사 결과에 따라 달라질 수 있습니다.<br />
        ※ 상한액(월 2,100,000원)은 2025년 기준입니다.
      </div>
    </div>
  );
}


// 계산 함수
function calcMaternityPay({ wage, days = 90, maxMonthly = 2100000 }) {
  // 월 상한액, 기본 210만원
  const months = days / 30;
  const payPerMonth = Math.min(wage, maxMonthly);
  const total = Math.round(payPerMonth * months);
  return {
    payPerMonth,
    months,
    total,
    capped: wage > maxMonthly,
  };
}

export default function MaternityLeave() {
  const [wage, setWage] = useState("");
  const [days, setDays] = useState(90); // 기본 90일
  const [result, setResult] = useState(null);

  // 숫자만 입력
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  // 계산
  const handleCalc = () => {
    const wageNum = Number(wage);
    const daysNum = Number(days);
    if (!wageNum || !daysNum) {
      setResult(null);
      return;
    }
    setResult(calcMaternityPay({ wage: wageNum, days: daysNum }));
  };

  // 초기화
  const reset = () => {
    setWage("");
    setDays(90);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        출산휴가급여 계산기
      </h1>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="통상임금(월)"
            tooltip={`월 기준 통상임금을 입력하세요.\n(정기적·일률적으로 지급되는 기본급, 고정수당 등 포함)\n상한액: 월 2,100,000원`}
          >
            <input
              type="text"
              value={wage}
              onChange={handleNum(setWage)}
              className="w-40 border rounded px-2 py-2 text-right"
              placeholder="예: 2,100,000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {wage && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(wage)} 원
            </div>
          )}

          <InputRow
            label="휴가일수"
            tooltip={`출산휴가 일수를 선택하세요.\n- 단태아: 90일\n- 미숙아: 100일\n- 다태아: 120일`}
          >
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-40 border rounded px-2 py-2"
            >
              <option value={90}>90일 (단태아)</option>
              <option value={100}>100일 (미숙아)</option>
              <option value={120}>120일 (다태아)</option>
            </select>
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
                <span>월 지급액</span>
                <span className="font-semibold">
                  {addComma(result.payPerMonth)} 원
                  {result.capped && (
                    <span className="ml-2 text-xs text-gray-500">(상한 적용)</span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>지급 개월수</span>
                <span className="font-semibold">{result.months.toFixed(2)} 개월</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">총 출산휴가급여</span>
                <span className="font-bold text-blue-700">
                  {addComma(result.total)} 원
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-12">
              계산 결과가 여기에 표시됩니다.
            </div>
          )}
        </section>
      </div>
      <CalculationMethodBox />
      <PageGrid />
    </main>
  );
}


