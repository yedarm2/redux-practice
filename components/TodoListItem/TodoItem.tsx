import {
	FC,
	MouseEventHandler,
	ChangeEventHandler,
	useState,
	FormEventHandler,
	useRef,
	MutableRefObject,
	useEffect,
} from 'react';
import { ITodo } from '../../types';

import { ListItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoItemContent } from './TodoItem.style';

import { useDeleteTodo, useUpdateTodo } from '../../hooks/todo';

interface ITodoItemProps {
	todo: ITodo;
}

export const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
	const {
		newTodoWork,
		showTodoEditor,
		openTodoEditor,
		closeTodoEditor,
		changeNewTodoWork,
		onSubmitTodoForm,
	} = useTodoEditor(todo);

	const { onClickDeleteIcon } = useDeleteTodoIcon(todo);

	return (
		<ListItem>
			<TodoItemContent onClick={openTodoEditor}>
				{showTodoEditor ? (
					<form onSubmit={onSubmitTodoForm} className="left">
						<TextField
							label={`${todo.work} ->`}
							value={newTodoWork}
							onChange={changeNewTodoWork}
							onBlur={closeTodoEditor}
							variant="standard"
							className="input"
							autoFocus
						/>
					</form>
				) : (
					<span className="text left">{todo.work}</span>
				)}
				<span className="icon-wrapper" onClick={onClickDeleteIcon}>
					<DeleteIcon />
				</span>
			</TodoItemContent>
		</ListItem>
	);
};

const useTodoEditor = (todo: ITodo) => {
	const [newTodoWork, setNewTodoWork] = useState(todo.work);
	const [showTodoEditor, setShowTodoEditor] = useState(false);

	const openTodoEditor = () => {
		setNewTodoWork(todo.work);
		setShowTodoEditor(true);
	};

	const closeTodoEditor = () => {
		setShowTodoEditor(false);
	};

	const changeNewTodoWork: ChangeEventHandler<HTMLInputElement> = event => {
		setNewTodoWork(event.target.value);
	};

	const updateTodo = useUpdateTodo();
	const onSubmitTodoForm: FormEventHandler = event => {
		event.preventDefault();
		updateTodo(todo.id, newTodoWork);
		closeTodoEditor();
	};

	return {
		newTodoWork,
		showTodoEditor,

		openTodoEditor,
		closeTodoEditor,
		changeNewTodoWork,
		onSubmitTodoForm,
	};
};

const useDeleteTodoIcon = (todo: ITodo) => {
	const deleteTodo = useDeleteTodo();
	const onClickDeleteIcon: MouseEventHandler = event => {
		event.stopPropagation();
		deleteTodo(todo.id);
	};

	return {
		onClickDeleteIcon,
	};
};
