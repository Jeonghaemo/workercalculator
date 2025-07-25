// components/KakaoInit.js
"use client";
import { useEffect } from "react";

export default function KakaoInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // SDK가 이미 로드되어 있으면 다시 불러오지 않음
      if (window.Kakao) return;

      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init("252cfe915eca10a5362ef0d6e632c631");
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
