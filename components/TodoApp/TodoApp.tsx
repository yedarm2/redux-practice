import { FC, useEffect } from 'react';

import { TodoContent, TodoWrapper } from './TodoApp.styles';

import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';

import { useInitTodoList } from '../../hooks/todo';

export const TodoApp: FC = () => {
	useTodoApp();

	return (
		<TodoWrapper className="layout">
			<TodoContent elevation={2}>
				<TodoForm />
				<TodoList />
			</TodoContent>
		</TodoWrapper>
	);
};

export const useTodoApp = () => {
	const initTodoList = useInitTodoList();

	useEffect(() => {
		initTodoList([
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
		]);
	}, []);
};
