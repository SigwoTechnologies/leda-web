import { FilterTypeBase } from '../../../types/item-filter-types';

export type CollectionFilterType = {
  popularityOrder: string | 'asc' | 'desc';
  creationOrder: string | 'asc' | 'desc';
  mintType: string | 'lazy' | 'normal';
} & FilterTypeBase;
