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
      <script
  src="https://api.answero.urdux.tech/widget.js"
  data-widget-id="widget_166d369d3208f5b73f3008c89b44bb95"
  async>
</script>
      <Footer />
    </>
  );
}
