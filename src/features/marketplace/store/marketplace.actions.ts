import { createAsyncThunk } from '@reduxjs/toolkit';
import MarketplaceService from '../services/marketplace.service';

const getNftList = createAsyncThunk<string | null, undefined>(
  'marketplace/getNftList',
  async () => {
    const marketplaceService = new MarketplaceService();
    const response = await marketplaceService.getOwner();
    console.log('response', response);

    return response;
  }
);

export default getNftList;
