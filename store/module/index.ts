import { combineReducers } from 'redux';

import todoReducer, { TodoActions } from './todo';

export const rootReducer = combineReducers({
	todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type StoreActions = TodoActions;
