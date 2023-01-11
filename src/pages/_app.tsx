import '../assets/css/bootstrap.min.css';
import '../assets/css/feather.css';
import '../assets/css/modal-video.css';
import '../assets/scss/elements/_marketplace.scss';
import '../assets/scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorBoundary from '@components/error-boundary';
import sal from 'sal.js';
import type { AppProps as NextAppProps } from 'next/app';
import Wrapper from '@layout/wrapper';
import store from '../store';
// modified version - allows for custom pageProps type, falling back to 'any'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    sal({ root: null, threshold: 0.1, once: true });
  }, [router.asPath]);

  useEffect(() => {
    sal();
  }, []);
  useEffect(() => {
    document.body.className = 'template-color-1';
  });

  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark">
        <ErrorBoundary>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default MyApp;
