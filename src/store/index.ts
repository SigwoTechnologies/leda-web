import { AnyAction, CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/auth.slice';

const combinedReducer = combineReducers({
  auth: authReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: CombinedState<any>, action: AnyAction) =>
  combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // IMPORTANT: turn dev tools off on prod!
});

export default store;
