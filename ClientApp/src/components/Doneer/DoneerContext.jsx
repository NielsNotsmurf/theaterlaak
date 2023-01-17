import { createContext, useState } from 'react';

export const DoneerContext = createContext();

export default function DoneerContextProvider(props) {
    const [state, setState] = useState({
        userAccesToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNjRhNGYzOC04MjdlLTRjMTQtYWFmNy0wMDJiNmU5MWUyOWYiLCJqdGkiOiI0NzI3ZjJhOC05ODdmLTRhMTUtYjlkNi03MjNlOGQzODE2NWMiLCJpYXQiOiIwMS8xNy8yMDIzIDEyOjUwOjA0IiwiVXNlcklkIjoiMzY0YTRmMzgtODI3ZS00YzE0LWFhZjctMDAyYjZlOTFlMjlmIiwiRW1haWwiOiJ0ZXN0QHRlc3QubmwiLCJleHAiOjE5ODk1NzkwMDQsImlzcyI6IklrRG9uZWVyIiwiYXVkIjoiKiJ9.ZxgWVS0-3P6mXGV7Syp4RkcqN6JE5rYad9nIKOQ7dH4',
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