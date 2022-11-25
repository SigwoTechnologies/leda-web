import HttpService from '../../../common/services/http.service';
import { ICollection } from '../../../types/ICollection';
import ICollectionService from '../interfaces/collections-service.interface';

export default class CollectionsService extends HttpService implements ICollectionService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'collections';
  }

  async findById(collectionId: string): Promise<ICollection> {
    const { data } = await this.instance.get(`${this.endpoint}/${collectionId}`);
    return data;
  }

  async findAll(): Promise<ICollection[]> {
    const { data } = await this.instance.get(`${this.endpoint}/paginate`);
    return data;
  }

  async findNewest(qty: number): Promise<ICollection[]> {
    const { data } = await this.instance.get(`${this.endpoint}/paginate?qty=${qty}`);
    return data;
  }
}

export const collectionsService = new CollectionsService();
