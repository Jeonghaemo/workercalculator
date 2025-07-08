"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";

// 천 단위 콤마 함수
const addComma = (value) => {
  if (!value && value !== 0) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 연금 지급액 공식(원리금 균등분할)
function calcPensionPayment(principal, rate, years, payCycle) {
  const n = Math.floor((years * 12) / payCycle);
  const r = rate / 100 / 12 * payCycle;
  if (r === 0) return Math.round(principal / n);
  return Math.round(principal * (r / (1 - Math.pow(1 + r, -n))));
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

// InputRow 컴포넌트 (입력값은 input 아래 줄바꿈)
function InputRow({ label, tooltip, children, inputValue }) {
  return (
    <div className="mb-4 min-h-[48px]">
      <div className="flex items-center gap-3">
        <label className="w-48 shrink-0 flex items-center text-gray-700 font-medium">
          {label}
          {tooltip && <Tooltip text={tooltip} />}
        </label>
        <div className="flex-1 flex items-center gap-2">{children}</div>
      </div>
      {inputValue !== undefined && inputValue !== "" && (
        <div className="w-full text-blue-600 font-bold text-right mt-1">
          입력값: {addComma(inputValue)} 원
        </div>
      )}
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
          <span className="font-bold">퇴직연금(연금형) 예상 수령액 계산기</span>를 이용해 <span className="font-bold">퇴직금, 개인부담금, 거치기간, 수익률, 연금지급기간</span> 등 입력 시 <span className="font-bold">월 예상 연금액</span>을 확인할 수 있습니다.
        </li>
        <li>
          연금 지급주기(1/3/6/12개월)와 연금수령기간 운용수익률도 반영됩니다.
        </li>
        <li>
          실제 수령액은 세금, 수수료, 중도인출 등 여러 요인에 따라 달라질 수 있습니다.
        </li>
        <li>
          <span className="font-bold text-blue-700">
            예상 퇴직금은 <a href="https://workercalculator.damoapick.co.kr/retirement" target="_blank" rel="noopener noreferrer" className="underline">퇴직금 계산기</a>에서 확인하세요.
          </span>
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
          <b>퇴직금(예상):</b>
          <span className="ml-1">
            퇴직 시 받을 금액을 입력하세요. <b>정확한 금액은 퇴직금 계산기에서 확인</b>할 수 있습니다.
          </span>
        </li>
        <li>
          <b>개인부담금(예상):</b>
          <span className="ml-1">
            퇴직 전까지 본인이 추가로 적립할 금액(이익 포함)을 입력하세요.
          </span>
        </li>
        <li>
          <b>거치기간(개월) 및 수익률:</b>
          <span className="ml-1">
            퇴직 후 연금 개시 전까지 IRP로 운용할 기간(개월)과 예상 수익률(%)을 입력하세요. <br />
            <b>거치기간이란?</b> 퇴직금을 한 번에 받지 않고 일정 기간 IRP에 두고 운용하는 기간입니다.
          </span>
        </li>
        <li>
          <b>연금지급기간(년):</b>
          <span className="ml-1">
            연금을 받을 기간(년 단위, 최대 50년)을 입력하세요.
          </span>
        </li>
        <li>
          <b>연금 지급주기:</b>
          <span className="ml-1">
            1/3/6/12개월 중 원하는 지급주기를 선택하세요. <b>예: 1개월 → 매월 연금 수령</b>
          </span>
        </li>
        <li>
          <b>연금수령기간 수익률(%):</b>
          <span className="ml-1">
            연금 수령기간 중에도 남은 적립금이 운용될 경우, 예상 수익률(%)을 입력하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 월 예상 연금액이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">퇴직연금(연금형) 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>적립금 산정:</b>
          <span className="ml-1">
            퇴직금 + 개인부담금에 거치기간 운용수익률을 반영해 최종 적립금을 산정합니다.
          </span>
        </li>
        <li>
          <b>연금 지급액 산정(원리금 균등분할):</b>
          <span className="ml-1">
            적립금 × [월이율 / (1 - (1+월이율)<sup>-개월수</sup>)]<br />
            월이율 = 연금수령기간 운용수익률 ÷ 12<br />
            예시: 1억원, 연 3%, 20년 수령 → 약 55만원/월
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 실제 수령액은 수익률, 세금, 수수료, 중도인출 등에 따라 달라질 수 있습니다.<br />
        ※ 이 계산기는 참고용으로, 금융기관의 실제 상품과 차이가 있을 수 있습니다.
      </div>
    </div>
  );
}

export default function RetirementPensionCalculator() {
  const [severance, setSeverance] = useState("");
  const [personal, setPersonal] = useState("");
  const [deferMonths, setDeferMonths] = useState("");
  const [deferRate, setDeferRate] = useState(3);
  const [pensionYears, setPensionYears] = useState(20);
  const [payCycle, setPayCycle] = useState(1);
  const [pensionRate, setPensionRate] = useState(3);
  const [result, setResult] = useState(null);

  // 입력값 숫자만
  const handleNum = (setter) => (e) => setter(e.target.value.replace(/[^0-9]/g, ""));

  // 계산
  const handleCalc = () => {
    const principal = Number(severance || 0) + Number(personal || 0);
    const deferM = Number(deferMonths || 0);
    const deferR = Number(deferRate || 0) / 100 / 12;
    let afterDefer = principal;
    if (deferM > 0 && deferR > 0) {
      afterDefer = Math.round(principal * Math.pow(1 + deferR, deferM));
    }
    const years = Number(pensionYears || 0);
    const payC = Number(payCycle || 1);
    const pensionR = Number(pensionRate || 0);
    const payment = calcPensionPayment(afterDefer, pensionR, years, payC);
    setResult({
      afterDefer,
      payment,
      payCycle: payC,
      total: payment * Math.floor((years * 12) / payC),
    });
  };

  // 초기화
  const reset = () => {
    setSeverance("");
    setPersonal("");
    setDeferMonths("");
    setDeferRate(3);
    setPensionYears(20);
    setPayCycle(1);
    setPensionRate(3);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        퇴직연금(연금형) 예상 수령액 계산기
      </h1>
      <IntroBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">입력 정보</h3>
          <InputRow
            label="퇴직금(예상)"
            tooltip="퇴직 시 받을 금액을 입력하세요. 정확한 금액은 퇴직금 계산기에서 확인할 수 있습니다."
            inputValue={severance}
          >
            <input
              type="text"
              value={severance}
              onChange={handleNum(setSeverance)}
              className="w-48 border rounded px-2 py-2 text-right"
              placeholder="예: 80000000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          <InputRow
            label="개인부담금(예상)"
            tooltip="퇴직 전까지 본인이 추가로 적립할 금액(이익 포함)을 입력하세요. IRP, DC형 추가 납입 등 모두 포함합니다."
            inputValue={personal}
          >
            <input
              type="text"
              value={personal}
              onChange={handleNum(setPersonal)}
              className="w-48 border rounded px-2 py-2 text-right"
              placeholder="예: 20000000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          <InputRow
            label="IRP 거치기간"
            tooltip="퇴직 후 연금 개시 전까지 IRP로 운용할 기간(개월)을 입력하세요. 이 기간 동안 적립금이 불어납니다."
          >
            <input
              type="text"
              value={deferMonths}
              onChange={handleNum(setDeferMonths)}
              className="w-24 border rounded px-2 py-2 text-right"
              placeholder="예: 12"
            />
            <span className="text-gray-500">개월</span>
          </InputRow>
          <InputRow
            label="거치기간 수익률(%)"
            tooltip="거치기간 동안 예상되는 연평균 수익률(%)을 입력하세요. 일반적으로 2~5% 사이로 가정합니다."
          >
            <input
              type="number"
              value={deferRate}
              onChange={(e) => setDeferRate(Number(e.target.value))}
              className="w-24 border rounded px-2 py-2 text-right"
              min={0}
              max={20}
            />
            <span className="text-gray-500">%</span>
          </InputRow>
          <InputRow
            label="연금지급기간(년)"
            tooltip="연금을 받을 기간(년 단위, 최대 50년)을 입력하세요. 기간이 길수록 월 수령액은 줄어듭니다."
          >
            <input
              type="number"
              value={pensionYears}
              onChange={(e) => setPensionYears(Number(e.target.value))}
              className="w-24 border rounded px-2 py-2 text-right"
              min={1}
              max={50}
            />
            <span className="text-gray-500">년</span>
          </InputRow>
          <InputRow
            label="연금 지급주기"
            tooltip="연금을 받을 주기를 선택하세요. 1개월: 매월, 3개월: 분기, 6개월: 반기, 12개월: 연 1회 수령."
          >
            <select
              value={payCycle}
              onChange={(e) => setPayCycle(Number(e.target.value))}
              className="w-24 border rounded px-2 py-2"
            >
              <option value={1}>1개월</option>
              <option value={3}>3개월</option>
              <option value={6}>6개월</option>
              <option value={12}>12개월</option>
            </select>
          </InputRow>
          <InputRow
            label="연금수령기간 수익률(%)"
            tooltip="연금 수령기간 중에도 남은 적립금이 운용될 경우, 예상 수익률(%)을 입력하세요."
          >
            <input
              type="number"
              value={pensionRate}
              onChange={(e) => setPensionRate(Number(e.target.value))}
              className="w-24 border rounded px-2 py-2 text-right"
              min={0}
              max={20}
            />
            <span className="text-gray-500">%</span>
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
                <span>거치기간 후 적립금</span>
                <span className="font-bold">{addComma(result.afterDefer)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  {result.payCycle === 1
                    ? "월별 예상 연금 수령액"
                    : `${result.payCycle}개월마다 예상 연금 수령액`}
                </span>
                <span className="font-bold text-blue-700">{addComma(result.payment)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>총 수령액(예상)</span>
                <span className="font-bold">{addComma(result.total)} 원</span>
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
