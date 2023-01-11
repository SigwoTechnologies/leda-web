import { Item } from '@types';
import HttpService from '../../../common/services/http.service';
import { ICollection } from '../../../types/ICollection';

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

  async findLikedItemsByAccount(address: string): Promise<Item[]> {
    const { data } = await this.instance.get<Item[]>(`${this.endpoint}/${address}/liked-items`);
    return data;
  }

  async findUserCollections(address: string): Promise<ICollection[]> {
    const { data } = await this.instance.get<ICollection[]>(
      `${this.endpoint}/${address}/collections`
    );
    return data;
  }

  async findUserCollectionsWithoutItems(address: string): Promise<ICollection[]> {
    const { data } = await this.instance.get<ICollection[]>(
      `${this.endpoint}/${address}/collections-list`
    );
    return data;
  }
}

export const accountService = new AccountService();
