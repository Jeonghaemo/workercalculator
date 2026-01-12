import { useEffect } from "react";
import { usePathname } from "next/navigation";


export default function AdsenseBox() {
  const pathname = usePathname();

  useEffect(() => {
  let t1, t2;

  const pushAd = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  };

  // 첫 진입에서 스크립트 로딩이 늦을 수 있어 재시도
  t1 = setTimeout(pushAd, 50);
  t2 = setTimeout(pushAd, 500);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, [pathname]);


  return (
    <div className="my-6 max-w-3xl mx-auto px-2 sm:px-4 w-full">
  <ins
    key={pathname}
    className="adsbygoogle"

        style={{ display: "block" }}
        data-ad-client="ca-pub-4564123418761220"
        data-ad-slot="2809714485"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-language="ko"
      ></ins>
      
    </div>
  );
}
