import { History, Item } from '@types';
import HttpService from '../../../common/services/http.service';
import DraftItemRequest from '../../../common/types/draft-item-request';
import ActivateItemRequest from '../../../common/types/activate-item-request';
import { FilterType, PriceRangeType } from '../../../types/item-filter-types';
import IItemService from '../interfaces/item-service.interface';
import ProcessLazyItemRequest from '../../../common/types/process-lazy-item-request';
import { Voucher } from '../types/lazy-minting-types';

export default class ItemService extends HttpService implements IItemService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'items';
  }

  async findAll(): Promise<Item[]> {
    const { data } = await this.instance.get(`${this.endpoint}`);
    return data.items;
  }

  async getNewest(qty: number) {
    const { data } = await this.instance.get(`${this.endpoint}/newest?qty=${qty}`);
    return data;
  }

  async findPagedItems(filters: FilterType): Promise<{ items: Item[]; totalCount: number }> {
    const { limit, page, likesDirection, priceRange, search } = filters;
    const { data } = await this.instance.get<{ items: Item[]; totalCount: number }>(
      `${this.endpoint}/paginate?limit=${limit}&page=${page}&likesOrder=${likesDirection}&priceFrom=${priceRange.from}&priceTo=${priceRange.to}&search=${search}`
    );

    return { items: data.items, totalCount: data.totalCount };
  }

  async findById(itemId: string): Promise<Item> {
    const { data } = await this.instance.get<Item>(`${this.endpoint}/${itemId}`);
    return data;
  }

  async findPriceRange(): Promise<PriceRangeType> {
    const { data } = await this.instance.get<PriceRangeType>(`${this.endpoint}/price-range`);
    return data;
  }

  async findVoucherByItemId(itemId: string): Promise<Voucher> {
    const { data } = await this.instance.get<Voucher>(`${this.endpoint}/${itemId}/voucher`);
    return data;
  }

  async buy(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/buy`, {
      address,
    });
    return data;
  }

  async transfer(
    itemId: string,
    address: string,
    voucherId: string,
    tokenId: number
  ): Promise<void> {
    await this.instance.patch<Item>(`${this.endpoint}/${itemId}/transfer`, {
      owner: address,
      voucherId,
      tokenId,
    });
  }

  async list(itemId: string, price: string, listId: number, address: string): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}/${itemId}/list`, {
      price,
      listId,
      address,
    });
    return data;
  }

  async delist(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.patch<Item>(`${this.endpoint}/${itemId}/delist`, {
      address,
    });
    return data;
  }

  async create(item: DraftItemRequest): Promise<Item> {
    const { data } = await this.instance.post<Item>(`${this.endpoint}`, item);
    return data;
  }

  async activate(item: ActivateItemRequest): Promise<Item> {
    const { data } = await this.instance.patch<Item>(
      `${this.endpoint}/${item.itemId}/activate`,
      item
    );
    return data;
  }

  async processLazyItem(lazyItemRequest: ProcessLazyItemRequest): Promise<Item> {
    const { data } = await this.instance.patch<Item>(
      `${this.endpoint}/${lazyItemRequest.itemId}/process-lazy-item`,
      lazyItemRequest
    );
    return data;
  }

  async findAllHistory(): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/history`);
    return data;
  }

  async findHistoryByItemId(itemId: string): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/${itemId}/history`);
    return data;
  }

  async like(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.patch<Item>(`${this.endpoint}/${itemId}/like`, {
      address,
    });
    return data;
  }

  async hide(itemId: string, address: string): Promise<Item> {
    const { data } = await this.instance.patch<Item>(`${this.endpoint}/${itemId}/hide-unhide`, {
      address,
    });
    return data;
  }
}

export const itemService = new ItemService();
