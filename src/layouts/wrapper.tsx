import { ToastContainer } from 'react-toastify';
import Footer from '@layout/footer';
import Header from '@layout/header';
import ScrollToTop from '@ui/scroll-to-top';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { selectAuthState, setIsMainnet } from '../features/auth/store/auth.slice';
import useAppDispatch from '../store/hooks/useAppDispatch';
import { findLikedItemsByAccount } from '../features/account/store/account.actions';
import useAppSelector from '../store/hooks/useAppSelector';
import { setIsNetworkAdviceOpen } from '../store/ui/ui.slice';
import { NetworkNames } from '../common/enums/network-names.enum';
import useMetamask from '../features/auth/hooks/useMetamask';
import NetworkRequestModal from '../components/modals/network-request-modal/network-request.modal';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { isAuthenticated, address } = useAppSelector(selectAuthState);
  const { network } = useMetamask();

  useEffect(() => {
    if (isAuthenticated) dispatch(findLikedItemsByAccount(address));
    dispatch(setIsNetworkAdviceOpen(true));
  }, [dispatch, isAuthenticated, address]);

  useEffect(() => {
    if (network === NetworkNames.MAINNET) dispatch(setIsMainnet(true));
    else dispatch(setIsMainnet(false));
  }, [dispatch, network]);

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <NetworkRequestModal />
      <ScrollToTop />
      <ToastContainer
        theme={theme}
        pauseOnHover={false}
        newestOnTop
        position="top-right"
        autoClose={5000}
      />
      <Footer />
    </>
  );
};

export default Wrapper;
