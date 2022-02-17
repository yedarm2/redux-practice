import { combineReducers } from 'redux';

import { reducer as todoReducer } from './todo';

export const reducer = combineReducers({
	todo: todoReducer,
});
