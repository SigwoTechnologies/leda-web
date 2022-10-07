import { Item } from '@types';
import httpService from '../../../common/services/http.service';

export default class ItemService {
  private readonly endpoint: string;

  constructor() {
    this.endpoint = 'items';
  }

  async findAll(): Promise<Item[]> {
    const { data } = await httpService.get<Item[]>(this.endpoint);
    return data;
  }
}
