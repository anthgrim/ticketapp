import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { Meta } from '@/components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}
