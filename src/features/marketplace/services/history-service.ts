import { History, Item } from '@types';
import { TransactionType } from '../../../common/enums/transaction-types.enum';
import HttpService from '../../../common/services/http.service';

export interface IHistoryRequestDto {
  accountAddress: string;
  itemId: string;
  price: string;
  listId: number;
  transactionType: TransactionType;
}

export default class HistoryService extends HttpService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'history';
  }

  async findAll(): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/items`);
    return data;
  }

  async findAllByItemId(itemId: string): Promise<History[]> {
    const { data } = await this.instance.get<History[]>(`${this.endpoint}/items/${itemId}`);
    return data;
  }

  async create(historyRequestDto: IHistoryRequestDto): Promise<Item> {
    const { data } = await this.instance.post(`${this.endpoint}/items`, historyRequestDto);

    return data;
  }
}

export const historyService = new HistoryService();
