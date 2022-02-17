import { combineReducers } from 'redux';

import { reducer as todoReducer } from './todo';

export const rootReducer = combineReducers({
	todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
