import { AnyAction } from '@reduxjs/toolkit';
import ItemImage from '../../../common/types/item-image';
import { Account } from '../../../types/account';
import { History } from '../../../types/history';
import { Item } from '../../../types/item';
import { authenticate, signIn } from './auth.actions';
import { authReducer, AuthState, setAccount, setIsConnected } from './auth.slice';

describe('Auth slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      account: {
        address: '',
        history: [] as History[],
        background: {} as ItemImage,
        picture: {} as ItemImage,
        accountId: '',
        items: [] as Item[],
        createdAt: new Date(),
        updatedAt: new Date(),
        username: '',
      } as Account,
      isAuthenticated: false,
      isAuthCompleted: false,
      isConnected: false,
      isMainnet: false,
      isLoading: false,
    };
  });

  describe('When loading slice', () => {
    it('should return initial state', () => {
      const expected = initialState;

      const actual = authReducer(initialState, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When setEthAddress reducer is called', () => {
    it('should assign the address correctly', () => {
      const expected = '0x01123';

      const actual = authReducer(initialState, setAccount({ ...initialState, address: expected }));

      expect(actual.account.address).toEqual(expected);
    });
  });

  describe('When setIsConnected reducer is called', () => {
    it('should assign the isConnected flag correctly', () => {
      const expected = true;

      const actual = authReducer(initialState, setIsConnected(true));

      expect(actual.isConnected).toEqual(expected);
    });
  });

  describe('When authenticate function is called and it is in pending state', () => {
    it('should assign the isAuthCompleted flags to false.', () => {
      const expected = false;

      const actual = authReducer(initialState, authenticate.pending('', '', ''));

      expect(actual.isAuthCompleted).toEqual(expected);
    });
  });

  describe('When authenticate function is called and it is fulfilled', () => {
    it('should assign the isAuthenticated and isAuthCompleted flags correctly.', () => {
      const expectedIsAuthCompleted = true;

      const actual = authReducer(
        initialState,
        authenticate.fulfilled({} as { token: string; account: Account }, '', '')
      );

      expect(actual.isAuthCompleted).toEqual(expectedIsAuthCompleted);
    });
  });

  describe('When signIn function is called', () => {
    it('should assign the isAuthenticated flag to true.', () => {
      const expected = true;

      const actual = authReducer(initialState, signIn.fulfilled('', '', ''));

      expect(actual.isAuthenticated).toEqual(expected);
    });
  });

  describe('When signIn function is called and it is rejected', () => {
    it('should assign the isAuthenticated flag to false.', () => {
      const expected = false;

      const actual = authReducer(initialState, signIn.rejected(null, '', ''));

      expect(actual.isAuthenticated).toEqual(expected);
    });
  });
});
