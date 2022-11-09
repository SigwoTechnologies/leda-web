import { AnyAction } from '@reduxjs/toolkit';
import store from '../../../store';
import { FilterType } from '../../../types/item-filter-types';
import { getOwner } from './marketplace.actions';
import { marketplaceReducer, MarketplaceState, selectOwner } from './marketplace.slice';

describe('Marketplace slice', () => {
  let initialState: MarketplaceState;

  beforeEach(() => {
    initialState = {
      owner: '',
      isLoading: false,
      marketplaceFilters: {
        likesDirection: '',
        search: '',
        priceRange: {
          from: 0.0001, // TODO: Determine this from cheapest to most expensive
          to: 100, // TODO: Determine this from cheapest to most expensive
        },
        page: 1,
        limit: 5,
      } as FilterType,
      itemPagination: { items: [], totalCount: 0 },
    };
  });

  describe('When loading slice', () => {
    it('should return initial state', () => {
      const expected = initialState;

      const actual = marketplaceReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When getOwner function is called', () => {
    it('should assign an owner successfully', () => {
      const expected = 'Jane Doe';

      const actual = marketplaceReducer(undefined, getOwner.fulfilled(expected, ''));

      expect(actual.owner).toEqual(expected);
    });
  });

  describe('When selectOwner is called', () => {
    it('should return the owner from the state', () => {
      const expected = '';

      const actual = selectOwner(store.getState());

      expect(actual).toEqual(expected);
    });
  });
});
