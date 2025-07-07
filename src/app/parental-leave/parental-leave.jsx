"use client";
import { useState } from "react";
import PageGrid from "../components/PageGrid";
import Link from "next/link";

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

// 계산 함수 (2025년 기준)
function calcParentalLeave({ wage, months }) {
  const monthPays = [];
  let total = 0;
  let totalMonths = Math.min(12, Math.max(1, months));
  for (let i = 1; i <= totalMonths; i++) {
    let rate = 1, max = 2500000, min = 700000;
    if (i >= 4 && i <= 6) {
      max = 2000000;
    }
    if (i >= 7) {
      rate = 0.8;
      max = 1600000;
    }
    let pay = wage * rate;
    pay = Math.max(min, Math.min(pay, max));
    monthPays.push(pay);
    total += pay;
  }
  return {
    monthPays,
    total,
    totalMonths,
  };
}

export default function ParentalLeave() {
  const [wage, setWage] = useState("");
  const [months, setMonths] = useState(12);
  const [result, setResult] = useState(null);

  // 숫자만 입력
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  // 계산
  const handleCalc = () => {
    const wageNum = Number(wage);
    const monthsNum = Number(months);
    if (!wageNum || !monthsNum || monthsNum < 1 || monthsNum > 12) {
      setResult(null);
      return;
    }
    setResult(calcParentalLeave({ wage: wageNum, months: monthsNum }));
  };

  // 초기화
  const reset = () => {
    setWage("");
    setMonths(12);
    setResult(null);
  };


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
          <span className="font-bold">육아휴직 급여 계산기</span>로 <span className="font-bold">예상 육아휴직 급여</span>와 <span className="font-bold">지급 기간</span>을 간편하게 확인해보세요.
        </li>
        <li>
          <span className="font-bold">육아휴직 급여</span>는 통상임금, 고용보험 가입기간, 육아휴직 사용 순서(첫째/둘째/셋째) 등에 따라 달라집니다.
        </li>
        <li>
          <span className="font-bold">지급액</span>은 육아휴직 개시 전 3개월 평균임금의 일정 비율(통상 80%, 상한·하한 적용)로 산정됩니다.
        </li>
        <li>
          <span className="font-bold">통상임금</span> 확인은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/ordinary"
            target="_blank"
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
            <br />※ 상한액: 1~3개월 2,500,000원, 4~6개월 2,000,000원, 7개월~ 1,600,000원
          </span>
        </li>
        <li>
          <b>휴직 개월수 입력:</b>
          <span className="ml-1">
            육아휴직 개월수를 입력하세요. (최대 12개월)
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 월별 지급액, 총 지급 개월수, 총 육아휴직급여가 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">육아휴직급여 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>월별 지급액 산정:</b>
          <span className="ml-1">
            <b>1~3개월차:</b> 통상임금(월)의 100% (상한 2,500,000원, 하한 700,000원)<br />
            <b>4~6개월차:</b> 통상임금(월)의 100% (상한 2,000,000원, 하한 700,000원)<br />
            <b>7개월차~:</b> 통상임금(월)의 80% (상한 1,600,000원, 하한 700,000원)<br />
            예시: 통상임금(월) 2,300,000원, 12개월 육아휴직 시<br />
            - 1~3개월차: 2,300,000원(상한 미적용)<br />
            - 4~6개월차: 2,000,000원(상한 적용)<br />
            - 7~12개월차: 1,600,000원(상한 적용, 2,300,000 × 0.8 = 1,840,000 → 1,600,000원)
          </span>
        </li>
        <li>
          <b>총 지급 개월수 산정:</b>
          <span className="ml-1">
            입력한 휴직 개월수(최대 12개월)<br />
            예시: 12개월 입력 시 → 12개월
          </span>
        </li>
        <li>
          <b>총 육아휴직급여:</b>
          <span className="ml-1">
            각 월별 지급액의 합계<br />
            예시: (2,300,000 × 3) + (2,000,000 × 3) + (1,600,000 × 6) = 6,900,000 + 6,000,000 + 9,600,000 = 22,500,000원
          </span>
        </li>
        <li>
          <b>상한/하한 적용:</b>
          <span className="ml-1">
            각 구간별 상한액(2,500,000/2,000,000/1,600,000원)과 하한액(700,000원) 내에서 지급<br />
            예시: 통상임금(월) 2,800,000원, 1~3개월차는 2,500,000원(상한 적용)
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 육아휴직급여는 고용보험에 가입된 근로자만 신청 가능하며, 실제 지급액은 고용노동부 심사 결과에 따라 달라질 수 있습니다.<br />
        ※ 상한/하한액은 2025년 기준입니다.
      </div>
    </div>
  );
}


  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        육아휴직 급여 계산기
      </h1>
      <IntroBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow
            label="통상임금(월)"
            tooltip={`월 기준 통상임금을 입력하세요.\n(정기적·일률적으로 지급되는 기본급, 고정수당 등 포함)\n상한액: 1~3개월 250만원, 4~6개월 200만원, 7개월~ 160만원`}
          >
            <input
              type="text"
              value={wage}
              onChange={handleNum(setWage)}
              className="w-40 border rounded px-2 py-2 text-right"
              placeholder="예: 2,500,000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {wage && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(wage)} 원
            </div>
          )}

          <InputRow
            label="휴직 개월수"
            tooltip={`육아휴직 개월수를 입력하세요.\n최대 12개월까지 가능`}
          >
            <input
              type="number"
              value={months}
              onChange={(e) => {
                let v = Number(e.target.value);
                if (v < 1) v = 1;
                if (v > 12) v = 12;
                setMonths(v);
              }}
              className="w-32 border rounded px-2 py-2 text-right"
              min={1}
              max={12}
            />
            <span className="text-gray-500">개월</span>
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
                <span>총 지급 개월수</span>
                <span className="font-semibold">{result.totalMonths} 개월</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">총 육아휴직급여</span>
                <span className="font-bold text-blue-700">
                  {addComma(result.total)} 원
                </span>
              </div>
              <div className="mt-6">
                <table className="w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-2 px-2 text-left">개월</th>
                      <th className="py-2 px-2 text-right">월별 지급액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.monthPays.map((pay, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-1 px-2">{idx + 1}개월차</td>
                        <td className="py-1 px-2 text-right">{addComma(pay)} 원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
