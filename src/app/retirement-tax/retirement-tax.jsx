"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import PageGrid from "../components/PageGrid";
import Script from "next/script";
import AdsenseBox from "../components/AdsenseBox";

// 천 단위 콤마 함수
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 근속 개월 수 계산 (입사일, 퇴사일)
function calcMonthsDiff(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const years = e.getFullYear() - s.getFullYear();
  const months = e.getMonth() - s.getMonth();
  const days = e.getDate() - s.getDate();
  let totalMonths = years * 12 + months;
  if (days >= 15) totalMonths += 1; // 15일 이상이면 한달 추가
  return totalMonths > 0 ? totalMonths : 0;
}

// 근속연수공제 계산
function calcServiceDeduct(years) {
  if (years <= 5) return 1000000 * years;
  if (years <= 10) return 5000000 + 2000000 * (years - 5);
  if (years <= 20) return 15000000 + 2500000 * (years - 10);
  return 40000000 + 3000000 * (years - 20);
}

// 차등공제 계산
function calcDiffDeduct(convertedSalary) {
  if (convertedSalary <= 8000000) return convertedSalary;
  if (convertedSalary <= 70000000) return 8000000 + (convertedSalary - 8000000) * 0.6;
  if (convertedSalary <= 100000000) return 45200000 + (convertedSalary - 70000000) * 0.55;
  if (convertedSalary <= 300000000) return 61700000 + (convertedSalary - 100000000) * 0.45;
  return 151700000 + (convertedSalary - 300000000) * 0.35;
}

const TAX_TABLE = [
  { std: 0, rate: 0.06, minus: 0 },
  { std: 14000000, rate: 0.15, minus: 1260000 },
  { std: 50000000, rate: 0.24, minus: 5760000 },
  { std: 150000000, rate: 0.35, minus: 15440000 },
  { std: 300000000, rate: 0.38, minus: 19940000 },
  { std: 500000000, rate: 0.40, minus: 25940000 },
  { std: 1000000000, rate: 0.42, minus: 35940000 },
  { std: 2000000000, rate: 0.45, minus: 65400000 },
];

// 세금 계산
function calcTax(taxBase) {
  let tax = 0;
  for (let i = TAX_TABLE.length - 1; i >= 0; i--) {
    if (taxBase > TAX_TABLE[i].std) {
      tax = taxBase * TAX_TABLE[i].rate - TAX_TABLE[i].minus;
      break;
    }
  }
  return tax > 0 ? Math.floor(tax) : 0;
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
          <span className="font-bold">퇴직소득세 계산기</span>로 <span className="font-bold">예상 퇴직소득세액</span>과 <span className="font-bold">원천징수 세액</span>을 간편하게 확인해보세요.
        </li>
        <li>
          퇴직소득세는 <span className="font-bold">퇴직급여액에서 비과세 소득을 제외한 금액</span>을 기준으로 합니다.
        </li>
        <li>
          <span className="font-bold">근속연수 공제</span>를 적용해 환산급여를 산출하고,  
          <span className="font-bold">연분연승법</span>에 따라 세율을 적용해 세액을 계산합니다.
        </li>
        <li>
          정확한 퇴직금은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/retirement"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            퇴직금 계산기
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
          <b>입사일/퇴사일 입력:</b>
          <span className="ml-1">
            근무 시작일과 퇴직일을 선택하세요. 근속연수가 자동 계산됩니다.
          </span>
        </li>
        <li>
          <b>퇴직금액(세전) 입력:</b>
          <span className="ml-1">
            퇴직 시 받은 총 금액(세전, 비과세 포함)을 입력하세요.
          </span>
        </li>
        <li>
          <b>비과세 소득액 입력:</b>
          <span className="ml-1">
            퇴직금 중 비과세되는 금액(예: 장해보상금 등)이 있으면 입력하세요. 없으면 0으로 두세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 근속연수, 각종 공제, 과세표준, 퇴직소득세가 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">퇴직소득세 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>근속연수 산정:</b>
          <span className="ml-1">
            입사일~퇴사일 기준, 1년 미만은 월 단위로 계산(15일 이상이면 1개월 추가)<br />
            예시: 2015.3.1~2025.3.15 → 10년 0개월, 2015.3.1~2025.3.20 → 10년 1개월
          </span>
        </li>
        <li>
          <b>퇴직소득금액 산정:</b>
          <span className="ml-1">
            퇴직금액(세전) - 비과세 소득액<br />
            예시: 100,000,000원 - 0원 = 100,000,000원
          </span>
        </li>
        <li>
          <b>근속연수공제:</b>
          <span className="ml-1">
            근속연수에 따라 공제액 산정<br />
            예시: 10년 근속 → 1~5년: 1,000,000×5 = 5,000,000원<br />
            6~10년: 2,000,000×5 = 10,000,000원<br />
            합계: 15,000,000원
          </span>
        </li>
        <li>
          <b>환산급여:</b>
          <span className="ml-1">
            (퇴직소득금액 - 근속연수공제) ÷ 근속연수 × 12<br />
            예시: (100,000,000 - 15,000,000) ÷ 10 × 12 = 10,200,000원
          </span>
        </li>
        <li>
          <b>차등공제:</b>
          <span className="ml-1">
            환산급여 구간별로 차등공제 적용<br />
            예시: 환산급여 10,200,000원 → 8,000,000 + (10,200,000-8,000,000)×0.6 = 9,320,000원
          </span>
        </li>
        <li>
          <b>과세표준 산정:</b>
          <span className="ml-1">
            환산급여 - 차등공제<br />
            예시: 10,200,000 - 9,320,000 = 880,000원
          </span>
        </li>
        <li>
          <b>산출세액 계산:</b>
          <span className="ml-1">
            과세표준에 누진세율(6~45%) 적용<br />
            예시: 880,000 × 6% = 52,800원
          </span>
        </li>
        <li>
          <b>최종 퇴직소득세:</b>
          <span className="ml-1">
            산출세액 × 근속연수 ÷ 12<br />
            예시: 52,800 × 10 ÷ 12 ≈ 44,000원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 실제 퇴직소득세는 퇴직소득 원천징수영수증, 근로계약, 공제항목 등에 따라 달라질 수 있습니다.<br />
        ※ 2025년 기준 퇴직소득세율 및 공제방식 적용.<br />
        ※ 계산 결과는 참고용입니다.
      </div>
    </div>
  );
}

function RetirementTaxFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">퇴직소득세 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 퇴직소득세는 어떤 세율로 계산되나요?</div>
          <div>
            <b>퇴직소득세</b>는 퇴직소득금액(퇴직급여액-비과세소득)과 근속연수에 따라 누진 <b>세율</b>이 적용됩니다. 일반 소득세와 달리 근속연수만큼 세 부담이 경감되는 구조로, 국세청 <b>홈택스</b>나 공식 계산기를 통해 정확한 세액을 확인할 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 퇴직소득세는 어떻게 줄일 수 있나요?</div>
          <div>
            퇴직소득세는 근속연수가 길수록, 퇴직금이 분산지급될수록 세 부담이 낮아집니다. 비과세 소득(장해보상금 등)도 제외되며, 정확한 세율은 국세청 계산기에서 확인 가능합니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 퇴직소득세 계산에 포함되는 항목은?</div>
          <div>
            <b>퇴직소득세</b>는 퇴직급여에서 비과세 소득을 뺀 금액, 근속연수, 각종 공제액(근속연수공제, 차등공제 등)을 반영해 계산합니다. 연말정산 소득세와는 별도로 산정됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 퇴직소득세 신고 및 납부는 어떻게 하나요?</div>
          <div>
            회사(원천징수의무자)가 퇴직소득세를 원천징수해 국세청에 신고·납부합니다. 근로자는 별도 신고 의무가 없으나, 퇴직소득원천징수영수증을 꼭 확인하세요.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 퇴직소득세와 연말정산 소득세는 다른가요?</div>
          <div>
            네, <b>퇴직소득세</b>는 퇴직금에만 부과되며, 연말정산 소득세와는 별개로 계산·납부됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RetirementTaxCalculator() {
  const [joinDate, setJoinDate] = useState("");
  const [retireDate, setRetireDate] = useState("");
  const [retirementPay, setRetirementPay] = useState("");
  const [nonTaxIncome, setNonTaxIncome] = useState("0");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null); // 결과 스크롤용 ref

  // 숫자만 입력
  const handleNum = (setter) => (e) => {
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleCalc = () => {
    if (!joinDate || !retireDate || !retirementPay) {
      setResult(null);
      return;
    }
    const totalMonths = calcMonthsDiff(joinDate, retireDate);
    const years = Math.floor(totalMonths / 12);
    if (years <= 0) {
      setResult(null);
      return;
    }
    const pay = Number(retirementPay);
    const nonTax = Number(nonTaxIncome);
    const taxablePay = Math.max(pay - nonTax, 0);
    const serviceDeduct = calcServiceDeduct(years);
    const convertedSalary = ((taxablePay - serviceDeduct) / years) * 12;
    const diffDeduct = calcDiffDeduct(convertedSalary);
    const taxBase = Math.max(convertedSalary - diffDeduct, 0);
    const calculatedTax = calcTax(taxBase);
    const finalTax = Math.floor((calculatedTax * years) / 12);

    setResult({
      years,
      taxablePay,
      serviceDeduct,
      convertedSalary,
      diffDeduct,
      taxBase,
      calculatedTax,
      finalTax,
    });

    // 계산 후 모바일에서 결과로 스크롤
    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const reset = () => {
    setJoinDate("");
    setRetireDate("");
    setRetirementPay("");
    setNonTaxIncome("0");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">퇴직소득세 계산기</h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          <InputRow label="입사일" tooltip="근무를 시작한 날짜를 선택하세요.">
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="w-full max-w-[120px] border rounded px-2 py-2"
              max={new Date().toISOString().split("T")[0]}
            />
          </InputRow>
          <InputRow label="퇴사일" tooltip="퇴직일을 선택하세요.">
            <input
              type="date"
              value={retireDate}
              onChange={(e) => setRetireDate(e.target.value)}
              className="w-full max-w-[120px] border rounded px-2 py-2"
              max={new Date().toISOString().split("T")[0]}
              min={joinDate || undefined}
            />
          </InputRow>
          <InputRow label="퇴직금액(세전)" tooltip="퇴직 시 받은 총 금액을 입력하세요.">
            <input
              type="text"
              value={retirementPay}
              onChange={handleNum(setRetirementPay)}
              className="w-full max-w-[140px] border rounded px-2 py-2 text-right"
              placeholder="예: 100,000,000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {retirementPay && (
            <div className="text-right text-blue-600 font-bold mb-2">
              입력값: {addComma(retirementPay)} 원
            </div>
          )}
          <InputRow label="비과세 소득액" tooltip="퇴직금 중 비과세되는 금액을 입력하세요. (예: 장해보상금)">
            <input
              type="text"
              value={nonTaxIncome}
              onChange={handleNum(setNonTaxIncome)}
              className="w-full max-w-[140px] border rounded px-2 py-2 text-right"
              placeholder="0"
            />
            <span className="text-gray-500">원</span>
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
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-semibold">근속연수</td>
                  <td className="py-2 text-right">{addComma(result.years)} 년</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">퇴직소득금액</td>
                  <td className="py-2 text-right">{addComma(result.taxablePay)} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">근속연수공제</td>
                  <td className="py-2 text-right">{addComma(result.serviceDeduct)} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">환산급여</td>
                  <td className="py-2 text-right">{addComma(Math.round(result.convertedSalary))} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">차등공제</td>
                  <td className="py-2 text-right">{addComma(Math.round(result.diffDeduct))} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">과세표준</td>
                  <td className="py-2 text-right">{addComma(Math.round(result.taxBase))} 원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">산출세액</td>
                  <td className="py-2 text-right">{addComma(result.calculatedTax)} 원</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">최종 퇴직소득세</td>
                  <td className="py-2 text-right font-bold text-blue-700">{addComma(result.finalTax)} 원</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
        </section>
      </div>
      <CalculationMethodBox />
      <RetirementTaxFAQBox />
      <PageGrid />
    </main>
  );
}


