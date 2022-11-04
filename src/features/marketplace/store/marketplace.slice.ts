import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/types';
import { Item } from '../../../types/item';
import ItemStatus from '../process/enums/item-status.enum';
import { getOwner, listItem, findMarketplace } from './marketplace.actions';

export type MarketplaceState = {
  isLoading: boolean;
  NFTs: Item[];
  owner: string | undefined;
};

const initialState: MarketplaceState = {
  owner: '',
  NFTs: [],
  isLoading: false,
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findMarketplace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findMarketplace.fulfilled, (state, { payload }) => {
      state.NFTs = payload.items;
      state.isLoading = false;
    });
    builder.addCase(findMarketplace.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(listItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(listItem.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(listItem.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOwner.fulfilled, (state, { payload }) => {
      state.owner = payload;
    });
  },
});

export const selectOwner = (state: RootState) => state.marketplace.owner;

export const selectNFTsMarketplace = (state: RootState) => state.marketplace;

export const selectCanIList = (state: RootState, item: Item) => {
  const { address } = state.auth;
  return item.owner.address === address && item.status === ItemStatus.NotListed;
};

export const marketplaceReducer = marketplaceSlice.reducer;
