import { NextApiHandler } from 'next';

import { getAllTodoList, createTodo } from '../../../firebase';

export default (async (req, res) => {
	if (req.method === 'GET') {
		const todoList = await getAllTodoList();
		return res.status(200).json(todoList);
	}

	if (req.method === 'POST') {
		const work = req.body.work;
		await createTodo(work);
		return res.status(200).end();
	}

	res.status(404).end();
}) as NextApiHandler;
