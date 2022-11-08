import { AnyAction } from '@reduxjs/toolkit';
import store from '../../../store';
import { Item } from '../../../types/item';
import { getOwner } from './marketplace.actions';
import { marketplaceReducer, MarketplaceState, selectOwner } from './marketplace.slice';

describe('Marketplace slice', () => {
  let initialState: MarketplaceState;

  beforeEach(() => {
    initialState = {
      owner: '',
      isLoading: false,
      selectedItem: {} as Item,
      history: [],
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
