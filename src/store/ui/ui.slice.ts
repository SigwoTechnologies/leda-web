import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { RootState } from '../types';

type AlertColor = 'success' | 'info' | 'warning' | 'error';

type ToastPayload = {
  text: string;
  type: AlertColor;
  theme: 'light' | 'dark' | 'colored';
};

type UiSliceStateType = {
  isNetworkAdviceOpen: boolean;
  isMainnetModalOpen: boolean;
};

const initialState: UiSliceStateType = {
  isNetworkAdviceOpen: true,
  isMainnetModalOpen: false,
};

export const slice = createSlice({
  name: 'ui',
  initialState: initialState as UiSliceStateType,
  reducers: {
    setIsNetworkAdviceOpen: (state, { payload }) => {
      state.isNetworkAdviceOpen = payload;
    },
    setIsMainnetModalOpen: (state, { payload }) => {
      state.isMainnetModalOpen = payload;
    },
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

export const {
  openToast,
  openToastError,
  setIsNetworkAdviceOpen,
  openToastSuccess,
  openToastWarning,
  openToastInfo,
  setIsMainnetModalOpen,
} = slice.actions;

export const uiReducer = slice.reducer;

export const selectUiReducer = (state: RootState) => state.uiReducer;
