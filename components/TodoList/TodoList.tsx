import { FC } from 'react';

import { Box, List } from '@mui/material';

import { useTodoState } from '../../hooks/todo';
import { TodoItem } from '../TodoListItem/TodoItem';
import { TodoItemSkeleton } from './TodoList.style';

export const TodoList: FC = () => {
	const { todoList, isLoading } = useTodoList();

	return (
		<Box>
			<List>
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => <TodoItemSkeleton key={index} />)
					: todoList.map(todo => <TodoItem key={todo.id} todo={todo} />)}
			</List>
		</Box>
	);
};

const useTodoList = () => {
	const { todoList, isLoading } = useTodoState();

	return { todoList, isLoading };
};
