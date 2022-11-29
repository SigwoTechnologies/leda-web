import HttpService from '../../../common/services/http.service';
import { ICollection } from '../../../types/ICollection';
import ICollectionService from '../interfaces/collections-service.interface';
import { CollectionsFiltersTypes } from '../types/CollectionsFiltersTypes';

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
    return data.collections;
  }

  async findNewest(qty: number): Promise<ICollection[]> {
    const { data } = await this.instance.get(`${this.endpoint}/paginate?limit=${qty}`);
    return data.collections;
  }

  async findPagedCollections(
    filters: CollectionsFiltersTypes
  ): Promise<{ collections: ICollection[]; totalCount: number }> {
    const { limit, page, search, popularityOrder, creationOrder, mintType } = filters;
    const { data } = await this.instance.get<{ collections: ICollection[]; totalCount: number }>(
      `${this.endpoint}/paginate?limit=${limit}&page=${page}&search=${search}&popularityOrder=${popularityOrder}&creationOrder=${creationOrder}&mintType=${mintType}`
    );

    return { collections: data.collections, totalCount: data.totalCount };
  }
}

export const collectionsService = new CollectionsService();
