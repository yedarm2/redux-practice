import { FC } from 'react';

import { Box, List, ListItem, ListItemButton } from '@mui/material';

import { useTodoList } from '../../hooks/todo';

export const TodoList: FC = () => {
	const todoList = useTodoList();

	return (
		<Box>
			<List>
				{todoList.map(todo => (
					<ListItem key={todo.id}>
						<ListItemButton>{todo.work}</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
