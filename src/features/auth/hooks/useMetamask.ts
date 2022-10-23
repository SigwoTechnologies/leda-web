import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MetamaskNotice from '../components/metamask-notice/MetamaskNotice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import signin from '../store/auth.actions';

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [isMetamaskIntalled, setIsMetamaskInstalled] = useState(false);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>();

  useEffect(() => {
    const isInstalled = window.ethereum && window.ethereum.isMetaMask;
    setIsMetamaskInstalled(isInstalled);
  }, []);

  const handleAccountChange = (accounts: string[]) => {
    if (accounts && Array.isArray(accounts) && accounts.length) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setAddress(accounts[0]);
      setSigner(provider.getSigner());
    }
  };

  const connect = async () => {
    if (!isMetamaskIntalled) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
      return;
    }

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    provider.send('eth_requestAccounts', []).then(handleAccountChange);
  };

  const sign = async () => {
    if (!isMetamaskIntalled) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
      return;
    }

    dispatch(signin(address));
  };

  useEffect(() => {
    // if the user is connected and the account changes we reload the page
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    connected && window.location.reload();

    // If the user is not connected but the account changes we set connected to true
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    address && setConnected(true);
  }, [address]);

  useEffect(() => {
    if (isMetamaskIntalled) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });

      provider.send('eth_accounts', []).then(handleAccountChange);
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts && Array.isArray(accounts)) {
          setAddress(accounts[0]);
        }
      });
    }
  }, [isMetamaskIntalled]);

  return { address, signer, connect, connected, sign };
};

export default useMetamask;
