import { ToastContainer } from 'react-toastify';
import Footer from '@layout/footer';
import Header from '@layout/header';
import ScrollToTop from '@ui/scroll-to-top';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => (
  <>
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
    <ScrollToTop />
    <ToastContainer />
  </>
);

export default Wrapper;
