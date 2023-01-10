import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';

type CollectionsState = {
  isPagingLoading: boolean;
};

const initialState: CollectionsState = {
  isPagingLoading: false,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const collectionsReducer = collectionsSlice.reducer;

export const selectCollectionsState = (state: RootState) => state.collections;
