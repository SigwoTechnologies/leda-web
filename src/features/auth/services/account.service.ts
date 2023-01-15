import HttpService from '../../../common/services/http.service';
import { Account } from '../../../types/account';
import { ICollection } from '../../../types/ICollection';
import { Item } from '../../../types/item';
import { FilterType } from '../../../types/item-filter-types';

export default class AccountService extends HttpService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'accounts';
  }

  async findCreatedItemsByAccount(
    address: string,
    filters: FilterType
  ): Promise<{ count: number; items: Item[] }> {
    const { data } = await this.instance.get(
      `${this.endpoint}/${address}/items/created?limit=${filters.limit}&page=${filters.page}`
    );
    return data;
  }

  async findOwnedItemsByAccount(
    address: string,
    filters: FilterType
  ): Promise<{ count: number; items: Item[] }> {
    const { data } = await this.instance.get(
      `${this.endpoint}/${address}/items/owned?limit=${filters.limit}&page=${filters.page}`
    );
    return data;
  }

  async findOnSaleItemsByAccount(
    address: string,
    filters: FilterType
  ): Promise<{ count: number; items: Item[] }> {
    const { data } = await this.instance.get(
      `${this.endpoint}/${address}/items/on-sale?limit=${filters.limit}&page=${filters.page}`
    );
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

  async changeInformation(account: Account): Promise<Account> {
    const { data } = await this.instance.patch(`${this.endpoint}/${account.address}/`, account);
    return data;
  }
}

export const accountService = new AccountService();
