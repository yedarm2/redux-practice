import axios from 'axios';
import { ITodo } from '../types';

axios.defaults.baseURL = '/api';

export const getTodoList = async () => {
	const result = await axios.get('/todo');
	return result.data as ITodo[];
};

export const createTodo = async (work: string) => {
	const result = await axios.post('/todo', { work });
	return result.data as ITodo;
};

export const updateTodo = async (id: number, work: string) => {
	await axios.patch(`/todo/${id}`, { work });
};

export const deleteTodo = async (id: number) => {
	await axios.delete(`/todo/${id}`);
};
