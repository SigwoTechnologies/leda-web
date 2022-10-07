import { createAsyncThunk } from '@reduxjs/toolkit';
import MarketplaceService from '../services/marketplace.service';

const getOwner = createAsyncThunk('marketplace/getNftList', async () => {
  const service = new MarketplaceService();
  return service.getOwner();
});

export default getOwner;
