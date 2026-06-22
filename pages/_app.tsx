import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../src/index.css'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}
