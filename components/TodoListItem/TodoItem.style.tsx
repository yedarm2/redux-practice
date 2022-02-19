import { FC } from 'react';

import { ListItemButton } from '@mui/material';
import styled from '@emotion/styled';

export const TodoItemContent = styled(ListItemButton)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;

	padding: 10px 0;

	.left {
		flex: 1 0 auto;
	}

	.input {
		width: 100%;
	}

	.text {
		padding: 0 0 0 10px;
	}

	.icon-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0 0 24px;
		height: 24px;

		cursor: pointer;
	}
`;
