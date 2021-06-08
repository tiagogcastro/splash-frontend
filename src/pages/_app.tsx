import Head from 'next/head'
import { AuthProvider } from 'src/hooks/useAuth'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lavimco</title>
      </Head>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
