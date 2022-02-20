import { ITodo } from '../../types';

import { call, put, takeEvery } from 'redux-saga/effects';

import { api } from '../../utils';

const MODULE_NAME = 'todo';

const START_FETCH = `${MODULE_NAME}/START_FETCH` as const;
const SUCCESS_FETCH = `${MODULE_NAME}/SUCCESS_FETCH` as const;
const FAIL_FETCH = `${MODULE_NAME}/FAIL_FETCH` as const;

// * reducer용 action
const SET_TODO_LIST = `${MODULE_NAME}/SET_TODO_LIST` as const;
const ADD_TODO = `${MODULE_NAME}/ADD_TODO` as const;
const REMOVE_TODO = `${MODULE_NAME}/REMOVE_TODO` as const;
const CHANGE_TODO = `${MODULE_NAME}/CHANGE_TODO` as const;

// * saga용 action
const LOAD_TODO_LIST = `${MODULE_NAME}/LOAD_TODO_LIST` as const;
const CREATE_TODO = `${MODULE_NAME}/CREATE_TODO` as const;
const DELETE_TODO = `${MODULE_NAME}/DELETE_TODO` as const;
const UPDATE_TODO = `${MODULE_NAME}/UPDATE_TODO` as const;

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
	| ReturnType<typeof changeTodo>
	| ReturnType<typeof loadTodoList>
	| ReturnType<typeof createTodo>
	| ReturnType<typeof deleteTodo>
	| ReturnType<typeof updateTodo>;

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

const createTodoSagaFunction = (sagaFunction: (action: any) => Generator<any, any, any>) => {
	return function* (action: TodoActions) {
		yield put(startFetch());

		try {
			yield call(sagaFunction, action);
			yield put(successFetch());
		} catch (error) {
			yield put(failFetch(error));
		}
	};
};

export const loadTodoList = () => ({
	type: LOAD_TODO_LIST,
});
export const loadTodoListSaga = createTodoSagaFunction(function* () {
	const todoList: ITodo[] = yield call(api.getTodoList);
	yield put(setTodoList(todoList));
});

export const createTodo = (work: string) => ({
	type: CREATE_TODO,
	payload: work,
});
export const createTodoSaga = createTodoSagaFunction(function* (
	action: ReturnType<typeof createTodo>,
) {
	const createdTodo = yield call(api.createTodo, action.payload);
	yield put(addTodo(createdTodo));
});

export const deleteTodo = (id: number) => ({
	type: DELETE_TODO,
	payload: id,
});
export const deleteTodoSaga = createTodoSagaFunction(function* (
	action: ReturnType<typeof deleteTodo>,
) {
	yield call(api.deleteTodo, action.payload);
	yield put(removeTodo(action.payload));
});

export const updateTodo = (id: number, work: string) => ({
	type: UPDATE_TODO,
	payload: { id, work },
});
export const updateTodoSaga = createTodoSagaFunction(function* (
	action: ReturnType<typeof updateTodo>,
) {
	const { id, work } = action.payload;
	yield call(api.updateTodo, id, work);
	yield put(changeTodo(id, work));
});

export const todoSaga = function* () {
	yield takeEvery(LOAD_TODO_LIST, loadTodoListSaga);
	yield takeEvery(CREATE_TODO, createTodoSaga);
	yield takeEvery(DELETE_TODO, deleteTodoSaga);
	yield takeEvery(UPDATE_TODO, updateTodoSaga);
};
