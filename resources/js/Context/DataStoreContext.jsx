import React, { createContext, useContext } from 'react'
import { useState } from 'react'
const DataStoreContext = createContext();
export function DataStoreProvider({ children }) {
	const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
	return (
		<DataStoreContext.Provider
			value={{
				categoryModalIsOpen,
				setCategoryModalIsOpen,
			}}
		>
			{children}
		</DataStoreContext.Provider>
	);
}
export function useDataStore() {
	return useContext(DataStoreContext);
}