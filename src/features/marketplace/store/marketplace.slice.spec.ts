import { AnyAction } from '@reduxjs/toolkit';
import store from '../../../store';
import { FilterType } from '../../../types/item-filter-types';
import { Item } from '../../../types/item';
import {
  findFilteredItems,
  findPagedItems,
  getOwner,
  listItem,
  getNewest,
} from './marketplace.actions';
import {
  marketplaceReducer,
  MarketplaceState,
  resetMarketplaceFilters,
  selectOwner,
  setMarketplaceFilters,
} from './marketplace.slice';

describe('Marketplace slice', () => {
  let initialState: MarketplaceState;

  beforeEach(() => {
    initialState = {
      owner: '',
      isLoading: false,
      isPagingLoading: false,
      isLoadingHistory: false,
      newestItems: [],
      loadingNewest: false,
      marketplaceFilters: {
        likesDirection: '',
        cheapest: '',
        mostExpensive: '',
        search: '',
        priceRange: {
          from: '',
          to: '',
        },
        page: 1,
        limit: 15,
      } as FilterType,
      itemPagination: { items: [], totalCount: 0 },
      selectedItem: {} as Item,
      history: [],
      isModalOpen: false,
      isCompleted: false,
      isOpenPreviewProductModal: false,
    };
  });

  describe('When newestItems function is called', () => {
    it('if the number is between 1 and 15, should retrieve items', () => {
      const item1 = { itemId: '123' } as Item;
      const item2 = { itemId: '456' } as Item;
      const item3 = { itemId: '456' } as Item;
      const expectedItems = [item1, item2, item3];

      const actual = marketplaceReducer(
        undefined,
        getNewest.fulfilled(expectedItems, '', expectedItems.length)
      );
      expect(actual.newestItems.length).toEqual(expectedItems.length);
    });
    it('if the number provided is 0', () => {
      const expectedItems = [] as Item[];

      const actual = marketplaceReducer(
        undefined,
        getNewest.fulfilled(expectedItems, '', expectedItems.length)
      );
      expect(actual.newestItems.length).toEqual(expectedItems.length);
    });
    it('if the number provided is higher to 15 (16 or more)', () => {
      const expectedItems = [] as Item[];

      const actual = marketplaceReducer(
        undefined,
        getNewest.fulfilled(expectedItems, '', expectedItems.length)
      );
      expect(actual.newestItems.length).toEqual(expectedItems.length);
    });
    it('the loadingNewest should retrieve false if it is fulfilled', () => {
      const expected = false;
      const actual = marketplaceReducer(undefined, getNewest.fulfilled);
      expect(actual.loadingNewest).toEqual(expected);
    });
    it('the loadingNewest should retrieve true if it is pending', () => {
      const expected = true;
      const actual = marketplaceReducer(undefined, getNewest.pending);
      expect(actual.loadingNewest).toEqual(expected);
    });
    it('the loadingNewest should retrieve false if it is rejected', () => {
      const expected = false;
      const actual = marketplaceReducer(undefined, getNewest.rejected);
      expect(actual.loadingNewest).toEqual(expected);
    });
  });

  describe('When loading slice', () => {
    it('should return initial state', () => {
      const expected = initialState;

      const actual = marketplaceReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When setMarketplaceFilters reducer is called', () => {
    it('should assign the filters correctly', () => {
      const expected = {
        likesDirection: 'desc',
        cheapest: '0.001',
        mostExpensive: '1',
        search: 'some value',
        priceRange: {
          from: '0.001',
          to: '0.5',
        },
      };

      const actual = marketplaceReducer(undefined, setMarketplaceFilters(expected));

      expect(actual.marketplaceFilters).toEqual(expected);
    });
  });

  describe('When resetMarketplaceFilters reducer is called', () => {
    it('should assign the marketplace filters initial state correctly', () => {
      const expected = {
        likesDirection: '',
        cheapest: '',
        mostExpensive: '',
        search: '',
        priceRange: {
          from: '',
          to: '',
        },
        limit: 15,
        page: 1,
      } as FilterType;

      const actual = marketplaceReducer(undefined, resetMarketplaceFilters());

      expect(actual.marketplaceFilters).toEqual(expected);
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

  describe('When isListed is called', () => {
    it('should return true when isListed is succesfull', () => {
      const expected = true;
      const actual = marketplaceReducer(undefined, listItem.fulfilled);

      expect(actual.isCompleted).toEqual(expected);
    });

    it('should return false when isListed is rejected', () => {
      const expected = false;
      const actual = marketplaceReducer(undefined, listItem.rejected);

      expect(actual.isCompleted).toEqual(expected);
    });
  });

  describe('When findFilteredItems extra reducer is called', () => {
    describe('and the execution is pending', () => {
      it('should clear the item pagination object and assign the is loading value to true', () => {
        const actual = marketplaceReducer(
          undefined,
          findFilteredItems.pending('', {} as FilterType)
        );

        expect(actual.itemPagination.items.length).toEqual(0);
        expect(actual.itemPagination.totalCount).toEqual(0);
        expect(actual.isLoading).toEqual(true);
      });
    });

    describe('and the execution is fulfilled', () => {
      it('should assign the item pagination object and set the is loading value to false', () => {
        const item1 = { itemId: '123' } as Item;
        const item2 = { itemId: '456' } as Item;
        const expectedItems = [item1, item2];

        const actual = marketplaceReducer(
          undefined,
          findFilteredItems.fulfilled({ items: expectedItems, totalCount: 2 }, '', {} as FilterType)
        );

        expect(actual.itemPagination.items).toEqual(expectedItems);
        expect(actual.itemPagination.totalCount).toEqual(expectedItems.length);
        expect(actual.isLoading).toEqual(false);
      });
    });

    describe('and the execution is rejected', () => {
      it('should set the is loading value to false', () => {
        const actual = marketplaceReducer(
          undefined,
          findFilteredItems.rejected(null, '', {} as FilterType)
        );

        expect(actual.isLoading).toEqual(false);
      });
    });
  });

  describe('When findPagedItems extra reducer is called', () => {
    describe('and the execution is pending', () => {
      it('should clear set the isPagingLoading value to true', () => {
        const actual = marketplaceReducer(undefined, findPagedItems.pending('', {} as FilterType));

        expect(actual.isPagingLoading).toEqual(true);
      });
    });

    describe('and the execution is fulfilled', () => {
      it('should assign append the items to the item pagination object and set the is isPagingLoading value to false', () => {
        const existingItem = { itemId: '123' } as Item;
        const newItem = { itemId: '456' } as Item;
        const expectedItems = [existingItem, newItem];

        const actual = marketplaceReducer(
          undefined,
          findPagedItems.fulfilled({ items: expectedItems, totalCount: 2 }, '', {} as FilterType)
        );

        expect(actual.itemPagination.items).toEqual(expectedItems);
        expect(actual.itemPagination.totalCount).toEqual(expectedItems.length);
        expect(actual.isPagingLoading).toEqual(false);
      });
    });

    describe('and the execution is rejected', () => {
      it('should set the is loading value to false', () => {
        const actual = marketplaceReducer(
          undefined,
          findPagedItems.rejected(null, '', {} as FilterType)
        );

        expect(actual.isPagingLoading).toEqual(false);
      });
    });
  });
});
