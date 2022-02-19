import { combineReducers, Dispatch } from 'redux';

import todoReducer, { TodoActions } from './todo';

export const rootReducer = combineReducers({
	todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type StoreActions = TodoActions | ((dispatch: Dispatch) => Promise<any | void>);
