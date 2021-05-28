import Head from 'next/Head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lavimco</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
