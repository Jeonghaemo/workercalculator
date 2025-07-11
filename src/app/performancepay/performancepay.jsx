"use client";
import { useState, useRef } from "react";
import PageGrid from "../components/PageGrid";
import Script from "next/script";

// 천 단위 콤마 함수
const addComma = (value) => {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

// 간이 공제(4대보험+소득세) 계산 함수 (간단 버전)
function calcDeductions({ bonus }) {
  // 국민연금 (4.5%), 건강보험(3.545%), 장기요양(건강보험의 12.81%), 고용보험(0.9%), 소득세(2%), 지방소득세(소득세의 10%)
  const pension = Math.round(bonus * 0.045);
  const health = Math.round(bonus * 0.03545);
  const care = Math.round(health * 0.1281);
  const employment = Math.round(bonus * 0.009);
  const incomeTax = Math.round(bonus * 0.02);
  const localTax = Math.round(incomeTax * 0.1);
  const total = pension + health + care + employment + incomeTax + localTax;
  return { pension, health, care, employment, incomeTax, localTax, total };
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

// 성과급 계산기 설명 박스
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
          <span className="font-bold">성과급 계산기</span>는 회사의 기준급(연봉, 월급, 기본급 등)과 평가등급별 지급률을 바탕으로 <span className="font-bold">예상 성과급(세전/세후)</span>을 계산합니다.
        </li>
        <li>
          성과급은 회사마다 산정 방식이 다르며, 실제 지급률·지급 기준은 인사/급여 규정, 평가 등급에 따라 달라질 수 있습니다.
        </li>
        <li>
          <span className="font-bold">세후 성과급</span>은 국민연금, 건강보험, 장기요양, 고용보험, 소득세, 지방소득세 등 공제액을 반영한 참고값입니다.
        </li>
        <li>
          <span className="font-bold">성과급 지급 기준</span>은 아래 계산방법을 참고하세요.
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
          <b>기준급 선택:</b>
          <span className="ml-1">
            성과급 산정의 기준이 되는 금액(연봉, 월급, 기본급 등)을 선택하세요.
          </span>
        </li>
        <li>
          <b>기준급 입력:</b>
          <span className="ml-1">
            실제 연봉, 월급, 기본급 등 세전 금액을 입력하세요.
          </span>
        </li>
        <li>
          <b>지급률(%) 입력:</b>
          <span className="ml-1">
            본인 평가등급(또는 회사 기준)에 맞는 지급률(%)을 입력하세요. 예: 100%, 120% 등.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 세전/세후 성과급이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">성과급 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>성과급 산정:</b>
          <span className="ml-1">
            성과급 = 기준급 × 지급률(%)<br />
            예시: 연봉 5,000만원 × 12% = 600만원, 월급 300만원 × 100% = 300만원
          </span>
        </li>
        <li>
          <b>공제액 산정:</b>
          <span className="ml-1">
            국민연금(4.5%), 건강보험(3.545%), 장기요양(건강보험의 12.81%), 고용보험(0.9%), 소득세(2%), 지방소득세(소득세의 10%)를 공제<br />
            예시: 600만원 성과급 → 공제 총액 약 47만원, 세후 약 553만원
          </span>
        </li>
        <li>
          <b>실수령액 산정:</b>
          <span className="ml-1">
            세전 성과급 - 공제액 = 세후 성과급<br />
            예시: 600만원 - 47만원 = 553만원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 실제 지급액은 회사 규정, 평가등급, 세금, 4대보험, 기타 공제항목에 따라 달라질 수 있습니다.<br />
        ※ 본 계산기는 참고용 예시입니다.
      </div>
    </div>
  );
}

function BonusFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">성과급 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 성과급에도 세금이 부과되나요?</div>
          <div>
            부과됩니다. <b>성과급</b>은 근로소득에 해당하므로 <b>소득세</b>, 4대보험(국민연금, 건강보험, 고용보험 등) 등 각종 <b>세금</b>이 공제됩니다. 성과급이 지급되는 달의 월급과 합산해 원천징수하며, 연말정산 시에도 합산되어 최종 세액이 결정됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 상여금과 성과급은 어떻게 다르고, 계산은 어떻게 하나요?</div>
          <div>
            <b>상여금</b>은 정기적으로 지급되는 보너스(예: 매월, 분기, 연 1회 등)로, 연봉에 포함될 수도 있고 별도로 지급될 수도 있습니다. <b>성과급</b>은 회사의 경영실적, 개인·팀 성과 등에 따라 지급되는 일시적 보상입니다. 연봉에 상여금이 포함된 경우 월급에 나누어 반영되고, 별도라면 지급 시기에 따라 별도로 계산합니다. 상여금과 성과급 모두 세금이 공제되며, 지급 기준은 근로계약서나 취업규칙에 명시되어 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 성과급 계산 시 통상임금은 어떤 역할을 하나요?</div>
          <div>
            <b>통상임금</b>은 연장·야간·휴일근로수당, 퇴직금 등 각종 법정수당의 산정 기준이 되는 임금입니다. 일부 회사는 성과급이나 상여금 산정 시 통상임금을 기준으로 지급률을 정하기도 하며, 정기적·일률적으로 지급되는 상여금은 통상임금에 포함될 수 있습니다. 지급 방식과 포함 여부는 회사의 규정에 따라 다르니, 반드시 근로계약서와 취업규칙을 확인하세요.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 성과급을 받으면 실수령액은 얼마나 되나요?</div>
          <div>
            <b>성과급</b>은 세전 금액에서 소득세, 4대보험 등 각종 세금이 공제된 후 실제 <b>실수령액</b>이 결정됩니다. 세율은 성과급 금액, 월급, 부양가족 수, 비과세 항목 등에 따라 달라질 수 있으니, 정확한 실수령액은 계산기를 통해 확인하는 것이 좋습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 상여금이나 성과급이 연봉에 포함되나요?</div>
          <div>
            회사마다 다르며, <b>상여금</b>이나 <b>성과급</b>이 연봉에 포함되어 있으면 월급에 나누어 반영됩니다. 별도로 지급되는 경우 해당 지급 시기에만 추가로 수령하게 됩니다. 연봉 명세서, 근로계약서에서 포함 여부를 반드시 확인하세요.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BonusCalculator() {
  const [baseType, setBaseType] = useState("annual");
  const [baseAmount, setBaseAmount] = useState("50000000");
  const [rate, setRate] = useState("12");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null); // 결과 스크롤용 ref

  // 입력창에는 콤마 없이 숫자만
  const handleBaseAmountChange = (e) => {
    setBaseAmount(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleRateChange = (e) => {
    setRate(e.target.value.replace(/[^0-9.]/g, ""));
  };

  const handleCalc = () => {
    const baseNum = Number(baseAmount);
    const rateNum = Number(rate);
    let bonus = Math.round(baseNum * (rateNum / 100));
    const deductions = calcDeductions({ bonus });
    setResult({ bonus, ...deductions });

    // 계산 후 모바일에서 결과로 스크롤
    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const reset = () => {
    setBaseType("annual");
    setBaseAmount("50000000");
    setRate("12");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        성과급 계산기
      </h1>
      <IntroBox />
      <div className="my-6 max-w-3xl mx-auto px-2 sm:px-4 w-full">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4564123418761220"
          data-ad-slot="2809714485"
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-language="ko"
        ></ins>
        <Script id="adsbygoogle-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">성과급 입력</h3>
          <InputRow
            label="기준급 종류"
            tooltip={`성과급 산정의 기준이 되는 금액을 선택하세요.\n회사마다 연봉, 월급, 기본급 등 다양하게 사용합니다.`}
          >
            <button
              onClick={() => setBaseType("annual")}
              className={`px-6 py-2 rounded border ${baseType === "annual" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
            >
              연봉
            </button>
            <button
              onClick={() => setBaseType("monthly")}
              className={`px-6 py-2 rounded border ${baseType === "monthly" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
            >
              월급
            </button>
            <button
              onClick={() => setBaseType("basic")}
              className={`px-6 py-2 rounded border ${baseType === "basic" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
            >
              기본급
            </button>
          </InputRow>
          <InputRow
            label={baseType === "annual" ? "연봉" : baseType === "monthly" ? "월급" : "기본급"}
            tooltip={`성과급 산정의 기준이 되는 금액을 입력하세요.`}
          >
            <input
              type="text"
              value={baseAmount}
              onChange={handleBaseAmountChange}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="50000000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {baseAmount && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(baseAmount)} 원
            </div>
          )}
          <InputRow
            label="지급률(%)"
            tooltip={`성과급 지급률(%)을 입력하세요.\n예: 12% (연봉의 12%), 100% (월급의 100%) 등`}
          >
            <input
              type="text"
              value={rate}
              onChange={handleRateChange}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="decimal"
              pattern="[0-9.]*"
              placeholder="12"
            />
            <span className="text-gray-500">%</span>
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
          {result && (
            <>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">세전 성과급</span>
                <span className="font-semibold">{addComma(String(result.bonus))} 원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">공제액 합계</span>
                <span className="font-semibold">{addComma(String(result.total))} 원</span>
              </div>
              <ul className="mb-4">
                <li className="flex justify-between">
                  <span>국민연금</span>
                  <span>{addComma(String(result.pension))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>건강보험</span>
                  <span>{addComma(String(result.health))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>장기요양</span>
                  <span>{addComma(String(result.care))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>고용보험</span>
                  <span>{addComma(String(result.employment))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>소득세</span>
                  <span>{addComma(String(result.incomeTax))} 원</span>
                </li>
                <li className="flex justify-between">
                  <span>지방소득세</span>
                  <span>{addComma(String(result.localTax))} 원</span>
                </li>
              </ul>
              <div className="bg-blue-50 rounded-lg p-6 mt-8 flex flex-col items-center">
                <span className="text-gray-700 mb-2">예상 실수령액(세후)</span>
                <span className="text-3xl font-bold text-blue-700">
                  {addComma(String(result.bonus - result.total))}원
                </span>
              </div>
            </>
          )}
          {!result && (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <CalculationMethodBox />
      <BonusFAQBox />
      <PageGrid />
    </main>
  );
}


