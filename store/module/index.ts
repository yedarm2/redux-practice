import { combineReducers, Dispatch } from 'redux';
import { all } from 'redux-saga/effects';

import todoReducer, { todoSaga, TodoActions } from './todo';

export const rootReducer = combineReducers({
	todo: todoReducer,
});

export const rootSaga = function* () {
	yield all([todoSaga()]);
};

export type RootState = ReturnType<typeof rootReducer>;
export type StoreActions = TodoActions | ((dispatch: Dispatch) => Promise<any | void>);
