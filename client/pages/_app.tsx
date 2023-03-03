import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { Meta } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}
