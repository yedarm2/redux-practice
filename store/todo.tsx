import { ITodo } from '../types';

import { Action } from '@reduxjs/toolkit';

const initialState: {
	todoList: ITodo[];
} = {
	todoList: [],
};

export const reducer = (state = initialState, action: Action) => {
	switch (action.type) {
		default:
			return state;
	}
};
