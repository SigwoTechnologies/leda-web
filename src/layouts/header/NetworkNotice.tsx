import clsx from 'clsx';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { selectUiReducer, setIsNetworkAdviceOpen } from '@store/ui/ui.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { NetworkNames } from '../../common/enums/network-names.enum';

const NETWORK_NAMES: { [key: string]: string } = {
  [NetworkNames.MAINNET]: 'Mainnet',
  [NetworkNames.LOCALHOST]: 'Localhost',
  [NetworkNames.SEPOLIA]: 'Sepolia',
  [NetworkNames.GOERLI]: 'Goerli',
};

export const NetworkNotice = () => {
  const { isNetworkAdviceOpen } = useAppSelector(selectUiReducer);
  const dispatch = useAppDispatch();
  const { network } = useMetamask();

  const handleClick = () => dispatch(setIsNetworkAdviceOpen(!isNetworkAdviceOpen));

  if (network !== NetworkNames.MAINNET && isNetworkAdviceOpen) {
    return (
      <div
        className={clsx(
          'alert alert-warning alert-dismissible fade d-flex text-center justify-content-center',
          isNetworkAdviceOpen && 'show'
        )}
        role="alert"
        style={{ position: 'sticky', top: '0', zIndex: '99' }}
      >
        You&apos;re viewing data from the main network, but your wallet is connected to the test
        network ({NETWORK_NAMES[network]}). To use Leda Marketplace, please switch to mainnet
        network in your wallet
        <button type="button" style={{ width: '5%', border: 'none' }} onClick={handleClick}>
          &times;
        </button>
      </div>
    );
  }

  return null;
};
