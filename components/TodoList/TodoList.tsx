import { FC } from 'react';

import { Box, List, ListItem, ListItemButton } from '@mui/material';

import { IRawTodo } from '../../types';

const todoList: IRawTodo[] = [
	{
		work: '할 일 1',
	},
	{
		work: '할 일 2',
	},
	{
		work: '할 일 3',
	},
	{
		work: '할 일 4',
	},
	{
		work: '할 일 5',
	},
];

export const TodoList: FC = () => {
	return (
		<Box>
			<List>
				{todoList.map((todo, index) => (
					<ListItem key={index}>
						<ListItemButton>{todo.work}</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
