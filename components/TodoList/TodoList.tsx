import { FC } from 'react';

import { Box, List, ListItem, ListItemButton } from '@mui/material';

import { ITodo } from '../../types';

export const TodoList: FC = () => {
	const { todoList } = useTodoList();

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

const useTodoList = () => {
	const todoList: ITodo[] = [
		{
			id: 1,
			work: '할 일 1',
		},
		{
			id: 2,
			work: '할 일 2',
		},
		{
			id: 3,
			work: '할 일 3',
		},
		{
			id: 4,
			work: '할 일 4',
		},
		{
			id: 5,
			work: '할 일 5',
		},
	];

	return {
		todoList,
	};
};
