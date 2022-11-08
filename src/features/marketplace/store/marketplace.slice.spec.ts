import { AnyAction } from '@reduxjs/toolkit';
import store from '../../../store';
import { Item } from '../../../types/item';
import { getOwner, listItem } from './marketplace.actions';
import { marketplaceReducer, MarketplaceState, selectOwner } from './marketplace.slice';

describe('Marketplace slice', () => {
  let initialState: MarketplaceState;

  beforeEach(() => {
    initialState = {
      owner: '',
      isLoading: false,
      selectedItem: {} as Item,
      history: [],
      isListed: false,
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

  describe('When isListed is called', () => {
    it('should return false from the state', () => {
      const expected = false;
      const actual = initialState.isListed;

      expect(actual).toEqual(expected);
    });

    it('should return true when isListed is succesfull', () => {
      const expected = true;
      const actual = marketplaceReducer(undefined, listItem.fulfilled);

      expect(actual.isListed).toEqual(expected);
    });

    it('should return false when isListed is rejected', () => {
      const expected = false;
      const actual = marketplaceReducer(undefined, listItem.rejected);

      expect(actual.isListed).toEqual(expected);
    });
  });
});
