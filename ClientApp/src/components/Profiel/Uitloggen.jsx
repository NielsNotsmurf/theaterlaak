import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../MainContext';

export default function Uitloggen() {
    const { updateContextState } = useContext(MainContext); 
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        updateContextState({ user: undefined, roles: undefined });

        navigate('/login');
    }, [])
}