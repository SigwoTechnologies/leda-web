import PropTypes from 'prop-types';
import ScrollToTop from '@ui/scroll-to-top';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => (
  <>
    {children}
    <ScrollToTop />
    <ToastContainer />
  </>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
