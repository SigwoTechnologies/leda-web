import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import MetaType from '../../../store/enums/meta-type.enum';
import { openToastError, setIsMainnetModalOpen } from '../../../store/ui/ui.slice';
import type { RootState } from '../../../store/types';
import { rejectWithMetamask } from '../../../store/error/error-handler';
import { randomIntFromInterval } from '../../../utils/getRandomIntFromInterval';
import { authService } from '../services/auth.service';
import { getSigner } from '../../../common/utils/metamask-utils';
import { localStorageService } from '../../../common/services/local-storage.service';
import constants from '../../../common/configuration/constants';
import { setProfileImage } from '../../account/store/account.slice';
import { EnvironmentsEnum } from '../../../common/enums/environments.enum';

export const signIn = createAsyncThunk<string, string, { rejectValue: void }>(
  'auth/signin',
  async (address: string, { dispatch, rejectWithValue }) => {
    try {
      const validToken = await authService.authenticateLocalToken(address);

      if (validToken) return validToken;

      const nonce = await authService.getNonce(address);
      const signer = getSigner();
      const signature = await signer.signMessage(nonce);

      if (!signature) {
        dispatch(
          openToastError('An error has occurred while signing your message. Please try again.')
        );
        return rejectWithValue();
      }

      const token = await authService.signin(signature, nonce);
      localStorageService.setItem(constants.tokenKey, { access_token: token });
      dispatch(setProfileImage(randomIntFromInterval(1, 33)));
      return token;
    } catch (err: unknown) {
      return rejectWithMetamask(err, () => rejectWithValue());
    }
  }
);

export const withAuthProtection = createAsyncThunk(
  'auth/withAuthProtection',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (action: any, { dispatch, getState }) => {
    const { NEXT_PUBLIC_NODE_ENV } = process.env;

    const { auth } = getState() as RootState;
    const callbackUrl = Router.asPath.replace('/', '');

    if (!auth.isConnected) {
      Router.push({
        pathname: '/connect',
        query: { callbackUrl },
      });
      return;
    }

    if (NEXT_PUBLIC_NODE_ENV === EnvironmentsEnum.PROD && !auth.isMainnet) {
      dispatch(setIsMainnetModalOpen(true));
      return;
    }

    const validToken = await authService.authenticateLocalToken(auth.address);

    if (!validToken) {
      const response = await dispatch(signIn(auth.address));
      if (response.meta.requestStatus === MetaType.rejected) return;
    }

    dispatch(action);
  }
);

export const authenticate = createAsyncThunk('auth/authenticate', async (address: string) => {
  const validToken = await authService.authenticateLocalToken(address);
  return !!validToken;
});
