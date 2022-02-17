export const getNewId = (list: { id: number }[]) => {
	const idList = list.map(item => item.id);

	return idList.length > 0 ? idList.sort((a, b) => a - b).reverse()[0] + 1 : 0;
};
