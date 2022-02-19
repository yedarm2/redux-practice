import { FC } from 'react';

import { Box, List, ListItem, ListItemButton } from '@mui/material';

import { useTodoList } from '../../hooks/todo';
import { TodoItem } from '../TodoListItem/TodoItem';

export const TodoList: FC = () => {
	const { todoList } = useTodoListMethods();

	return (
		<Box>
			<List>
				{todoList.map(todo => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</List>
		</Box>
	);
};

const useTodoListMethods = () => {
	const todoList = useTodoList();

	return { todoList };
};
