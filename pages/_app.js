import { wrapper } from '../store/store'
import '../scss/custom.scss';
import { AuthGuard } from "../components/AuthGuard"


const WrappedApp = ({ Component, pageProps }) => {{
  return <>
  {Component.requireAuth ? (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  ) : (
    // public page
    <Component {...pageProps} />
  )}</>
}}

export default wrapper.withRedux(WrappedApp)
