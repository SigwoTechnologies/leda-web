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
        closeOnClick: false,
      });
    },
    openToastError: (_, { payload }: PayloadAction<string>) => {
      toast.error(payload, {
        closeOnClick: false,
      });
    },
    openToastSuccess: (_, { payload }: PayloadAction<string>) => {
      toast.success(payload, {
        closeOnClick: false,
      });
    },
    openToastWarning: (_, { payload }: PayloadAction<string>) => {
      toast.warning(payload, {
        closeOnClick: false,
      });
    },
    openToastInfo: (_, { payload }: PayloadAction<string>) => {
      toast.info(payload, {
        closeOnClick: false,
      });
    },
  },
});

export const { openToast, openToastError, openToastSuccess, openToastWarning, openToastInfo } =
  slice.actions;
export const uiReducer = slice.reducer;
