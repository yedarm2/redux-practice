import { ITodo } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';

import { call, put, takeEvery } from 'redux-saga/effects';

import { api } from '../../utils';
import { createSlice } from '@reduxjs/toolkit';

const MODULE_NAME = 'todo';

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

const todoSlice = createSlice({
	name: MODULE_NAME,
	initialState,
	reducers: {
		startFetch(state) {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		},
		successFetch(state) {
			return {
				...state,
				isLoading: false,
			};
		},
		failFetch: {
			reducer(state, action: PayloadAction<any>) {
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			},
			prepare(error: any) {
				return { payload: error };
			},
		},
		setTodoList(state, action: PayloadAction<ITodo[]>) {
			state.todoList = action.payload;
		},
		addTodo(state, action: PayloadAction<ITodo>) {
			state.todoList.push(action.payload);
		},
		removeTodo(state, action: PayloadAction<number>) {
			state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
		},
		changeTodo: {
			reducer(state, action: PayloadAction<{ id: number; work: string }>) {
				const { payload } = action;
				const indexToChange = state.todoList.findIndex(todo => todo.id === payload.id);
				if (indexToChange === -1) return;

				state.todoList[indexToChange].work = payload.work;
			},
			prepare: (id: number, work: string) => ({ payload: { id, work } }),
		},
		loadTodoList() {},
		createTodo: {
			reducer() {},
			prepare: (work: string) => ({ payload: work }),
		},
		deleteTodo: {
			reducer() {},
			prepare: (id: number) => ({ payload: id }),
		},
		updateTodo: {
			reducer() {},
			prepare: (id: number, work: string) => ({ payload: { id, work } }),
		},
	},
});

export default todoSlice.reducer;

export const {
	startFetch,
	successFetch,
	failFetch,
	setTodoList,
	addTodo,
	removeTodo,
	changeTodo,
	loadTodoList,
	createTodo,
	deleteTodo,
	updateTodo,
} = todoSlice.actions;

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

const createTodoSagaFunction = (sagaFunction: (action: any) => Generator<any, any, any>) => {
	return function* (action: any) {
		yield put(startFetch());

		try {
			yield call(sagaFunction, action);
			yield put(successFetch());
		} catch (error) {
			yield put(failFetch(error));
		}
	};
};

const loadTodoListSaga = createTodoSagaFunction(function* () {
	const todoList: ITodo[] = yield call(api.getTodoList);
	yield put(setTodoList(todoList));
});

const createTodoSaga = createTodoSagaFunction(function* (action: ReturnType<typeof createTodo>) {
	const createdTodo = yield call(api.createTodo, action.payload);
	yield put(addTodo(createdTodo));
});

const deleteTodoSaga = createTodoSagaFunction(function* (action: ReturnType<typeof deleteTodo>) {
	yield call(api.deleteTodo, action.payload);
	yield put(removeTodo(action.payload));
});

const updateTodoSaga = createTodoSagaFunction(function* (action: ReturnType<typeof updateTodo>) {
	const { id, work } = action.payload;
	yield call(api.updateTodo, id, work);
	yield put(changeTodo(id, work));
});

export const todoSaga = function* () {
	yield takeEvery(loadTodoList.type, loadTodoListSaga);
	yield takeEvery(createTodo.type, createTodoSaga);
	yield takeEvery(deleteTodo.type, deleteTodoSaga);
	yield takeEvery(updateTodo.type, updateTodoSaga);
};
