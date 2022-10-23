import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';
import { getSigner } from '../../../common/utils/metamask-utils';
import { openToast } from '../../../store/ui/ui.slice';
import { localStorageService } from '../../../common/services/local-storage.service';
import constants from '../../../common/configuration/constants';

const signin = createAsyncThunk<string, string, { rejectValue: void }>(
  'auth/signin',
  async (address: string, { dispatch, rejectWithValue }) => {
    const nonce = await authService.getNonce(address);
    const signer = getSigner();

    if (!signer) {
      dispatch(openToast({ type: 'error', text: 'Please make sure you have metamask installed.' }));
      return rejectWithValue();
    }

    const signature = await signer.signMessage(nonce);

    if (!signature) {
      dispatch(
        openToast({
          type: 'error',
          text: 'An error has occurred while signing your message. Please try again.',
        })
      );
      return rejectWithValue();
    }

    const token = await authService.signin(signature, nonce);

    localStorageService.setItem(constants.tokenKey, { access_token: token });

    return token;
  }
);

export default signin;
