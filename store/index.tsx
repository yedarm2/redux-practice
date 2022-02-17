import { FC } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './module';
import { middlewareEnhancer } from './middleware';

const store = createStore(reducer, middlewareEnhancer);

export const StoreProvider: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
