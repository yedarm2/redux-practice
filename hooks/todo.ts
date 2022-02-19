import { ITodo } from '../types';

import { createTodo, deleteTodo, loadTodoList, updateTodo } from '../store/module/todo';
import { useAppSelector, useAppDispatch } from './redux';
import { useEffect } from 'react';

export const useTodoState = () => {
	const { isLoading, todoList } = useAppSelector(rootState => rootState.todo);

	return { isLoading, todoList };
};

export const useLoadTodoList = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadTodoList());
	}, []);
};

export const useCreateTodo = () => {
	const dispatch = useAppDispatch();

	return (work: string) => {
		dispatch(createTodo(work));
	};
};

export const useDeleteTodo = () => {
	const dispatch = useAppDispatch();

	return (id: number) => {
		dispatch(deleteTodo(id));
	};
};

export const useUpdateTodo = () => {
	const dispatch = useAppDispatch();

	return (id: number, work: string) => {
		dispatch(updateTodo(id, work));
	};
};
