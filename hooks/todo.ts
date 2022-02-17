import { useAppSelector } from './redux';

export const useTodoList = () => {
	return useAppSelector(rootState => rootState.todo.todoList);
};
