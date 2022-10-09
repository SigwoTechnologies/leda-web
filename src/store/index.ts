import { AnyAction, CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/auth.slice';
import { marketplaceReducer } from '../features/marketplace/store/marketplace.slice';
import { ledaNftReducer } from '../features/leda-nft/store/leda-nft.slice';
import { uiReducer } from './ui/ui.slice';

const combinedReducer = combineReducers({
  auth: authReducer,
  ledaNft: ledaNftReducer,
  marketplace: marketplaceReducer,
  uiReducer,
});

const rootReducer = (state: CombinedState<any>, action: AnyAction) =>
  combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // IMPORTANT: turn dev tools off on prod!
});

export default store;
