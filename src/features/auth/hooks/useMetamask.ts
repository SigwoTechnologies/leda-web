import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MetamaskNotice from '../components/metamask-notice/MetamaskNotice';
import { setEthAddress } from '../store/auth.slice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>();

  const handleAccountChange = (accounts: string[]) => {
    if (accounts && Array.isArray(accounts) && accounts.length) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setAddress(accounts[0]);
      dispatch(setEthAddress(accounts[0]));
      setSigner(provider.getSigner());
    }
  };

  const connect = async () => {
    const isMetamaskIntalled = window.ethereum && window.ethereum.isMetaMask;

    if (!isMetamaskIntalled) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
      return;
    }

    setConnecting(true);
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    provider
      .send('eth_requestAccounts', [])
      .then(handleAccountChange)
      .finally(() => setConnecting(false));
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
    const isMetamaskIntalled = window.ethereum && window.ethereum.isMetaMask;

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
  }, []);

  return { address, signer, connect, connecting, connected };
};

export default useMetamask;
