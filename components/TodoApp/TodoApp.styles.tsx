import styled from '@emotion/styled';
import { Paper, Container } from '@mui/material';

export const TodoWrapper = styled(Container)`
	width: 100vw;
	height: 100vh;

	background-color: rgb(231, 235, 240);
	padding: 10px 0;
`;

export const TodoContent = styled(Paper)`
	background-color: #fff;
	padding: 10px;
`;
