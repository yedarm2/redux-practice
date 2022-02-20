import { FC } from 'react';
import { Provider } from 'react-redux';

import { rootReducer, rootSaga } from './module';
import { middlewareList, sagaMiddleware } from './middleware';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewareList),
});

sagaMiddleware.run(rootSaga);

export const StoreProvider: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
export type RootState = ReturnType<typeof store.getState>;
