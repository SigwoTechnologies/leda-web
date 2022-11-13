import { ToastContainer } from 'react-toastify';
import Footer from '@layout/footer';
import Header from '@layout/header';
import ScrollToTop from '@ui/scroll-to-top';
import { useTheme } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <ScrollToTop />
      <ToastContainer
        theme={theme}
        pauseOnHover={false}
        newestOnTop
        position="top-right"
        autoClose={5000}
      />
    </>
  );
};

export default Wrapper;
