import { createSlice } from '@reduxjs/toolkit';
import { CollectionCreateType } from '../../../types/collection-type';
import { ItemProperty } from '../../../common/types/ipfs-types';
import type { RootState } from '../../../store/types';

type CreateNftFields = {
  nftImage: File | null;
  nftName: string;
  nftDescription: string;
  nftCollection: CollectionCreateType | null;
  nftTags: string[];
  nftProperties: ItemProperty[];
  nftRoyalty: number;
};

type CreateNftState = {
  nftCreateFields: CreateNftFields;
  availableToSubmit: boolean;
  isLoading: boolean;
};

export const initialNftCreateFields = {
  nftImage: null,
  nftName: '',
  nftDescription: '',
  nftCollection: {
    name: '',
    description: '',
  },
  nftTags: [],
  nftProperties: [
    {
      key: '',
      value: '',
    },
  ],
  nftRoyalty: 1,
};

const initialState: CreateNftState = {
  nftCreateFields: initialNftCreateFields,
  availableToSubmit: false,
  isLoading: false,
};

const createNftSlice = createSlice({
  name: 'create-nft',
  initialState,
  reducers: {
    setCreateNftFields: (state, { payload }) => {
      state.nftCreateFields = payload;
    },
    setAvailableToSubmit: (state, { payload }) => {
      state.availableToSubmit = payload;
    },
    setIsLoadingSubmitting: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const createNftReducer = createNftSlice.reducer;

export const { setCreateNftFields, setAvailableToSubmit, setIsLoadingSubmitting } =
  createNftSlice.actions;

export const selectCreateNftState = (state: RootState) => state.createPageFields;
