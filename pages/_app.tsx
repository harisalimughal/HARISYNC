import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import "../src/index.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Navbar />
      <main className="overflow-x-clip">
        <Component {...pageProps} />
      </main>
      <Script
        src="https://api.answero.urdux.tech/widget.js"
        data-widget-id="widget_fb6ac8f5e051e7f2396de92506b6c4cc"
        strategy="afterInteractive"
      />
      <Footer />
    </>
  );
}
