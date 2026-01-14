"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import PageGrid from "../components/PageGrid";
import Script from "next/script";
import AdsenseBox from "../components/AdsenseBox";
import MobileToolbar from "../components/MobileToolbar";
import KakaoShareButton from "../components/KakaoShareButton";

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
      <label className="w-full sm:w-48 shrink-0 flex items-center text-gray-700 font-medium whitespace-nowrap">
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
          <span className="font-bold">연장/야근/휴일수당 계산기</span>로 <span className="font-bold">법정 근로시간 초과 수당</span>을 간편하게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">연장근로수당</span>은 1일 8시간, 주 40시간을 초과한 근로에 대해 <span className="font-bold">통상임금의 50% 이상</span>을 가산해 지급합니다.
        </li>
        <li>
          <span className="font-bold">야간근로수당</span>은 오후 10시~다음날 오전 6시 근로에 대해 <span className="font-bold">통상임금의 50% 이상</span>을 가산합니다.
        </li>
        <li>
          <span className="font-bold">휴일근로수당</span>은 소정근로일이 아닌 휴일 근로 시 8시간 이내는 <span className="font-bold">통상임금의 50% 이상</span>, 8시간 초과는 <span className="font-bold">100% 가산</span>이 적용됩니다.
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
          <b>시급 입력:</b>
          <span className="ml-1">
            세전 통상임금을 입력하세요. (예: 10,320원)
          </span>
        </li>
        <li>
          <b>연장근로시간 입력:</b>
          <span className="ml-1">
            1주 40시간을 초과한 연장근로 시간을 입력하세요. (1.5배 적용)
          </span>
        </li>
        <li>
          <b>야간근로시간 입력:</b>
          <span className="ml-1">
            야간(22:00~06:00) 근로시간 중 0.5배 가산분만 입력하세요.
          </span>
        </li>
        <li>
          <b>휴일근로시간(8시간 이하/초과) 입력:</b>
          <span className="ml-1">
            휴일근로(법정휴일, 일요일 등) 8시간 이하는 1.5배, 8시간 초과분은 2배 적용됩니다. 각각 시간 입력란에 입력하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 각 수당과 총 수당이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">연장/야간/휴일수당 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>연장근로수당:</b>
          <span className="ml-1">
            <b>시급 × 1.5 × 연장근로시간</b><br />
            예시: 시급 10,000원, 연장근로 4시간 → 10,000 × 1.5 × 4 = <b>60,000원</b>
          </span>
        </li>
        <li>
          <b>야간근로수당:</b>
          <span className="ml-1">
            <b>시급 × 0.5 × 야간근로시간</b><br />
            예시: 시급 10,000원, 야간근로 3시간 → 10,000 × 0.5 × 3 = <b>15,000원</b>
          </span>
        </li>
        <li>
          <b>휴일근로수당:</b>
          <span className="ml-1">
            <b>시급 × 1.5 × 휴일근로시간(8시간 이하)</b> + <b>시급 × 2 × 휴일근로시간(8시간 초과)</b><br />
            예시: 시급 10,000원, 휴일근로 6시간(8시간 이하) → 10,000 × 1.5 × 6 = <b>90,000원</b><br />
            시급 10,000원, 휴일근로 10시간(8시간 이하 8시간, 초과 2시간) →<br />
            10,000 × 1.5 × 8 + 10,000 × 2 × 2 = 120,000 + 40,000 = <b>160,000원</b>
          </span>
        </li>
        <li>
          <b>총 수당:</b>
          <span className="ml-1">
            연장근로수당 + 야간근로수당 + 휴일근로수당의 합계<br />
            예시: 위 세 항목 합계가 <b>265,000원</b>이면 총 수당은 265,000원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 연장·야간·휴일근로가 중복되는 경우, 각각의 가산수당을 모두 합산해 지급해야 합니다.<br />
        ※ 실제 지급 기준은 근로기준법, 단체협약, 취업규칙 등에 따라 달라질 수 있습니다.<br />
      </div>
    </div>
  );
}

function OvertimeFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">연장/야간/휴일수당 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 연장·야간·휴일수당의 계산 기준은 무엇인가요?</div>
          <div>
            연장수당, 야간수당, 휴일수당은 모두 <b>통상임금</b>을 <b>기준</b>으로 계산합니다. 연장근로(1일 8시간, 주 40시간 초과)는 통상임금의 1.5배, 야간근로(밤 10시~익일 6시)는 1.5배, 휴일근로는 1.5~2배(법정휴일 8시간 초과분은 2배)로 산정합니다. 2025년 기준 최저임금 이상을 반드시 보장해야 하며, 근로계약서의 임금항목도 확인이 필요합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 주휴수당이 연장·야간·휴일수당 계산에 미치는 영향은?</div>
          <div>
            <b>주휴수당</b>은 주 15시간 이상 근무하고 소정근로일을 모두 개근한 근로자에게 지급되는 유급휴일수당입니다. 월급제의 경우 주휴수당이 기본급에 포함되어 있으면 별도 지급하지 않지만, 시급제·알바 등에서는 주휴수당이 별도로 지급되며, <b>연장·야간·휴일수당의 기준임금(통상임금)</b>에도 포함됩니다. 즉, 주휴수당을 포함한 시급을 기준으로 각종 수당을 계산해야 실제 법정 수당을 정확히 받을 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 연장·야간·휴일수당 지급 조건과 주요 유의점은?</div>
          <div>
            연장·야간·휴일수당은 근로기준법상 의무적으로 지급해야 하며, <b>근무시간, 근로형태와 무관하게</b> 지급 기준을 충족하면 모두 적용됩니다. 주휴수당 지급 조건(주 15시간 이상 근무, 소정근로일 개근 등)도 반드시 확인해야 하며, 모든 수당은 근로계약서와 임금명세서에 명확히 표기되어야 합니다. 미지급 시 노동청에 신고할 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 2026년 최저임금과 연장·야간·휴일수당 계산 시 주의할 점은?</div>
          <div>
            2026년 최저시급은 10,320원으로, 연장·야간·휴일수당을 계산할 때도 <b>최저임금 기준</b>을 반드시 반영해야 합니다. 주휴수당이 포함된 시급을 기준으로 1.5배 또는 2배를 곱해 각 수당을 산정해야 하며, 실제 지급액이 최저임금 미만이 되지 않도록 유의해야 합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

// 수당 계산 함수
function calcOvertimePay({ hourly, ext, night, holiday, holidayOver }) {
  // 연장: 1.5배, 야간: 0.5배 가산, 휴일: 1.5배(8시간까지), 2배(8시간 초과)
  const extPay = hourly * 1.5 * ext;
  const nightPay = hourly * 0.5 * night;
  const holidayPay = hourly * 1.5 * holiday + hourly * 2 * holidayOver;
  const total = extPay + nightPay + holidayPay;
  return {
    extPay: Math.round(extPay),
    nightPay: Math.round(nightPay),
    holidayPay: Math.round(holidayPay),
    total: Math.round(total),
  };
}

export default function OvertimeCalculator() {
  const [hourly, setHourly] = useState("");
  const [ext, setExt] = useState("");
  const [night, setNight] = useState("");
  const [holiday, setHoliday] = useState("");
  const [holidayOver, setHolidayOver] = useState("");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null); // 결과 스크롤용 ref

  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!hourly) {
      setResult(null);
      return;
    }
    const res = calcOvertimePay({
      hourly: Number(hourly),
      ext: Number(ext || 0),
      night: Number(night || 0),
      holiday: Number(holiday || 0),
      holidayOver: Number(holidayOver || 0),
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
    setHourly("");
    setExt("");
    setNight("");
    setHoliday("");
    setHolidayOver("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        연장/야간/휴일수당 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">근무시간 입력</h3>
          <InputRow
            label="통상임금"
            tooltip="세전 통상임금을 입력하세요. (예: 10,320)"
          >
            <input
              type="text"
              value={hourly}
              onChange={handleNum(setHourly)}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              placeholder="10,320"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {hourly && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(hourly)} 원
            </div>
          )}
          <InputRow
            label="연장근로시간"
            tooltip="1주 40시간을 초과한 연장근로 시간(1.5배 적용)을 입력하세요."
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*\\.?\\d{0,2}$"
    value={ext}
    onChange={e => {
      const v = e.target.value
      // JS 리터럴로는 /^\d*\.?\d{0,2}$/
      if (/^\d*\.?\d{0,2}$/.test(v)) setExt(v)
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="0"
  />
            <span className="text-gray-500">시간</span>
          </InputRow>
          <InputRow
            label="야간근로시간"
            tooltip="야간(22:00~06:00) 근로시간(0.5배 가산분만 입력)을 입력하세요."
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*\\.?\\d{0,2}$"
    value={night}
    onChange={e => {
      const v = e.target.value
      if (/^\d*\.?\d{0,2}$/.test(v)) setNight(v)
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="0"
  />
            <span className="text-gray-500">시간</span>
          </InputRow>
          <InputRow
            label="휴일근로시간(8시간 이하)"
            tooltip="휴일근로(8시간 이하, 1.5배 적용) 시간을 입력하세요."
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*\\.?\\d{0,2}$"
    value={holiday}
    onChange={e => {
      const v = e.target.value
      if (/^\d*\.?\d{0,2}$/.test(v)) setHoliday(v)
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="0"
  />
            <span className="text-gray-500">시간</span>
          </InputRow>
          <InputRow
            label="휴일근로시간(8시간 초과)"
            tooltip="휴일근로 8시간 초과분(2배 적용) 시간을 입력하세요."
          >
            <input
    type="text"
    inputMode="decimal"
    pattern="^\\d*\\.?\\d{0,2}$"
    value={holidayOver}
    onChange={e => {
      const v = e.target.value
      if (/^\d*\.?\d{0,2}$/.test(v)) setHolidayOver(v)
    }}
    className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
    placeholder="0"
  />
            <span className="text-gray-500">시간</span>
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
        <span>연장근로수당</span>
        <span className="font-semibold">{addComma(result.extPay)} 원</span>
      </div>
      <div className="flex items-center justify-between">
        <span>야간근로수당</span>
        <span className="font-semibold">{addComma(result.nightPay)} 원</span>
      </div>
      <div className="flex items-center justify-between">
        <span>휴일근로수당</span>
        <span className="font-semibold">{addComma(result.holidayPay)} 원</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold">총 수당</span>
        <span className="font-bold text-blue-700">{addComma(result.total)} 원</span>
      </div>
    </div>
  ) : (
    <div className="text-gray-400 text-center mt-12">
      계산 결과가 여기에 표시됩니다.
    </div>
  )}

  {/* ✅ 여기(결과 아래, 섹션 끝나기 직전) */}
  <div style={{ marginTop: 24, textAlign: "center" }}>
    <KakaoShareButton />
  </div>
</section>

        
      </div>
      <AdsenseBox />
      <CalculationMethodBox />
      <OvertimeFAQBox />
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}


