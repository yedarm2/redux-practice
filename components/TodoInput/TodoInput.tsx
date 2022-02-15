import { FC, useState } from 'react';

import { TextField, TextFieldProps } from '@mui/material';

export const TodoInput: FC = () => {
	const { value, onChange } = useTodoInputValue();

	return (
		<div>
			<TextField label="추가할 할 일" variant="outlined" value={value} onChange={onChange} />
		</div>
	);
};

const useTodoInputValue = () => {
	const [value, setValue] = useState('');
	const onChange: TextFieldProps['onChange'] = event => {
		setValue(event.target.value);
	};

	return { value, onChange };
};
