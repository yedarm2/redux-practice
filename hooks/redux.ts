import { shallowEqual, useSelector } from 'react-redux';

import { RootState } from '../store';

export const useAppSelector = <State>(getValue: (rootReducer: RootState) => State) => {
	// todo: unknown으로 나오는 이슈 해결 필요... ㅠㅠ
	const state = useSelector<RootState>(state => getValue(state), shallowEqual);

	return state as State;
};
