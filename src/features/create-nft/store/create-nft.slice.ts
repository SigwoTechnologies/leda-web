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
};

const createNftSlice = createSlice({
  name: 'create-nft',
  initialState,
  reducers: {
    setCreateNftFields: (state, { payload }) => {
      state.nftCreateFields = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const createNftReducer = createNftSlice.reducer;

export const { setCreateNftFields } = createNftSlice.actions;

export const selectCreateNftState = (state: RootState) => state.createPageFields;
