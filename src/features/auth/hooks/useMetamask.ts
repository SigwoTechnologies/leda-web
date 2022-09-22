import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MetamaskNotice from '../../components/metamask-notice/MetamaskNotice';

const useMetamask = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [connected, setConnected] = useState(false);

  const handleAccountsChanged = (account: string) => {
    if (account) {
      setCurrentAccount(account);
      setConnected(true);
    }
  };

  const connect = async () => {
    if (!window.ethereum) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
      return;
    }

    if (provider) {
      try {
        setConnecting(true);
        const [selectedAccount] = await provider.send('eth_requestAccounts', []);

        handleAccountsChanged(selectedAccount);
      } finally {
        setConnecting(false);
      }
    }
  };

  const handleChange = () => window.location.reload();

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      window.ethereum.on('accountsChanged', handleChange);
      window.ethereum.on('chainChanged', handleChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleChange);
        window.ethereum.removeListener('chainChanged', handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (provider) {
      provider.send('eth_accounts', []).then(([selectedAccount]: string[]) => {
        handleAccountsChanged(selectedAccount);
      });
    }
  }, [provider]);

  return { currentAccount, connect, connecting, connected };
};

export default useMetamask;
