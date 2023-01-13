import HttpService from '../../../common/services/http.service';
import ItemImage from '../../../common/types/item-image';
import { ICollection } from '../../../types/ICollection';
import { Item } from '../../../types/item';
import { FilterType, PriceRangeType } from '../../../types/item-filter-types';
import ICollectionService from '../interfaces/collections-service.interface';
import { CollectionFilterType } from '../types/CollectionsFiltersTypes';

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
    filters: CollectionFilterType
  ): Promise<{ collections: ICollection[]; totalCount: number }> {
    const { limit, page, search, popularityOrder, creationOrder, mintType } = filters;
    const { data } = await this.instance.get<{ collections: ICollection[]; totalCount: number }>(
      `${this.endpoint}/paginate?limit=${limit}&page=${page}&search=${search}&popularityOrder=${popularityOrder}&creationOrder=${creationOrder}&mintType=${mintType}`
    );

    return data;
  }

  async findPagedCollectionsNfts(
    collectionId: string,
    page: number
  ): Promise<{ items: Item[]; totalCount: number; limit: number; page: number }> {
    const { data } = await this.instance.get<{
      items: Item[];
      totalCount: number;
      limit: number;
      page: number;
    }>(`${this.endpoint}/${collectionId}/paginate?limit=3&page=${page}`);

    return data;
  }

  async findPagedCollectionItems(
    collectionId: string,
    filters: FilterType
  ): Promise<{ items: Item[]; totalCount: number }> {
    const { limit, page, likesDirection, priceRange, search } = filters;
    const { data } = await this.instance.get<{ items: Item[]; totalCount: number }>(
      `${this.endpoint}/${collectionId}/paginate?limit=${limit}&page=${page}&likesOrder=${likesDirection}&priceFrom=${priceRange.from}&priceTo=${priceRange.to}&search=${search}`
    );

    return { items: data.items, totalCount: data.totalCount };
  }

  async findPriceRangeCollectionItems(collectionId: string): Promise<PriceRangeType> {
    const { data } = await this.instance.get<PriceRangeType>(
      `${this.endpoint}/${collectionId}/price-range`
    );
    return data;
  }

  async changePicture({
    collectionId,
    image,
  }: {
    collectionId: string;
    image: ItemImage;
  }): Promise<ICollection> {
    const { data } = await this.instance.post(
      `${this.endpoint}/${collectionId}/change-picture`,
      image
    );
    return data;
  }
}

export const collectionsService = new CollectionsService();
