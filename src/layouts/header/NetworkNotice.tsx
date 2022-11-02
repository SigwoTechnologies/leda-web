import clsx from 'clsx';
import { useState } from 'react';
import { NetworkNames } from '../../common/enums/network-names.enum';
import useMetamask from '../../features/auth/hooks/useMetamask';

export const NetworkNotice = () => {
  const { network } = useMetamask();

  const [show, setHow] = useState(true);

  const handleClick = () => {
    setHow(!show);
  };

  if (network !== NetworkNames.MAINNET && show) {
    return (
      <div
        className={clsx(
          'alert alert-warning alert-dismissible fade d-flex text-center justify-content-center',
          show && 'show'
        )}
        role="alert"
      >
        You&apos;re viewing data from the main network, but your wallet is connected to the test
        network ({network}). To use Leda Marketplace, please switch to mainnet network in your
        wallet
        <button type="button" style={{ width: '5%' }} onClick={handleClick}>
          &times;
        </button>
      </div>
    );
  }

  return null;
};
