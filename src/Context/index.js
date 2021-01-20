import React, { useState, createContext } from 'react';

const AppContext = createContext({
	// to be displayed by the header
	numberOfHotels: 0,
});

const AppProvider = ({ children }) => {
	const [numberOfHotels, setNumberOfHotels] = useState(0);

	return (
		<AppContext.Provider
			value={{
				numberOfHotels,
				setNumberOfHotels,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppProvider, AppContext };
