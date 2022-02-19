import { FC, useEffect } from 'react';

import { TodoContent, TodoWrapper } from './TodoApp.styles';

import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';

import { useLoadTodoList } from '../../hooks/todo';

export const TodoApp: FC = () => {
	useLoadTodoList();

	return (
		<TodoWrapper className="layout">
			<TodoContent elevation={2}>
				<TodoForm />
				<TodoList />
			</TodoContent>
		</TodoWrapper>
	);
};
