import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import logger from 'redux-logger';

const isProduct = process.env.NODE_ENV === 'production';
const middlewareList = isProduct ? [Thunk] : [Thunk, logger];
export const middlewareEnhancer = isProduct
	? composeWithDevTools(applyMiddleware(...middlewareList))
	: applyMiddleware(...middlewareList);
