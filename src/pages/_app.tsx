import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import sal from 'sal.js';
import { ThemeProvider } from 'next-themes';
import '../assets/css/bootstrap.min.css';
import '../assets/css/feather.css';
import '../assets/css/modal-video.css';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/scss/style.scss';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps as NextAppProps } from 'next/app';
import store from '../store';

// modified version - allows for custom pageProps type, falling back to 'any'
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
    document.body.className = `${pageProps.className}`;
  });
  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({
    className: PropTypes.string,
  }),
};

export default MyApp;
