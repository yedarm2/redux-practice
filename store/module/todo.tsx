import { ITodo } from '../../types';

import { PayloadAction } from '@reduxjs/toolkit';
import { getNewId } from '../../utils';

const MODULE_NAME = 'todo';

const INIT_TODO_LIST = `${MODULE_NAME}/INIT_TODO_LIST` as const;
const CREATE_TODO = `${MODULE_NAME}/CREATE_TODO` as const;
const DELETE_TODO = `${MODULE_NAME}/DELETE_TODO` as const;

type TodoState = {
	todoList: ITodo[];
};

const initialState: TodoState = {
	todoList: [],
};

const reducer = (state = initialState, action: TodoActions) => {
	switch (action.type) {
		case INIT_TODO_LIST:
			return {
				todoList: action.payload,
			};

		case CREATE_TODO:
			const todoList = state.todoList;
			const idToCreate = getNewId(todoList);

			return {
				todoList: [
					...state.todoList,
					{
						id: idToCreate,
						work: action.payload,
					},
				],
			};

		case DELETE_TODO:
			return {
				todoList: state.todoList.filter(todo => todo.id !== action.payload),
			};

		default:
			return state;
	}
};

export default reducer;

export type TodoActions =
	| ReturnType<typeof initTodoList>
	| ReturnType<typeof createTodo>
	| ReturnType<typeof deleteTodo>;

export const initTodoList = (list: ITodo[]) => ({
	type: INIT_TODO_LIST,
	payload: list,
});

export const createTodo = (work: string) => ({
	type: CREATE_TODO,
	payload: work,
});

export const deleteTodo = (id: number) => ({
	type: DELETE_TODO,
	payload: id,
});
