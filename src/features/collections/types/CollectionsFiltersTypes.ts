import { ICollection } from '../../../types/ICollection';

export type CollectionsFiltersTypes = {
  search: string;
  popularityOrder: string | 'asc' | 'desc';
  creationOrder: string | 'asc' | 'desc';
  mintType: string | 'lazy' | 'normal';
  limit: number;
  page: number;
};

export type CollectionPagination = {
  collections: ICollection[];
  totalCount: number;
};
