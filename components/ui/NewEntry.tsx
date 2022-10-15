import React, { ChangeEvent, useContext, useState } from 'react'
import { Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setIsAddingEntry} = useContext(UIContext);
	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);

	const onTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
	  setInputValue(event.target.value);
	}
	
	const onSave = () => {
		if (inputValue.length === 0) return;
		addNewEntry(inputValue);
		setInputValue('');
		setIsAddingEntry(false);
		setTouched(false);
	}

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder="new entry"
						autoFocus
						multiline
						label="new entry"
						helperText={ inputValue.length <= 0 && touched && "Insert a value"}
						error={ inputValue.length <= 0 && touched}
						value={inputValue}
						onChange={onTextChanged}
						onBlur={() => setTouched(true)}
					/>
					<Box display={'flex'} justifyContent='space-between'>
						<Button
							variant='text'
							onClick={() => setIsAddingEntry(false)}

						>
							Cancel
						</Button>
						<Button
							variant='outlined'
							color='secondary'
							endIcon={<SaveIcon />}
							onClick={onSave}
						>
							Save
						</Button>
					</Box>
				</>
			) : (
				<Button
					startIcon={<AddCircleOutlineIcon />}
					fullWidth
					variant='outlined'
					onClick={() => setIsAddingEntry(true)}
				>
					Add task
				</Button>
			)}
		</Box>
	)
}
