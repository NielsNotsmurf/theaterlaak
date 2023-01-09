import { createContext, useState } from 'react';

export const DoneerContext = createContext();

export default function DoneerContextProvider(props) {
    const [state, setState] = useState({
        userAccesToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOWExODA2Zi1hYmYxLTRjMGYtODgyMS0xZGQzYjA3M2Q0ODYiLCJqdGkiOiJhMGQ0NDgxMi0yMDYzLTQxNzQtOTliZC1lYmE5NDc5NTM4YjciLCJpYXQiOiIwMS8wNC8yMDIzIDIyOjUxOjQ5IiwiVXNlcklkIjoiMzlhMTgwNmYtYWJmMS00YzBmLTg4MjEtMWRkM2IwNzNkNDg2IiwiRW1haWwiOiJ0ZXN0YmV0YWFsQGdtYWlsLmNvbSIsImV4cCI6MTk4ODQ5MTkwOSwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.dZRYBinGpeG3E_rKqR8AquLK6qsZ8cEPm4Z4NPTD-Pk',
        // userAccesToken: null,
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
        <DoneerContext.Provider value={state}>
            {props.children}
        </DoneerContext.Provider>
    )
}