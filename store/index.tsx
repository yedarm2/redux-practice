import { FC } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from './module';
import { middlewareEnhancer } from './middleware';

const store = createStore(rootReducer, middlewareEnhancer);

export const StoreProvider: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

export type { RootState } from './module';
