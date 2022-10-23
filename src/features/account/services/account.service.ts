import { Item } from '@types';
import HttpService from '../../../common/services/http.service';

export default class AccountService extends HttpService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'accounts';
  }

  async findItemsByAccount(address: string): Promise<Item[]> {
    const { data } = await this.instance.get<Item[]>(`${this.endpoint}/${address}/items`);
    return data;
  }
}
