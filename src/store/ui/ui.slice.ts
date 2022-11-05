import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToastPayload = {
  text: string;
  type: AlertColor;
  theme: 'light' | 'dark' | 'colored';
};

export const slice = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {
    openToast: (_, { payload }: PayloadAction<ToastPayload>) => {
      toast[payload.type](payload.text, {
        theme: payload.theme,
        autoClose: 20000,
        closeOnClick: false,
      });
    },
    openToastError: (_, { payload }: PayloadAction<string>) => {
      toast.error(payload, {
        theme: 'light',
        autoClose: 20000,
        closeOnClick: false,
      });
    },
    openToastSuccess: (_, { payload }: PayloadAction<string>) => {
      toast.success(payload, {
        theme: 'light',
        autoClose: 20000,
        closeOnClick: false,
      });
    },
    openToastWarning: (_, { payload }: PayloadAction<string>) => {
      toast.warning(payload, {
        theme: 'light',
        autoClose: 20000,
        closeOnClick: false,
      });
    },
    openToastInfo: (_, { payload }: PayloadAction<string>) => {
      toast.info(payload, {
        theme: 'light',
        autoClose: 20000,
        closeOnClick: false,
      });
    },
  },
});

export const { openToast, openToastError, openToastSuccess, openToastWarning, openToastInfo } =
  slice.actions;
export const uiReducer = slice.reducer;
