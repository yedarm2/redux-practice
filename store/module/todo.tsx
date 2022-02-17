import { ITodo } from '../../types';

import { Action } from '@reduxjs/toolkit';

const initialState: {
	todoList: ITodo[];
} = {
	todoList: [],
};

initialState.todoList = [
	{
		id: 1,
		work: '할 일 제 1',
	},
	{
		id: 2,
		work: '할 일 제 2',
	},
	{
		id: 3,
		work: '할 일 제 3',
	},
	{
		id: 4,
		work: '할 일 제 4',
	},
	{
		id: 5,
		work: '할 일 제 5',
	},
];

export const reducer = (state = initialState, action: Action) => {
	switch (action.type) {
		default:
			return state;
	}
};
