import { Item } from '@types';
import httpService from '../../../common/services/http.service';

export default class AccountService {
  private readonly endpoint: string;

  constructor() {
    this.endpoint = 'accounts';
  }

  async findItemsByAccount(address: string): Promise<Item[]> {
    const { data } = await httpService.get<Item[]>(`${this.endpoint}/${address}/items`);
    return data;
  }
}
