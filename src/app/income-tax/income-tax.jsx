"use client";
import { useState, useRef, useEffect } from "react";
import PageGrid from "../components/PageGrid";
import Link from "next/link";
import Script from "next/script";
import AdsenseBox from "../components/AdsenseBox";
import MobileToolbar from "../components/MobileToolbar";
import KakaoShareButton from "../components/KakaoShareButton";
import { lookupIncomeTax } from "../utils/lookupIncomeTax";

// 천 단위 콤마
const addComma = (v) => (v || v === 0 ? Number(v).toLocaleString() : "");

// 근로소득세 누진세율표 (2025년 기준)
const TAX_TABLE = [
  { std: 0, rate: 0.06, minus: 0 },
  { std: 14000000, rate: 0.15, minus: 1260000 },
  { std: 50000000, rate: 0.24, minus: 5760000 },
  { std: 88000000, rate: 0.35, minus: 15440000 },
  { std: 150000000, rate: 0.38, minus: 19940000 },
  { std: 300000000, rate: 0.40, minus: 25940000 },
  { std: 500000000, rate: 0.42, minus: 35940000 },
  { std: 1000000000, rate: 0.45, minus: 65400000 },
];

// 근로소득공제 (간이 공식)
function getEarnedIncomeDeduction(total) {
  if (total <= 8000000) return total * 0.8;
  if (total <= 70000000) return 6400000 + (total - 8000000) * 0.5;
  if (total <= 120000000) return 32400000 + (total - 70000000) * 0.15;
  if (total <= 150000000) return 39900000 + (total - 120000000) * 0.05;
  return 41400000 + (total - 150000000) * 0.02;
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
          <span className="font-bold">근로소득세 계산기</span>로 <span className="font-bold">예상 세금</span>과 <span className="font-bold">실수령액</span>을 확인해보세요.
        </li>
        <li>
          <span className="font-bold">근로소득세</span>는 연봉, 월급, 부양가족 수, 4대 보험료 등 다양한 항목을 반영해 산정됩니다.
        </li>
        <li>
          4대 보험료는{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/four-insurances"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            4대보험 계산기
          </Link>
          에서 확인해 보세요.
        </li>
        <li>
          월급 및 연봉 확인은{" "}
          <Link
            href="https://workercalculator.damoapick.co.kr/salary"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-bold"
          >
            시급 계산기
          </Link>
          에서 확인해 보세요.
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">계산기 이용방법</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          <b>연봉/월급 선택:</b>
          <span className="ml-1">
            세전 연봉 또는 월급 중 입력할 단위를 선택하세요. 연봉 선택 시 12로 나눠 월급을 자동 계산합니다.
          </span>
        </li>
        <li>
          <b>급여 입력:</b>
          <span className="ml-1">
            세전 연봉 또는 월급 금액을 입력하세요. (예: 연봉 2천만 원, 월급 200만 원)
          </span>
        </li>
        <li>
          <b>비과세액 입력:</b>
          <span className="ml-1">
            식대 등 세금이 부과되지 않는 비과세 금액을 입력하세요. (기본값 20만 원, 필요시 조정)
          </span>
        </li>
        <li>
          <b>부양가족수(본인 포함):</b>
          <span className="ml-1">
            본인, 배우자, 20세 이하 자녀, 60세 이상 부모 등 소득세 공제 대상 가족 수를 입력하세요.
          </span>
        </li>
        <li>
          <b>8세~20세 자녀수:</b>
          <span className="ml-1">
            소득세 추가 공제 대상인 8세~20세 자녀 수를 입력하세요.
          </span>
        </li>
        <li>
          <b>계산하기 버튼 클릭:</b>
          <span className="ml-1">
            모든 항목 입력 후 <b>계산하기</b> 버튼을 누르면 근로소득세, 지방소득세, 실수령액 등이 자동 계산됩니다.
          </span>
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">근로소득세 계산방법</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>
          <b>총급여액 산정:</b>
          <span className="ml-1">
            입력한 연봉 또는 월급에서 비과세액(식대 등)을 제외한 금액을 기준으로 계산합니다.<br />
            예시: 연봉 24,000,000원, 비과세액 2,400,000원(연) → 24,000,000 - 2,400,000 = 21,600,000원
          </span>
        </li>
        <li>
          <b>근로소득공제 적용:</b>
          <span className="ml-1">
            총급여액에 2025년 근로소득공제율을 적용해 근로소득금액을 산출합니다.<br />
            예시: 총급여 21,600,000원, 근로소득공제 9,600,000원 → 21,600,000 - 9,600,000 = 12,000,000원
          </span>
        </li>
        <li>
          <b>인적공제 반영:</b>
          <span className="ml-1">
            본인 포함 가족 1인당 150만 원, 8~20세 자녀 1인당 50만 원을 추가로 공제합니다.<br />
            예시: 가족 3명(본인, 배우자, 자녀1), 8~20세 자녀 1명 → 1,500,000 × 3 + 500,000 × 1 = 5,000,000원
          </span>
        </li>
        <li>
          <b>과세표준 계산:</b>
          <span className="ml-1">
            근로소득금액에서 인적공제를 차감하여 과세표준을 구합니다.<br />
            예시: 12,000,000 - 5,000,000 = 7,000,000원
          </span>
        </li>
        <li>
          <b>근로소득세 산출:</b>
          <span className="ml-1">
            2025년 누진세율표에 따라 과세표준 구간별 세율(6%~45%)을 적용해 산출세액을 계산합니다.<br />
            예시: 7,000,000원 × 6% = 420,000원
          </span>
        </li>
        <li>
          <b>지방소득세 산출:</b>
          <span className="ml-1">
            산출된 근로소득세의 10%를 지방소득세로 추가 계산합니다.<br />
            예시: 420,000원 × 10% = 42,000원
          </span>
        </li>
        <li>
          <b>실수령액 계산:</b>
          <span className="ml-1">
            월급에서 근로소득세와 지방소득세를 합산한 금액을 차감해 월 실수령액을 산출합니다.<br />
            예시: 월급 2,000,000원, 소득세 35,000원, 지방소득세 3,500원 → 2,000,000 - 38,500 = 1,961,500원
          </span>
        </li>
      </ol>
      <div className="text-sm text-gray-600">
        ※ 이 계산기는 2025년 근로소득세율 및 공제 기준을 적용합니다.<br />
        ※ 실제 연말정산 시 세액공제, 특별공제 등 추가 항목에 따라 결과가 달라질 수 있습니다.
      </div>
    </div>
  );
}

function IncomeTaxFAQBox() {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">근로소득세 계산기 자주 묻는 질문(FAQ)</h2>
      <div className="space-y-6">
        <div>
          <div className="font-bold mb-1">Q 근로소득세는 어떻게 계산하나요?</div>
          <div>
            <b>근로소득세</b>는 <b>월급</b> 등 근로소득에서 각종 공제(인적공제, 연금보험료, 특별소득공제 등)를 뺀 <b>과세표준</b>에 <b>세율구간</b>별로 누진세율을 적용해 산출합니다. 산출세액에서 세액공제 등을 차감하면 실제 납부할 세금이 결정됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 2025년 근로소득세 세율구간은 어떻게 되나요?</div>
          <div>
            2025년 기준 <b>근로소득세율</b>은 과세표준에 따라 6%부터 최대 45%까지 적용됩니다. 예를 들어, 1,200만원 이하는 6%, 1,200만~4,600만원은 15%, 4,600만~8,800만원은 24% 등 <b>세율구간</b>별로 누진적으로 계산됩니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 월급에서 근로소득세는 어떻게 공제되나요?</div>
          <div>
            <b>월급</b>에서 근로소득세는 매월 원천징수(자동 공제)되며, 연말정산을 통해 1년간 실제 소득과 공제 내역을 합산해 최종 세금이 결정됩니다. 월급 명세서에서 근로소득세 항목을 확인할 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 홈택스에서 근로소득세 내역을 확인할 수 있나요?</div>
          <div>
            네, <b>홈택스</b>에서 연말정산 내역, 근로소득 원천징수 영수증, 소득공제 내역 등을 모두 확인할 수 있습니다. 홈택스 로그인 후 [My홈택스 &gt; 연말정산/지급명세서] 메뉴를 이용하세요.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 세율구간별로 실제 내는 세금은 어떻게 계산되나요?</div>
          <div>
            <b>세율구간</b>별로 누진공제액이 적용되어, 예를 들어 과세표준이 5,000만원을 초과하면 624만원 + (5,000만원 초과분 × 24%) 식으로 계산됩니다. <b>국세청 홈페이지</b>나 <b>근로소득세 계산기</b>를 이용하면 자동으로 산출할 수 있습니다.
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">Q 근로소득세 계산 시 주의할 점은?</div>
          <div>
            소득공제, 세액공제 항목이 많을수록 실제 내는 세금이 줄어듭니다. <b>월급</b> 외 상여금, 수당 등도 과세 대상이 될 수 있으니, 연말정산 시 <b>홈택스</b>에서 내역을 꼼꼼히 확인하세요.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IncomeTaxCalculator() {
  const [mode, setMode] = useState("annual");
  const [salary, setSalary] = useState(mode === "annual" ? "30000000" : "2000000");
  const [taxFree, setTaxFree] = useState("200000");
  const [family, setFamily] = useState(1);
  const [children, setChildren] = useState(0);
  const [result, setResult] = useState(null);

  const resultRef = useRef(null); // 스크롤용 ref

  useEffect(() => {
    if (mode === "annual") {
      setSalary("30000000"); // 연봉일 때 기본값
    } else {
      setSalary("2000000"); // 월급일 때 기본값
    }
  }, [mode]);

  // 입력값 처리
  const handleSalaryChange = (e) => {
    setSalary(e.target.value.replace(/[^0-9]/g, ""));
  };
  const handleTaxFreeChange = (e) => {
    setTaxFree(e.target.value.replace(/[^0-9]/g, ""));
  };


   // 계산
  const handleCalc = () => {
  const salaryNum = Number(salary);
  const taxFreeNum = Number(taxFree);

  // 월급 계산
  const monthly = mode === "annual" ? Math.round(salaryNum / 12) : salaryNum;
  const annualIncome = monthly * 12;

  // 과세 대상 금액 (비과세 제외한 월 소득)
  const taxableMonthly = Math.max(0, monthly - taxFreeNum);

  // 소득세: 간이세액표 기준 (월 기준)
  const monthlyTax = lookupIncomeTax(taxableMonthly, family);

  // 지방소득세: 소득세의 10%
  const localTax = Math.floor(monthlyTax * 0.1);

  // 총 공제세액
  const totalTax = monthlyTax + localTax;

    setResult({
      taxableMonthly,
      monthlyTax,
      localTax,
      totalTax,
      monthly,
      annualGross: annualIncome,
      annualNet: (monthly - totalTax) * 12,
    });

    // 모바일에서 결과로 스크롤
    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // 증감 버튼
  const inc = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) + 1));
  const dec = (setter, val, min = 0) => () => setter(Math.max(min, Number(val) - 1));

  // 리셋
  const reset = () => {
    setSalary("20000000");
    setTaxFree("200000");
    setFamily(1);
    setChildren(0);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        근로소득세 계산기
      </h1>
      <IntroBox />
      <AdsenseBox />
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10 flex flex-col lg:flex-row gap-8 w-full">
        {/* 좌측 입력 */}
        <section className="w-full lg:w-1/2 border-r border-gray-200 pr-0 lg:pr-8 min-w-0">
          <h3 className="font-semibold text-lg mb-6">조건 입력</h3>
          {/* 1. 연봉/월급 선택 */}
          <InputRow
            label="연봉/월급 선택"
            tooltip={`연봉 또는 월급 중 입력할 급여 단위를 선택하세요.\n연봉 입력 시 12로 나눠 월급을 계산합니다.`}
          >
            <button
              onClick={() => setMode("annual")}
              className={`px-6 py-2 rounded border ${
                mode === "annual" ? "bg-blue-600 text-white border-blue-600" : "bg-white"
              }`}
            >
              연봉
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`px-6 py-2 rounded border ${
                mode === "monthly" ? "bg-blue-600 text-white border-blue-600" : "bg-white"
              }`}
            >
              월급
            </button>
          </InputRow>
          {/* 2. 연봉/월급 입력 */}
          <InputRow
            label={mode === "annual" ? "연봉" : "월급"}
            tooltip={`세전 금액을 입력하세요.\n(예: 연봉 2천만원, 월급 200만원 등)`}
          >
            <input
              type="text"
              value={salary}
              onChange={handleSalaryChange}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="20000000"
            />
            <span className="text-gray-500">원</span>
          </InputRow>
          {salary && (
            <div style={{ color: "#3b82f6", fontWeight: "bold", textAlign: "right", marginBottom: 8 }}>
              입력값: {addComma(salary)} 원
            </div>
          )}
          {/* 3. 비과세액 */}
          <InputRow
            label="비과세액(식대포함)"
            tooltip={`비과세액은 소득세·4대보험 등 세금이 부과되지 않는 금액입니다.\n식대, 자가운전보조금 등 포함 가능 (기본값 20만원).`}
          >
            <input
              type="text"
              value={taxFree}
              onChange={handleTaxFreeChange}
              className="w-full max-w-[120px] border rounded px-2 py-2 text-right"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="200000"
            />
            <span className="text-gray-500">원</span>
            <span className="ml-2 text-blue-600 text-sm">(기본값 20만원)</span>
          </InputRow>
          {/* 4. 부양가족수 */}
          <InputRow
            label="부양가족수(본인포함)"
            tooltip={`소득세 공제에 반영되는 가족 수입니다.\n본인 포함, 배우자, 20세 이하 자녀, 60세 이상 부모 등.`}
          >
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={dec(setFamily, family, 1)}
              aria-label="감소"
            >−</button>
            <input
              type="text"
              value={family}
              readOnly
              className="w-full max-w-[60px] border rounded px-2 py-2 text-center bg-gray-50"
            />
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={inc(setFamily, family, 1)}
              aria-label="증가"
            >+</button>
            <span className="text-gray-500">명</span>
          </InputRow>
          {/* 5. 8세~20세 자녀수 */}
          <InputRow
            label="8세~20세 자녀수"
            tooltip={`소득세 추가 공제 대상인 8세~20세 자녀 수를 입력하세요.`}
          >
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={dec(setChildren, children, 0)}
              aria-label="감소"
            >−</button>
            <input
              type="text"
              value={children}
              readOnly
              className="w-full max-w-[60px] border rounded px-2 py-2 text-center bg-gray-50"
            />
            <button
              className="w-8 h-8 border rounded text-lg"
              onClick={inc(setChildren, children, 0)}
              aria-label="증가"
            >+</button>
            <span className="text-gray-500">명</span>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>근로소득세 기준액(월)</span>
                <span className="font-semibold text-red-600">{addComma(result.taxableMonthly)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>근로소득세</span>
                <span className="font-semibold">{addComma(result.monthlyTax)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span>지방소득세</span>
                <span className="font-semibold">{addComma(result.localTax)} 원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">합계</span>
                <span className="font-bold text-blue-700">{addComma(result.totalTax)} 원</span>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 mt-8 flex flex-col items-center">
                <span className="text-gray-700 mb-2">월 실수령액(예상)</span>
                <span className="text-3xl font-bold text-blue-700">
                  {addComma(result.monthly - result.totalTax)} 원
                </span>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">세전 연봉</span>
                  <span className="font-semibold">{addComma(result.annualGross)} 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">세후 연봉</span>
                  <span className="font-bold text-blue-700">{addComma(result.annualNet)} 원</span>
                </div>
              </div>
            </div>
          )}
          {!result && (
            <div className="text-gray-400 text-center mt-12">계산 결과가 여기에 표시됩니다.</div>
          )}
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <KakaoShareButton />
          </div>
        </section>
      </div>
      <CalculationMethodBox />
      <IncomeTaxFAQBox />
      <PageGrid />
      <MobileToolbar />
    </main>
  );
}




