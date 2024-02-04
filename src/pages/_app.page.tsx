import '../lib/dayjs'
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer theme="dark" />
      </SessionProvider>
    </>
  )
}
// show
