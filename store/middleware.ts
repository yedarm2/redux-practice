import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import logger from 'redux-logger';

export const sagaMiddleware = createSagaMiddleware();

const isProduct = process.env.NODE_ENV === 'production';
const middlewareList = isProduct ? [Thunk, sagaMiddleware] : [Thunk, sagaMiddleware, logger];
export const middlewareEnhancer = isProduct
	? composeWithDevTools(applyMiddleware(...middlewareList))
	: applyMiddleware(...middlewareList);
