import { AnyAction } from '@reduxjs/toolkit';
import { authenticate, signin } from './auth.actions';
import { authReducer, AuthState, setEthAddress, setIsConnected } from './auth.slice';

describe('Auth slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      address: '',
      isAuthenticated: false,
      isAuthCompleted: false,
      isConnected: false,
      isMainnet: false,
    };
  });

  describe('When loading slice', () => {
    it('should return initial state', () => {
      const expected = initialState;

      const actual = authReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When setEthAddress reducer is called', () => {
    it('should assign the address correctly', () => {
      const expected = '0x01123';

      const actual = authReducer(undefined, setEthAddress(expected));

      expect(actual.address).toEqual(expected);
    });
  });

  describe('When setIsConnected reducer is called', () => {
    it('should assign the isConnected flag correctly', () => {
      const expected = true;

      const actual = authReducer(undefined, setIsConnected(true));

      expect(actual.isConnected).toEqual(expected);
    });
  });

  describe('When authenticate function is called and it is in pending state', () => {
    it('should assign the isAuthCompleted flags to false.', () => {
      const expected = false;

      const actual = authReducer(undefined, authenticate.pending('', ''));

      expect(actual.isAuthCompleted).toEqual(expected);
    });
  });

  describe('When authenticate function is called and it is fulfilled', () => {
    it('should assign the isAuthenticated and isAuthCompleted flags correctly.', () => {
      const expectedIsAuthenticated = true;
      const expectedIsAuthCompleted = true;

      const actual = authReducer(undefined, authenticate.fulfilled(true, '', ''));

      expect(actual.isAuthenticated).toEqual(expectedIsAuthenticated);
      expect(actual.isAuthCompleted).toEqual(expectedIsAuthCompleted);
    });
  });

  describe('When signin function is called', () => {
    it('should assign the isAuthenticated flag to true.', () => {
      const expected = true;

      const actual = authReducer(undefined, signin.fulfilled('', '', ''));

      expect(actual.isAuthenticated).toEqual(expected);
    });
  });

  describe('When signin function is called and it is rejected', () => {
    it('should assign the isAuthenticated flag to false.', () => {
      const expected = false;

      const actual = authReducer(undefined, signin.rejected(null, '', ''));

      expect(actual.isAuthenticated).toEqual(expected);
    });
  });
});
