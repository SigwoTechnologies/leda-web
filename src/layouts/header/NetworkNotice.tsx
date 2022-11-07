import clsx from 'clsx';
import { useState } from 'react';
import { NetworkNames } from '../../common/enums/network-names.enum';
import useMetamask from '../../features/auth/hooks/useMetamask';

const NETWORK_NAMES: { [key: string]: string } = {
  [NetworkNames.MAINNET]: 'Mainnet',
  [NetworkNames.LOCALHOST]: 'Localhost',
  [NetworkNames.SEPOLIA]: 'Sepolia',
  [NetworkNames.GOERLI]: 'Goerli',
};

export const NetworkNotice = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { network } = useMetamask();

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  if (network !== NetworkNames.MAINNET && isVisible) {
    return (
      <div
        className={clsx(
          'alert alert-warning alert-dismissible fade d-flex text-center justify-content-center',
          isVisible && 'show'
        )}
        role="alert"
        style={{ position: 'sticky', top: '0', zIndex: '9999' }}
      >
        You&apos;re viewing data from the main network, but your wallet is connected to the test
        network ({NETWORK_NAMES[network]}). To use Leda Marketplace, please switch to mainnet
        network in your wallet
        <button type="button" style={{ width: '5%' }} onClick={handleClick}>
          &times;
        </button>
      </div>
    );
  }

  return null;
};
