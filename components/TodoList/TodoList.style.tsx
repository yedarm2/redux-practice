import styled from '@emotion/styled';

export const TodoItemSkeleton = styled.div`
	padding: 10px;
	height: 44px;
	display: flex;
	gap: 10px;

	&::before,
	&::after {
		content: '';
		display: block;
		height: 24px;

		background: #ccc;
	}

	&::before {
		flex: 1 1 auto;
	}

	&::after {
		flex: 0 0 24px;
	}
`;
