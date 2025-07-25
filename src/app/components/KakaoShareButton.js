"use client";
import { useEffect } from "react";

export default function KakaoShareButton() {
  useEffect(() => {
    // 카카오 SDK 초기화 (한 번만)
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("252cfe915eca10a5362ef0d6e632c631");
    }
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "근로·급여 계산기",
          description: "연봉, 시급, 주휴수당, 퇴직금, 4대 보험, 출산휴가·육아휴직, 연장·야간·휴일수당, 실업급여, 성과급, 통상임금, 최저시급, 소득세 등 각종 급여와 세금 계산기를 한 곳에서 쉽게 이용하세요.,",
          imageUrl: "https://workercalculator.damoapick.co.kr/favicon.ico", // 썸네일 이미지 (적절히 변경)
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "계산기에서 확인",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <button
      onClick={shareToKakao}
      style={{
        background: "#fee500",
        color: "#3c1e1e",
        border: "none",
        borderRadius: "6px",
        padding: "10px 20px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      카카오톡으로 공유
    </button>
  );
}
