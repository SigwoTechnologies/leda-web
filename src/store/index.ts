/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { accountReducer } from '../features/account/store/account.slice';
import { authReducer } from '../features/auth/store/auth.slice';
import { ledaNftReducer } from '../features/leda-nft/store/leda-nft.slice';
import { marketplaceReducer } from '../features/marketplace/store/marketplace.slice';
import { uiReducer } from './ui/ui.slice';

const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'dev';

const combinedReducer = combineReducers({
  marketplace: marketplaceReducer,
  account: accountReducer,
  auth: authReducer,
  uiReducer,
  ledaNft: ledaNftReducer,
});

const rootReducer = (state: CombinedState<any>, action: AnyAction) =>
  combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  devTools: environment !== 'prod', // IMPORTANT: turn dev tools off on prod!
});

export default store;
