import { ITodo } from '../types';

import { createTodo, deleteTodo, initTodoList } from '../store/module/todo';
import { useAppSelector, useAppDispatch } from './redux';

export const useTodoList = () => {
	return useAppSelector(rootState => rootState.todo.todoList);
};

export const useInitTodoList = () => {
	const dispatch = useAppDispatch();

	return (todoList: ITodo[]) => {
		dispatch(initTodoList(todoList));
	};
};

export const useCreateTodo = () => {
	const dispatch = useAppDispatch();

	return (work: string) => {
		dispatch(createTodo(work));
	};
};

export const useDeleteInitTodoList = () => {
	const dispatch = useAppDispatch();

	return (id: number) => {
		dispatch(deleteTodo(id));
	};
};
