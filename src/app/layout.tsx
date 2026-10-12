import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ScrollToTop from "@/components/landing-page/ScrollToTop";
import ChatbotWidget from "@/components/landing-page/chatbot-widget";
import { SITE_URL } from "@/lib/site";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Vertical AI - AI-Native Enterprise OS for Conversations",
  description: "The Vertical AI - AI-Native Enterprise OS for Conversations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `body > button[style*="position:fixed"] { display: none !important; }` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var _appendChild = Element.prototype.appendChild;
            var _insertBefore = Element.prototype.insertBefore;
            function hideMozhiBtn(node) {
              if (node && node.tagName === 'BUTTON' && node.style && node.style.position === 'fixed') {
                node.style.setProperty('display', 'none', 'important');
              }
            }
            Element.prototype.appendChild = function(node) {
              hideMozhiBtn(node);
              return _appendChild.call(this, node);
            };
            Element.prototype.insertBefore = function(node, ref) {
              hideMozhiBtn(node);
              return _insertBefore.call(this, node, ref);
            };
          })();
        ` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59XBBQ66');`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8CF8M8RMTB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-8CF8M8RMTB');
            `,
          }}
        />
      </head>
      <body className={`${ubuntu.className} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59XBBQ66"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Page content renders directly (not inside Suspense) so that
            notFound()/redirect() in a page can still set the correct HTTP
            status code before any response bytes are streamed to the client. */}
        {children}
        {/* <ScrollToTop /> */}
        <ChatbotWidget />
      </body>
    </html>
  );
}
