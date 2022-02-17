import { FC } from 'react';

import { Box, List, ListItem, ListItemButton } from '@mui/material';

import { useDeleteInitTodoList, useTodoList } from '../../hooks/todo';

export const TodoList: FC = () => {
	const { todoList, deleteTodo } = useTodoListMethods();

	return (
		<Box>
			<List>
				{todoList.map(todo => (
					<ListItem key={todo.id}>
						<ListItemButton onClick={() => deleteTodo(todo.id)}>{todo.work}</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

const useTodoListMethods = () => {
	const todoList = useTodoList();
	const deleteTodo = useDeleteInitTodoList();

	return { todoList, deleteTodo };
};
