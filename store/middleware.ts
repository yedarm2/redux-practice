import { Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Thunk from 'redux-thunk';
import logger from 'redux-logger';

export const sagaMiddleware = createSagaMiddleware();

export const middlewareList: Middleware[] = [Thunk, sagaMiddleware];
if (process.env.NODE_ENV !== 'production') middlewareList.push(logger);
