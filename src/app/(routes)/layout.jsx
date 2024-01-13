"use client";
// Next JS
import { usePathname } from "next/navigation";
// Components
import { Footer } from "@/_components/organisms/Footer";
import { LandingHeader } from "@/_components/organisms/LandingHeader";
import Script from "next/script";

export default function Layout({ children }) {
  //
  const pathname = usePathname();
  return (
    <div className="">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LGCLNNBQLK" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-LGCLNNBQLK');
        `}
      </Script>

      {/* Meta Pixel Code  */}
      <Script id="meta-pixel-code">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1135776284251383');
fbq('track', 'PageView');`}
      </Script>

      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style="display:none"
          alt=""
          src="https://www.facebook.com/tr?id=1135776284251383&ev=PageView&noscript=1"
        />
      </noscript>
      {/* End Meta Pixel Code  */}

      {pathname === "/" ? <LandingHeader /> : ""}
      {children}
      <Footer />
    </div>
  );
}
