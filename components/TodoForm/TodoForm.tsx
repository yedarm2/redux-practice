import { FormEventHandler } from 'react';

import { FC, useState } from 'react';

import { TextField, TextFieldProps, Button } from '@mui/material';

export const TodoForm: FC = () => {
	const { value, onChange, onSubmit } = useTodoForm();

	return (
		<form onSubmit={onSubmit}>
			<TextField label="추가할 할 일" variant="outlined" value={value} onChange={onChange} />
			<Button variant="outlined" type="button">
				할 일 추가
			</Button>
		</form>
	);
};

const useTodoForm = () => {
	const [value, setValue] = useState('');
	const onChange: TextFieldProps['onChange'] = event => {
		setValue(event.target.value);
	};

	const onSubmit: FormEventHandler = event => {
		event.preventDefault();
	};

	return { value, onChange, onSubmit };
};
