import useAppSelector from '@store/hooks/useAppSelector';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { NetworkNames } from '../../../common/enums/network-names.enum';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import { openToastError } from '../../../store/ui/ui.slice';
import { authenticate, signIn } from '../store/auth.actions';
import { setAccount, setIsConnected } from '../store/auth.slice';

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [network, setNetwork] = useState(NetworkNames.MAINNET);
  const [connected, setConnected] = useState(false);
  const [isMetamaskIntalled, setIsMetamaskInstalled] = useState(false);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>();
  const { account, isConnected } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const isInstalled = window.ethereum && window.ethereum.isMetaMask;
    setIsMetamaskInstalled(isInstalled);
  }, []);

  const handleAccountChange = useCallback(
    (accounts: string[]) => {
      if (accounts && Array.isArray(accounts) && accounts.length) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        dispatch(setAccount({ ...account, address: accounts[0] }));
        dispatch(authenticate(accounts[0]));
      }
    },
    [dispatch]
  );

  const connect = async () => {
    if (!isMetamaskIntalled) {
      dispatch(
        openToastError('LEDA marketplace can only be accessed when Metamask has been installed.')
      );
      return;
    }

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    provider.send('eth_requestAccounts', []).then(handleAccountChange);
  };

  const sign = async () => {
    if (!isMetamaskIntalled) {
      dispatch(
        openToastError('LEDA marketplace can only be accessed when Metamask has been installed.')
      );
      return;
    }

    if (!account.address) {
      dispatch(openToastError('Please sign in using your Metamask account'));
      return;
    }

    dispatch(signIn(account.address));
  };

  useEffect(() => {
    // if the user is connected and the account changes we reload the page
    if (connected) window.location.reload();

    // If the user is not connected but the account changes we set connected to true
    if (account.address) {
      setConnected(true);
      dispatch(setIsConnected(true));
    }
  }, [dispatch, account.address]);

  useEffect(() => {
    if (isMetamaskIntalled) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }

        setNetwork(newNetwork.name);
      });

      provider.send('eth_accounts', []).then(handleAccountChange);
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts && Array.isArray(accounts)) {
          dispatch(setAccount({ ...account, address: accounts[0] }));
        }
      });
    }
  }, [dispatch, isMetamaskIntalled, handleAccountChange]);

  return { address: account.address, signer, connect, isConnected, sign, network };
};

export default useMetamask;
