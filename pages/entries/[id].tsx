import React, { ChangeEvent, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';

import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import {isValidObjectId} from 'mongoose';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { getFormatDistanceToNow } from '../../utils/dateFunctions';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
	entry: Entry
}

const EntryPage:React.FC<Props> = ({ entry }) => {

	const { updateEntry } = useContext(EntriesContext);

	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);

	const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	}

	const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
	  setStatus(event.target.value as EntryStatus);
	}
	
	const onSave = () => {
		if (inputValue.trim().length === 0) return;

		const updatedEntry:Entry = {
			...entry,
			status,
			description: inputValue,
		}
		updateEntry(updatedEntry, true);
	}


	return (
		<Layout title={ inputValue.substring(0,20)+'...'}>
			<Grid
				container
				justifyContent={'center'}
				sx={{ marginTop: 2 }}
			>
				<Grid item xs={12} sm={8} md={6} >
					<Card>
						<CardHeader
							title={`Entry:`}
							subheader={getFormatDistanceToNow(entry.createdAt)}
						/>
						<CardContent >
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='New entry'
								autoFocus
								multiline
								label="New entry"
								value={inputValue}
								onChange={onInputValueChanged}
								onBlur={()=> setTouched(true)}
								helperText={isNotValid && 'Insert a value'}
								error={ isNotValid }
							/>
							<FormLabel>Status:</FormLabel>
							<RadioGroup
								row
								value={status}
								onChange={onStatusChanged}
							>
								{
									validStatus.map(option => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))
								}
							</RadioGroup>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlined />}
								variant="contained"
								fullWidth
								onClick={onSave}
								disabled={ inputValue.length <= 0 }
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<IconButton
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'error.dark',
				}}
			>
				<DeleteOutline />
			</IconButton>
		</Layout>
	)
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	const { id } = params as { id: string};
	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			}
		}
	}
	
	return {
		props: {
			entry,
		}
	}
}

export default EntryPage;