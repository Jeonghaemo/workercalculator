"use client";
import { useState, useRef } from "react";
import PageGrid from "../components/PageGrid";
import Link from "next/link";
import Script from "next/script";
import AdsenseBox from "../components/AdsenseBox";
import MobileToolbar from "../components/MobileToolbar";
import KakaoShareButton from "../components/KakaoShareButton";

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
          <span className="font-bold">출산휴가 급여 계산기</span>로 <span className="font-bold">예상 출산휴가 급여</span>와 <span className="font-bold">지급 기간</span>을 간편하게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">출산휴가 급여</span>는 통상임금, 근속기간, 고용보험 가입 여부에 따라 달라집니다.
        </li>
        <li>
          <span className="font-bold">지급액</span>은 출산휴가 기간(통상 90일, 다태아 120일) 중 고용보험에서 지원되는 금액을 기준으로 산정됩니다.
        </li>
        <li>
          <span className="font-bold">통상임금</span> 확인은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/ordinary"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            통상임금 계산기
          </Link>
          에서 가능합니다.
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">출산휴가 급여 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>월별 지급액 산정:</b>
          <span className="ml-1">
            <b>통상임금(월)</b>과 <b>월 상한액(2,100,000원)</b> 중 작은 금액을 월별 지급액으로 산정<br />
            예시: 통상임금(월) 2,300,000원 → 월별 지급액 2,100,000원(상한 적용)<br />
            예시: 통상임금(월) 1,900,000원 → 월별 지급액 1,900,000원
          </span>
        </li>
        <li>
          <b>지급 개월수 산정:</b>
          <span className="ml-1">
            <b>휴가일수 ÷ 30</b> <br />
            예시: 90일 → 3개월, 100일 → 3.33개월, 120일 → 4개월
          </span>
        </li>
        <li>
          <b>총 출산휴가급여:</b>
          <span className="ml-1">
            <b>월별 지급액 × 지급 개월수</b><br />
            예시: 월별 지급액 2,100,000원, 3개월 → 2,100,000 × 3 = 6,300,000원<br />
            예시: 월별 지급액 1,900,000원, 4개월 → 1,900,000 × 4 = 7,600,000원
          </span>
        </li>
        <li>
          <b>상한액 적용:</b>
          <span className="ml-1">
            통상임금(월)이 2,100,000원을 초과할 경우 월별 지급액은 2,100,000원으로 제한<br />
            예시: 통상임금(월) 2,500,000원 → 월별 지급액 2,100,000원
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

function MaternityLeaveFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">출산휴가급여 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 출산휴가급여는 어떤 금액을 기준으로 계산하나요?</div>
          <div>
            <b>출산휴가급여</b>는 근로자의 <b>통상임금</b>을 기준으로 산정됩니다. 통상임금에는 기본급과 매달 고정적으로 지급되는 수당이 포함되지만, 식대·교통비·상여금 등은 제외될 수 있습니다. 2025년 기준, 월 최대 상한액과 최저임금 하한액이 적용됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 출산휴가급여 신청방법은 어떻게 되나요?</div>
          <div>
            출산휴가가 종료된 후 <b>고용센터</b> 또는 <b>고용24(온라인)</b>에서 관련 서류를 제출해 <b>신청</b>할 수 있습니다. <b>출산전후휴가 급여 등 신청서</b>, <b>출산휴가 확인서</b> 등이 필요하며, 회사의 협조가 요구될 수 있습니다. 자세한 신청방법은 고용노동부 홈페이지나 고용24 자료실에서 확인할 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 출산휴가급여는 지급일은 언제인가요?</div>
          <div>
            <b>출산휴가급여</b>는 출산휴가가 끝난 후 일괄 신청하여 지급받는 것이 원칙입니다. 신청 후 심사를 거쳐 통상적으로 14일 이내에 지급되며, 지급일은 고용센터의 처리 일정에 따라 다를 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 출산휴가급여에서 회사부담과 정부지원은 어떻게 구분되나요?</div>
          <div>
            <b>회사부담</b>은 출산휴가 기간 중 앞부분(예: 60일) 유급휴가에 대해 회사가 지급하는 금액이며, 이후 기간(예: 61~90일)은 정부가 고용보험을 통해 지원합니다. 회사부담금 계산 방식은 유급 일수 방식, 휴가 일수 방식 등 회사 취업규칙에 따라 다를 수 있습니다. 정부지원금과 회사부담금 합계가 실제 지급액이 됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 통상임금은 어떻게 산정하나요?</div>
          <div>
            <b>통상임금</b>은 기본급과 매달 고정적으로 지급되는 수당(직책수당, 근속수당 등)을 합산한 금액입니다. 식대, 교통비, 상여금 등은 포함되지 않을 수 있으니, 회사의 임금 규정과 급여명세서를 반드시 확인해야 합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 출산휴가급여 금액과 상한·하한 기준은 어떻게 되나요?</div>
          <div>
            2025년 기준, 출산휴가급여는 월 통상임금 기준 <b>상한액</b>과 <b>하한액(최저임금)</b>이 적용됩니다. 상한액은 매년 고용노동부에서 고시하며, 하한액은 출산휴가 시작일 기준 최저시급을 반영합니다. 실제 지급 금액은 회사와 정부지원금 합산액에서 결정됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

// 계산 함수
function calcMaternityPay({ wage, days = 90, maxMonthly = 2100000 }) {
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

  const resultRef = useRef(null); // 결과 스크롤 ref

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

    // 계산 후 모바일에서 결과로 스크롤
    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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
        출산휴가 급여 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="통상임금(월)"
            tooltip={`월 기준 통상임금을 입력하세요.\n(정기적·일률적으로 지급되는 기본급, 고정수당 등 포함)\n상한액: 월 2,100,000원`}
          >
            <input
              type="text"
              value={wage}
              onChange={handleNum(setWage)}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
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
              className="w-full max-w-[120px] border rounded px-2 py-2"
            >
              <option value={90}>90일 (단태아)</option>
              <option value={100}>100일 (미숙아)</option>
              <option value={120}>120일 (다태아)</option>
            </select>
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
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <KakaoShareButton />
          </div>
        </section>
      </div>
      <AdsenseBox />
      <CalculationMethodBox />
      <MaternityLeaveFAQBox />
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}



