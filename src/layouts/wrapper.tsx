import { findLikedItemsByAccount } from '@features/auth/store/account.actions';
import Footer from '@layout/footer';
import Header from '@layout/header';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { setIsNetworkAdviceOpen } from '@store/ui/ui.slice';
import ScrollToTop from '@ui/scroll-to-top';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { NetworkNames } from '../common/enums/network-names.enum';
import NetworkRequestModal from '../components/modals/network-request-modal/network-request.modal';
import useMetamask from '../features/auth/hooks/useMetamask';
import { setIsMainnet } from '../features/auth/store/auth.slice';

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    account: { address },
  } = useAppSelector((state) => state.auth);
  const { filters } = useAppSelector((state) => state.marketplace);
  const { network } = useMetamask();

  useEffect(() => {
    if (isAuthenticated) dispatch(findLikedItemsByAccount(filters));
    dispatch(setIsNetworkAdviceOpen(true));
  }, [dispatch, isAuthenticated, address, filters]);

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
