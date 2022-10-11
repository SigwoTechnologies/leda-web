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
import ErrorBoundary from '@components/error-boundary';
import store from '../store';
import LocalStorageService from '../common/services/local-storage.service';
import AuthService from '../features/auth/services/auth.service';
import useHttp from '../common/hooks/useHttp';

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { getHttpService, requestInterceptor, responseInterceptor } = useHttp();
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

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    const authService = new AuthService(localStorageService);
    const token = authService.getToken();
    const httpInstance = getHttpService();
    const request = requestInterceptor(httpInstance, token);
    const response = responseInterceptor(httpInstance);

    return () => {
      httpInstance.interceptors.request.eject(request);
      httpInstance.interceptors.response.eject(response);
    };
  }, [getHttpService, requestInterceptor, responseInterceptor]);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark">
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
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
