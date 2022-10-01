import { createAsyncThunk } from '@reduxjs/toolkit';
import marketplaceService from '../services/marketplace.service';

const getNftList = createAsyncThunk<string | null, undefined>(
  'marketplace/getNftList',
  async () => {
    const response = await marketplaceService.getOwner();
    console.log('response', response);

    return response;
  }
);

export default getNftList;
