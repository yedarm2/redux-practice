import { FC } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer, rootSaga } from './module';
import { middlewareEnhancer, sagaMiddleware } from './middleware';

const store = createStore(rootReducer, middlewareEnhancer);

sagaMiddleware.run(rootSaga);

export const StoreProvider: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

export type { RootState } from './module';
