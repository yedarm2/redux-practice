import { getFirestore } from 'firebase-admin/firestore';
import { ITodo } from '../types';
import { getNewId } from '../utils';

import { firebaseApp } from './_app';

const COLLECTION_NAME = 'todo-for-redux-practice';

const database = getFirestore(firebaseApp);
const todoCollection = database.collection(COLLECTION_NAME);

export const getTodoList = async () => {
	const querySnapshot = await todoCollection.orderBy('id', 'asc').get();

	return querySnapshot.empty
		? []
		: querySnapshot.docs.map(queryDocumentSnapshot => queryDocumentSnapshot.data() as ITodo);
};

export const createTodo = async (work: string) => {
	const todoList = await getTodoList();
	const todoToCreate = {
		id: getNewId(todoList),
		work,
	};

	await todoCollection.add(todoToCreate);

	return todoToCreate;
};

export const deleteTodo = async (id: number) => {
	const querySnapshot = await todoCollection.where('id', '==', id).get();

	if (querySnapshot.empty) return;

	const batch = database.batch();
	for (const queryDocumentSnapshot of querySnapshot.docs) {
		batch.delete(queryDocumentSnapshot.ref);
	}
	await batch.commit();
};

export const updateTodo = async (id: number, work: string) => {
	const querySnapshot = await todoCollection.where('id', '==', id).get();

	if (querySnapshot.empty) return;

	const batch = database.batch();
	for (const queryDocumentSnapshot of querySnapshot.docs) {
		batch.update(queryDocumentSnapshot.ref, {
			work,
		});
	}
	await batch.commit();
};
