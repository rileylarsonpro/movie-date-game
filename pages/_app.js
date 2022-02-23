import { wrapper } from '../store/store'
import '../scss/custom.scss';
import { useEffect } from "react"

const WrappedApp = ({ Component, pageProps }) => {{
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />
}}

export default wrapper.withRedux(WrappedApp)
