import { NextApiHandler } from 'next';

import { deleteTodo, updateTodo } from '../../../firebase';

export default (async (req, res) => {
	const id = Number(req.query.id);

	if (req.method === 'PATCH') {
		const work = req.body.work;
		await updateTodo(id, work);
		return res.status(200).end();
	}

	if (req.method === 'DELETE') {
		await deleteTodo(id);
		return res.status(200).end();
	}

	res.status(404).end();
}) as NextApiHandler;
