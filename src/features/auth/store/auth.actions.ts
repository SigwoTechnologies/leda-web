import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import { authService } from '../services/auth.service';
import { getSigner } from '../../../common/utils/metamask-utils';
import { localStorageService } from '../../../common/services/local-storage.service';
import { openToastError } from '../../../store/ui/ui.slice';
import { rejectWithMetamask } from '../../../store/error/error-handler';
import constants from '../../../common/configuration/constants';
import type { RootState } from '../../../store/types';

const authenticate = createAsyncThunk<boolean, string>(
  'auth/authenticate',
  async (address: string) => {
    const validToken = await authService.authenticateLocalToken(address);
    return !!validToken;
  }
);

const signin = createAsyncThunk<string, string, { rejectValue: void }>(
  'auth/signin',
  async (address: string, { dispatch, rejectWithValue }) => {
    try {
      const validToken = await authService.authenticateLocalToken(address);

      if (validToken) return validToken;

      const nonce = await authService.getNonce(address);
      const signer = getSigner();

      if (!signer) {
        dispatch(openToastError('Please make sure you have metamask installed.'));
        return rejectWithValue();
      }

      const signature = await signer.signMessage(nonce);

      if (!signature) {
        dispatch(
          openToastError('An error has occurred while signing your message. Please try again.')
        );
        return rejectWithValue();
      }

      const token = await authService.signin(signature, nonce);
      localStorageService.setItem(constants.tokenKey, { access_token: token });

      return token;
    } catch (err: unknown) {
      return rejectWithMetamask(err, () => rejectWithValue());
    }
  }
);

const withAuthProtection = createAsyncThunk(
  'auth/withAuthProtection',
  async (action: any, { dispatch, getState }) => {
    const { auth } = getState() as RootState;
    const callbackUrl = Router.asPath.replace('/', '');

    if (!auth.isConnected) {
      Router.push({
        pathname: '/connect',
        query: { callbackUrl },
      });
      return;
    }

    const validToken = await authService.authenticateLocalToken(auth.address);

    if (!validToken) {
      Router.push({
        pathname: '/signature',
        query: { callbackUrl },
      });
      return;
    }

    dispatch(action);
  }
);

export { authenticate, signin, withAuthProtection };
