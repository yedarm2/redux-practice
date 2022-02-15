import type { FC } from 'react';

import { TodoContent, TodoWrapper } from './TodoApp.styles';

import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp: FC = () => {
	return (
		<TodoWrapper className="layout">
			<TodoContent elevation={2}>
				<TodoInput />
				<TodoList />
			</TodoContent>
		</TodoWrapper>
	);
};
