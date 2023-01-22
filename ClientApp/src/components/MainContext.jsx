import { createContext, useState } from 'react';

export const MainContext = createContext();

export default function MainContextProvider(props) {
    const [state, setState] = useState({
        user: null,
        roles: [],
        updateContextState,
    });

    function updateContextState(newState) {
        setState((prevState) => ({
            ...prevState,
            ...(typeof newState === 'function'
                ? newState(prevState)
                : newState
            ),
        }));
    }

    return (
        <MainContext.Provider value={state}>
            {props.children}
        </MainContext.Provider>
    )
}