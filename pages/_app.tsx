import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout'
import { StoreProvider } from 'store/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider initialValue={{ user: {} }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
