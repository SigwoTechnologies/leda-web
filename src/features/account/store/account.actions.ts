import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '@types';
import AccountService from '../services/account.service';

const findItemsByAccount = createAsyncThunk(
  'account/findItemsByAccount',
  async (address: string): Promise<Item[]> => {
    const accountService = new AccountService();
    return accountService.findItemsByAccount(address);
  }
);

export default findItemsByAccount;
