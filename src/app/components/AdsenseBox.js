import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function AdsenseBox() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (window.adsbygoogle) window.adsbygoogle.push({});
    } catch (e) {}
  }, [pathname]);

  return (
    <div className="my-6 max-w-3xl mx-auto px-2 sm:px-4 w-full" key={pathname}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4564123418761220"
        data-ad-slot="2809714485"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-language="ko"
      ></ins>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
        async
      />
    </div>
  );
}
