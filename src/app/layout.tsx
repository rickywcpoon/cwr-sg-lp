import type { Metadata } from "next";
import Script from "next/script"; // Import the Script component
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Classic Watch Repair Singapore | Expert Vintage Watch Service & Restoration",
  description: "Trusted vintage & classic watch repair in Singapore via NAXO drop-off. Expert HK workshop handles complex restorations, band repairs & servicing. Get a free WhatsApp consultation!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager using next/script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WNMHG6DQ');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Preconnect to WhatsApp domain */}
        <link rel="preconnect" href="https://wa.me" />
        {/* Preload the video poster image */}
        <link rel="preload" as="image" href="/video-static-preview.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WNMHG6DQ"
        height="0" width="0" style={{display:'none', visibility:'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
