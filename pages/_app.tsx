import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout'
import { StoreProvider } from 'store/index'
import { NextPage } from 'next'

interface IProps {
  initialValue: Record<any, any>
  Component: NextPage
  pageProps: any
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

// TODO: 最好还是自己定义一下类型，不要全部都用any来对类型进行声明了
MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  console.log('+++++++')
  console.log(ctx?.req.cookies)
  const { userId, nickname, avatar } = ctx?.req.cookies || {}

  return {
    initialValue: {
      user: {
        userInfo: {
          userId,
          nickname,
          avatar
        }
      }
    }
  }
}

export default MyApp
