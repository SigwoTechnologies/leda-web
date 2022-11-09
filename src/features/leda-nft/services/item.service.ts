import { Item } from '@types';
import HttpService from '../../../common/services/http.service';
import ItemRequest from '../../../common/types/item-request';
import { FilterType } from '../../../types/item-filter-types';

export default class ItemService extends HttpService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'items';
  }

  async findAll(): Promise<Item[]> {
    const { data } = await this.instance.get(`${this.endpoint}`);
    return data;
  }

  async findPagedItems(filters: FilterType): Promise<{ items: Item[]; totalCount: number }> {
    const { limit, page, likesDirection, priceRange } = filters;
    const { data } = await this.instance.get<{ items: Item[]; totalCount: number }>(
      `${this.endpoint}/paginate?limit=${limit}&page=${page}&likesOrder=${likesDirection}&priceFrom=${priceRange.from}&priceTo=${priceRange.to}`
    );

    return { items: data.items, totalCount: data.totalCount };
  }

  async findById(itemId: string): Promise<Item> {
    const { data } = await this.instance.get<Item>(`${this.endpoint}/${itemId}`);
    return data;
  }

  async buy(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/buy`, {
      address,
    });
    return data;
  }

  async list(itemId: string, price: string, listId: number): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/price`, {
      price,
      listId,
    });
    return data;
  }

  async create(item: ItemRequest): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}`, item);
    return data;
  }
}

export const itemService = new ItemService();
