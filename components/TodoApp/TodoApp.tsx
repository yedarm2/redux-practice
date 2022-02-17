import type { FC } from 'react';

import { TodoContent, TodoWrapper } from './TodoApp.styles';

import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp: FC = () => {
	return (
		<TodoWrapper className="layout">
			<TodoContent elevation={2}>
				<TodoForm />
				<TodoList />
			</TodoContent>
		</TodoWrapper>
	);
};
