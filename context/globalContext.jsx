import React, { useState, useEffect } from 'react';

export const GlobalContext = React.createContext({
    currentRadio: null,
    setCurrentRadio: () => {},
})

export const GlobalContextProvider =  (props) => {
    const [currentRadio, setCurrentRadio] = useState(null);
    return (
        <GlobalContext.Provider value={{
            currentRadio,
            setCurrentRadio,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
