import { createAsyncThunk } from '@reduxjs/toolkit';
import marketplaceService from '../services/marketplace.service';

const getOwner = createAsyncThunk('marketplace/getNftList', async () => {
  const service = await marketplaceService();
  return service.getOwner();
});

export default getOwner;
