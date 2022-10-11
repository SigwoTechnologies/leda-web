import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToastPayload = {
  text: string;
  type: AlertColor;
};

export const slice = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {
    openToast: (_, { payload }: PayloadAction<ToastPayload>) => {
      toast[payload.type](payload.text, {
        theme: 'light',
        autoClose: 20000,
        closeOnClick: false,
      });
    },
  },
});

export const { openToast } = slice.actions;
export const uiReducer = slice.reducer;
