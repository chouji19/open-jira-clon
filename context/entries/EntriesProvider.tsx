import { FC, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
	entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
	entries: [],
}


export const EntriesProvider: FC = ({ children }) => {

	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
	const { enqueueSnackbar } = useSnackbar();

	const addNewEntry = async (description: string) => {
	  const { data } = await entriesApi.post<Entry>('/entries', { description });
	  dispatch({ type: '[Entry] Add-Entry', payload: data })
	}
	
	const updateEntry = async ({ _id, description, status}: Entry, showSnackbar = false) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status});
			dispatch({ type: '[Entry] Update-Entry', payload: data});
			if (showSnackbar === true) {
				enqueueSnackbar('Entry updated',{
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					}
				});
			}
		} catch (error) {
			console.log({error});
		}

	}

	const refreshEntries =async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch( { type: '[Entry] REFRESH_DATA', payload: data })
	}
	useEffect(() => {
		refreshEntries();
	}, []);
	

	return (
		<EntriesContext.Provider value={{
			...state,
			addNewEntry,
			updateEntry,
		}}>
			{children}
		</EntriesContext.Provider>
	)
};