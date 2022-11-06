import { ethers } from 'ethers';
import { useEffect, useCallback, useState } from 'react';
import { authenticate, signin } from '../store/auth.actions';
import { openToastError } from '../../../store/ui/ui.slice';
import { selectAuthState, setAddress, setIsConnected } from '../store/auth.slice';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import { NetworkNames } from '../../../common/enums/network-names.enum';
import useAppSelector from '../../../store/hooks/useAppSelector';

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [network, setNetwork] = useState(NetworkNames.MAINNET);
  const [connected, setConnected] = useState(false);
  const [isMetamaskIntalled, setIsMetamaskInstalled] = useState(false);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>();
  const { address, isConnected } = useAppSelector(selectAuthState);

  useEffect(() => {
    const isInstalled = window.ethereum && window.ethereum.isMetaMask;
    setIsMetamaskInstalled(isInstalled);
  }, []);

  const handleAccountChange = useCallback(
    (accounts: string[]) => {
      if (accounts && Array.isArray(accounts) && accounts.length) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        dispatch(setAddress(accounts[0]));
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

    if (!address) {
      dispatch(openToastError('Please sign in using your Metamask account'));
      return;
    }

    dispatch(signin(address));
  };

  useEffect(() => {
    // if the user is connected and the account changes we reload the page
    if (connected) window.location.reload();

    // If the user is not connected but the account changes we set connected to true
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (address) {
      setConnected(true);
      dispatch(setIsConnected(true));
    }
  }, [dispatch, address]);

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
          setAddress(accounts[0]);
          dispatch(setAddress(accounts[0]));
        }
      });
    }
  }, [dispatch, isMetamaskIntalled, handleAccountChange]);

  return { address, signer, connect, isConnected, sign, network };
};

export default useMetamask;
