import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
	entries: Entry[]; 
	addNewEntry: (description: string) => Promise<void>;
	updateEntry: (entry: Entry, showSnackbar?: boolean) => Promise<void>;
}


export const EntriesContext = createContext({} as ContextProps );