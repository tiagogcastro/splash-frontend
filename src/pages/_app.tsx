import Head from 'next/head'
import { AuthProvider } from 'src/hooks/useAuth'
import SponsorshipProvider from 'src/hooks/useSponsorship'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SponsorshipProvider>

      <Head>
        <title>Lavimco</title>

      </Head>

      <Component {...pageProps} />
      </SponsorshipProvider>
    </AuthProvider>
  )
}

export default MyApp
