import { ITodo } from '../../types';

import { Dispatch } from 'redux';

import { api } from '../../utils';
import { getNewId } from '../../utils';

const MODULE_NAME = 'todo';

const START_FETCH = `${MODULE_NAME}/START_FETCH` as const;
const SUCCESS_FETCH = `${MODULE_NAME}/SUCCESS_FETCH` as const;
const FAIL_FETCH = `${MODULE_NAME}/FAIL_FETCH` as const;
const INIT_TODO_LIST = `${MODULE_NAME}/INIT_TODO_LIST` as const;
const ADD_TODO = `${MODULE_NAME}/ADD_TODO` as const;
const REMOVE_TODO = `${MODULE_NAME}/REMOVE_TODO` as const;
const CHANGE_TODO = `${MODULE_NAME}/CHANGE_TODO` as const;

type TodoState = {
	isLoading: boolean;
	todoList: ITodo[];
	error: any;
};

const initialState: TodoState = {
	isLoading: false,
	todoList: [],
	error: null,
};

const reducer = (state = initialState, action: TodoActions) => {
	switch (action.type) {
		case START_FETCH:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case SUCCESS_FETCH:
			return {
				...state,
				isLoading: false,
			};
		case FAIL_FETCH:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		case SET_TODO_LIST:
			return {
				...state,
				todoList: action.payload,
			};

		case ADD_TODO:
			return {
				...state,
				todoList: [...state.todoList, action.payload],
			};

		case REMOVE_TODO:
			return {
				...state,
				todoList: state.todoList.filter(todo => todo.id !== action.payload),
			};

		case CHANGE_TODO:
			return {
				...state,
				todoList: state.todoList.map(todo => {
					if (todo.id !== action.payload.id) return todo;

					return {
						id: todo.id,
						work: action.payload.work,
					};
				}),
			};

		default:
			return state;
	}
};

export default reducer;

export type TodoActions =
	| ReturnType<typeof startFetch>
	| ReturnType<typeof successFetch>
	| ReturnType<typeof failFetch>
	| ReturnType<typeof setTodoList>
	| ReturnType<typeof addTodo>
	| ReturnType<typeof removeTodo>
	| ReturnType<typeof changeTodo>;

const startFetch = () => ({
	type: START_FETCH,
});

const successFetch = () => ({
	type: SUCCESS_FETCH,
});

const failFetch = (error: any) => ({
	type: FAIL_FETCH,
	error,
});

const setTodoList = (list: ITodo[]) => ({
	type: SET_TODO_LIST,
	payload: list,
});

export const addTodo = (todo: ITodo) => ({
	type: ADD_TODO,
	payload: todo,
});

export const removeTodo = (id: number) => ({
	type: REMOVE_TODO,
	payload: id,
});

export const changeTodo = (id: number, work: string) => ({
	type: CHANGE_TODO,
	payload: { id, work },
});

const todoThunkGenerator = (thunkFunction: (dispatch: Dispatch<TodoActions>) => any) => {
	return async (dispatch: Dispatch<TodoActions>) => {
		dispatch(startFetch());

		try {
			await thunkFunction(dispatch);
			dispatch(successFetch());
		} catch (error) {
			dispatch(failFetch(error));
		}
	};
};

export const loadTodoList = () =>
	todoThunkGenerator(async (dispatch: Dispatch<TodoActions>) => {
		const todoList = await api.getTodoList();
		dispatch(initTodoList(todoList));
	});

export const createTodo = (work: string) =>
	todoThunkGenerator(async (dispatch: Dispatch<TodoActions>) => {
		const createdTodo = await api.createTodo(work);
		dispatch(addTodo(createdTodo));
	});

export const deleteTodo = (id: number) =>
	todoThunkGenerator(async (dispatch: Dispatch<TodoActions>) => {
		await api.deleteTodo(id);
		dispatch(removeTodo(id));
	});

export const updateTodo = (id: number, work: string) =>
	todoThunkGenerator(async (dispatch: Dispatch<TodoActions>) => {
		await api.updateTodo(id, work);
		dispatch(changeTodo(id, work));
	});
